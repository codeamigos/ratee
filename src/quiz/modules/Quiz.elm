module Quiz exposing (..)

import Html exposing (Html, div, h1, h2, text, textarea, button)
import Html.Attributes exposing (value, hidden)
import Html.Events exposing (onClick, onInput)
import Http
import Json.Decode as Decode exposing (Decoder, (:=))
import Json.Encode as Encode exposing (Value)
import Task
import ZipList


---- MODEL ----


type alias Model =
    { quiz : Maybe Quiz
    }


type alias Quiz =
    { id : String
    , title : String
    , questions : ZipList.ZipList Question
    }


type Question
    = TQuestionInput QuestionInput
    | TQuestionOption QuestionOption


type alias QuestionInput =
    { title : String
    , answer : String
    }


type alias QuestionOption =
    { title : String
    , options : List String
    , answer : String
    }


init : ( Model, Cmd Msg )
init =
    ( { quiz = Nothing }
    , getQuiz
    )



---- JSON ----


decodeQuiz : Decoder Quiz
decodeQuiz =
    Decode.object3 Quiz
        ("_id" := Decode.string)
        ("title" := Decode.string)
        ("questions" := (ZipList.decoder decodeQuestion))


decodeQuestion : Decoder Question
decodeQuestion =
    Decode.andThen ("kind" := Decode.string)
        (\kind ->
            case kind of
                "singular" ->
                    Decode.map TQuestionOption decodeOptionQuestion

                "input" ->
                    Decode.map TQuestionInput decodeInputQuestion

                _ ->
                    Decode.fail "unsupported kind of Question"
        )


decodeInputQuestion : Decoder QuestionInput
decodeInputQuestion =
    Decode.object2 QuestionInput
        ("title" := Decode.string)
        (Decode.succeed "")


decodeOptionQuestion : Decoder QuestionOption
decodeOptionQuestion =
    Decode.object3 QuestionOption
        ("title" := Decode.string)
        ("options" := Decode.list Decode.string)
        (Decode.succeed "")


encodeFeedback : Quiz -> String
encodeFeedback quiz =
    Encode.encode 0 <|
        Encode.object
            [ ( "quiz", Encode.string quiz.id )
            , ( "answers"
              , quiz.questions
                    |> ZipList.toList
                    |> List.map
                        (\question ->
                            case question of
                                TQuestionInput { title, answer } ->
                                    Encode.object
                                        [ ( "question", Encode.string title )
                                        , ( "result", Encode.string answer )
                                        ]

                                TQuestionOption { title, answer } ->
                                    Encode.object
                                        [ ( "question", Encode.string title )
                                        , ( "result", Encode.string answer )
                                        ]
                        )
                    |> Encode.list
              )
            ]



---- HTTP ----


getQuiz : Cmd Msg
getQuiz =
    Http.get decodeQuiz "/api/quiz/perchini"
        |> Task.perform QuizFetchFail QuizFetchOk


postFeedback : Quiz -> Cmd Msg
postFeedback quiz =
    Http.send
        Http.defaultSettings
        { verb = "post"
        , headers =
            [ ( "Content-Type", "application/json" )
            ]
        , url = "/api/feedback"
        , body =
            quiz
                |> encodeFeedback
                |> Http.string
        }
        |> Task.perform (\_ -> NoOp) (\_ -> NoOp)



---- UPDATE ----


type Msg
    = NoOp
    | QuizFetchOk Quiz
    | QuizFetchFail Http.Error
    | OptionAnswer String
    | InputAnswer String
    | NextQuestion


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        QuizFetchOk quiz ->
            ( { model | quiz = Just quiz }
            , Cmd.none
            )

        QuizFetchFail error ->
            ( model
            , Cmd.none
            )

        OptionAnswer str ->
            case model.quiz of
                Just quiz ->
                    ( { model | quiz = Just <| recordAnswer str quiz }
                    , Task.succeed ()
                        |> Task.perform (always NoOp) (always NextQuestion)
                    )

                Nothing ->
                    ( model
                    , Cmd.none
                    )

        InputAnswer str ->
            case model.quiz of
                Just quiz ->
                    ( { model | quiz = Just <| recordAnswer str quiz }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        NextQuestion ->
            case model.quiz of
                Just quiz ->
                    let
                        updatedQuiz =
                            { quiz | questions = ZipList.next quiz.questions }
                    in
                        ( { model | quiz = Just updatedQuiz }
                        , Cmd.none
                        )

                Nothing ->
                    ( model, Cmd.none )


recordAnswer : String -> Quiz -> Quiz
recordAnswer answer quiz =
    { quiz
        | questions =
            ZipList.updateCurrent
                (\question ->
                    case question of
                        TQuestionInput question' ->
                            TQuestionInput { question' | answer = answer }

                        TQuestionOption question' ->
                            TQuestionOption { question' | answer = answer }
                )
                quiz.questions
    }



---- VIEW ----


view : Model -> Html Msg
view model =
    case model.quiz of
        Just quiz ->
            div []
                [ h1 [] [ text "Quiz" ]
                , quiz.questions
                    |> ZipList.current
                    |> questionView
                ]

        Nothing ->
            text "Loading..."


questionView : Question -> Html Msg
questionView question =
    case question of
        TQuestionInput question' ->
            inputQuestionView question'

        TQuestionOption question' ->
            optionQuestionView question'


inputQuestionView : QuestionInput -> Html Msg
inputQuestionView question =
    div [ hidden False ]
        [ h2 [] [ text question.title ]
        , textarea [ onInput InputAnswer ] []
        , button [ onClick NextQuestion ] [ text "Next" ]
        ]


optionQuestionView : QuestionOption -> Html Msg
optionQuestionView question =
    let
        optionView option =
            button [ onClick (OptionAnswer option) ] [ text option ]
    in
        div [ hidden False ]
            [ h2 [] [ text question.title ]
            , div []
                (List.map optionView question.options)
            ]
