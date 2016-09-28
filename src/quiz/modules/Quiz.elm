module Quiz exposing (..)

import Html exposing (Html, div, h1, h2, text, textarea, button)
import Html.Attributes exposing (value, hidden)
import Html.Events exposing (onClick, onInput)
import Http
import Json.Decode as Decode exposing (Decoder, (:=))
import Json.Encode as Encode exposing (Value)
import Task


---- MODEL ----


type alias Model =
    { quiz : Maybe Quiz
    , isFinished : Bool
    }


type alias Quiz =
    { id : String
    , title : String
    , questions : QuestionsList
    }


type alias QuestionsList =
    { prev : List Question
    , current : Question
    , next : List Question
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
    ( { quiz = Nothing
      , isFinished = False
      }
    , getQuiz
    )



---- JSON ----


decodeQuiz : Decoder Quiz
decodeQuiz =
    Decode.object3 Quiz
        ("_id" := Decode.string)
        ("title" := Decode.string)
        ("questions"
            := Decode.andThen (Decode.list decodeQuestion)
                (\list ->
                    case list of
                        [] ->
                            Decode.fail "Cannot decode empty list into QuestionsList"

                        x :: xs ->
                            Decode.succeed (QuestionsList [] x xs)
                )
        )


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
                    Decode.fail "Unsupported kind of Question"
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
              , quiz.questions.prev
                    ++ [ quiz.questions.current ]
                    ++ quiz.questions.next
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
                    ( { model | quiz = Just <| answerCurrentQuestion str quiz }
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
                    ( { model | quiz = Just <| answerCurrentQuestion str quiz }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        NextQuestion ->
            case model.quiz of
                Just quiz ->
                    let
                        updatedQuestions =
                            nextQuestion quiz.questions

                        updatedQuiz =
                            { quiz | questions = updatedQuestions }

                        isFinished =
                            quiz.questions == updatedQuestions
                    in
                        ( { model
                            | quiz = Just updatedQuiz
                            , isFinished = isFinished
                          }
                        , if isFinished then
                            postFeedback quiz
                          else
                            Cmd.none
                        )

                Nothing ->
                    ( model, Cmd.none )


answerCurrentQuestion : String -> Quiz -> Quiz
answerCurrentQuestion answer quiz =
    let
        { questions } =
            quiz

        updatedQuestions =
            { questions
                | current =
                    case questions.current of
                        TQuestionInput question ->
                            TQuestionInput { question | answer = answer }

                        TQuestionOption question ->
                            TQuestionOption { question | answer = answer }
            }
    in
        { quiz | questions = updatedQuestions }


nextQuestion : QuestionsList -> QuestionsList
nextQuestion list =
    case list.next of
        [] ->
            list

        x :: xs ->
            { prev = list.prev ++ [ list.current ]
            , current = x
            , next = xs
            }



---- VIEW ----


view : Model -> Html Msg
view model =
    case model.quiz of
        Just quiz ->
            if model.isFinished then
                text "Finished"
            else
                div []
                    [ h1 [] [ text "Quiz" ]
                    , questionView quiz.questions.current
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
