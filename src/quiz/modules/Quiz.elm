module Quiz exposing (..)

import Html exposing (..)
import Html.Events exposing (..)
import Html.App
import Http
import Json.Decode as Decode exposing (Decoder, (:=))
import Json.Encode as Encode exposing (Value)
import Task
import Question


---- MODEL ----


type alias Model =
    { quiz : Maybe Quiz
    , questions : List Question.Model
    , visibleQuestion : Int
    , feedback : List ( String, String )
    }


type alias Quiz =
    { id : String
    , title : String
    , questions : List Question.Question
    }


init : ( Model, Cmd Msg )
init =
    ( Model Nothing [] 0 []
    , Http.get decoder "/api/quiz/perchini"
        |> Task.perform FetchFail FetchOk
    )


decoder : Decoder Quiz
decoder =
    Decode.object3 Quiz
        ("_id" := Decode.string)
        ("title" := Decode.string)
        ("questions" := (Decode.list Question.decoder))


encoder : String -> List ( String, String ) -> String
encoder quizId feedback =
    Encode.encode 0 <|
        Encode.object
            [ ( "quiz", Encode.string quizId )
            , ( "answers"
              , Encode.list <|
                    List.map
                        (\answer ->
                            Encode.object
                                [ ( "question", Encode.string (fst answer) )
                                , ( "result", Encode.string (snd answer) )
                                ]
                        )
                        feedback
              )
            ]



---- UPDATE ----


type Msg
    = NoOp
    | FetchOk Quiz
    | FetchFail Http.Error
    | SubmitFeedback
    | QuestionMsg Int Question.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        FetchOk quiz ->
            let
                questions =
                    List.map Question.init quiz.questions
            in
                ( { model | quiz = Just quiz, questions = questions }, Cmd.none )

        FetchFail error ->
            ( model, Cmd.none )

        SubmitFeedback ->
            case model.quiz of
                Just quiz ->
                    ( model
                    , Http.send Http.defaultSettings
                        { verb = "post"
                        , headers =
                            [ ( "Content-Type", "application/json" )
                            ]
                        , url = "/api/feedback"
                        , body = Http.string (encoder quiz.id model.feedback)
                        }
                        |> Task.perform (always NoOp) (always NoOp)
                    )

                Nothing ->
                    ( model, Cmd.none )

        QuestionMsg id childMsg ->
            let
                updateAtIndex index childModel =
                    if id == index then
                        Question.update childMsg childModel
                    else
                        ( childModel, [] )

                ( updatedQuestions, nestedShouts ) =
                    List.indexedMap updateAtIndex model.questions
                        |> List.unzip

                shouts =
                    List.concat nestedShouts

                visibleQuestion =
                    if List.isEmpty shouts then
                        model.visibleQuestion
                    else
                        model.visibleQuestion + 1
            in
                List.foldl handleQuestionShout
                    ( { model | questions = updatedQuestions, visibleQuestion = visibleQuestion }
                    , Cmd.none
                    )
                    shouts


handleQuestionShout : Question.Shout -> ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
handleQuestionShout shout ( model, cmd ) =
    case shout of
        Question.OnSubmit answer ->
            ( { model | feedback = model.feedback ++ [ answer ] }
            , cmd
            )



---- VIEW ----


view : Model -> Html Msg
view model =
    let
        isQuizCompeted =
            List.length model.questions == model.visibleQuestion
    in
        if isQuizCompeted then
            button [ onClick SubmitFeedback ] [ text "Submit results" ]
        else
            div []
                [ h1 [] [ text "Quiz" ]
                , div [] (List.indexedMap (questionView model.visibleQuestion) model.questions)
                ]


questionView : Int -> Int -> Question.Model -> Html Msg
questionView visibleIndex index question =
    let
        isHidden =
            visibleIndex /= index
    in
        Question.view isHidden question |> Html.App.map (QuestionMsg index)
