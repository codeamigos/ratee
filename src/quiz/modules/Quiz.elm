module Quiz exposing (..)

import Html exposing (..)
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
    , finished : Bool
    }


type alias Quiz =
    { id : String
    , title : String
    , questions : List Question.Question
    }


init : ( Model, Cmd Msg )
init =
    ( Model Nothing [] 0 [] False
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
            in
                List.foldl handleQuestionShout
                    ( { model | questions = updatedQuestions }
                    , Cmd.none
                    )
                    shouts


handleQuestionShout : Question.Shout -> ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
handleQuestionShout shout ( model, cmd ) =
    case shout of
        Question.OnSubmit answer ->
            let
                nextVisibleQuestion =
                    model.visibleQuestion + 1

                shouldSendToServer =
                    -- Remember that we are indexing from 0, that's why we use (==)
                    nextVisibleQuestion == List.length model.questions

                sendToServerCmd =
                    case ( model.quiz, shouldSendToServer ) of
                        ( Just quiz, True ) ->
                            Http.send Http.defaultSettings
                                { verb = "post"
                                , headers =
                                    [ ( "Content-Type", "application/json" )
                                    ]
                                , url = "/api/feedback"
                                , body = Http.string (encoder quiz.id model.feedback)
                                }
                                |> Task.perform (always NoOp) (always NoOp)

                        _ ->
                            Cmd.none
            in
                ( { model
                    | feedback = model.feedback ++ [ answer ]
                    , visibleQuestion = model.visibleQuestion + 1
                    , finished = shouldSendToServer
                  }
                , Cmd.batch [ cmd, sendToServerCmd ]
                )



---- VIEW ----


view : Model -> Html Msg
view model =
    let
        isQuizCompeted =
            List.length model.questions == model.visibleQuestion
    in
        if model.finished then
            h1 [] [ text "Благодарим вас за участие в опросе" ]
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
