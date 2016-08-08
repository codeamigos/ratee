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
    , feedback : List ( String, String )
    , isQuizCompleted : Bool
    , forms : List AnswerForm
    , visibleForm : Int
    }


type alias Quiz =
    { id : String
    , title : String
    , questions : List Question
    }


type Question
    = InputQuestionT InputQuestion
    | OptionQuestionT OptionQuestion


type alias InputQuestion =
    { title : String
    }


type alias OptionQuestion =
    { title : String
    , options : List String
    }


type AnswerForm
    = InputForm InputAnswerForm
    | OptionForm OptionAnswerForm


type alias InputAnswerForm =
    { question : InputQuestion
    , answer : String
    }


type alias OptionAnswerForm =
    { question : OptionQuestion
    }


init : ( Model, Cmd Msg )
init =
    ( { quiz = Nothing
      , feedback = []
      , isQuizCompleted = False
      , forms = []
      , visibleForm = 0
      }
    , getQuiz
    )


isQuizCompleted : Model -> Bool
isQuizCompleted model =
    model.quiz
        |> Maybe.map .questions
        |> Maybe.map List.length
        |> Maybe.map ((>=) model.visibleForm)
        |> Maybe.withDefault False



---- JSON ----


decodeQuiz : Decoder Quiz
decodeQuiz =
    Decode.object3 Quiz
        ("_id" := Decode.string)
        ("title" := Decode.string)
        ("questions" := (Decode.list decodeQuestion))


decodeQuestion : Decoder Question
decodeQuestion =
    Decode.andThen ("kind" := Decode.string)
        (\kind ->
            case kind of
                "singular" ->
                    Decode.map OptionQuestionT decodeOptionQuestion

                "input" ->
                    Decode.map InputQuestionT decodeInputQuestion

                _ ->
                    Decode.fail "unsupported kind of Question"
        )


decodeInputQuestion : Decoder InputQuestion
decodeInputQuestion =
    Decode.object1 InputQuestion
        ("title" := Decode.string)


decodeOptionQuestion : Decoder OptionQuestion
decodeOptionQuestion =
    Decode.object2 OptionQuestion
        ("title" := Decode.string)
        ("options" := Decode.list Decode.string)


encodeFeedback : String -> List ( String, String ) -> String
encodeFeedback quizId feedback =
    Encode.encode 0 <|
        Encode.object
            [ ( "quiz", Encode.string quizId )
            , ( "answers"
              , Encode.list <|
                    List.map
                        (\( question, result ) ->
                            Encode.object
                                [ ( "question", Encode.string question )
                                , ( "result", Encode.string result )
                                ]
                        )
                        feedback
              )
            ]



---- HTTP ----


getQuiz : Cmd Msg
getQuiz =
    Http.get decodeQuiz "/api/quiz/perchini"
        |> Task.perform QuizFetchFail QuizFetchOk


postFeedback : String -> List ( String, String ) -> Cmd Msg
postFeedback quizId feedback =
    Http.send
        Http.defaultSettings
        { verb = "post"
        , headers =
            [ ( "Content-Type", "application/json" )
            ]
        , url = "/api/feedback"
        , body = Http.string (encodeFeedback quizId feedback)
        }
        |> Task.perform (\_ -> NoOp) (\_ -> NoOp)



---- UPDATE ----


type Msg
    = NoOp
    | QuizFetchOk Quiz
    | QuizFetchFail Http.Error
    | Input Int String
    | SubmitAnswer ( String, String )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        QuizFetchOk quiz ->
            ( { model
                | quiz = Just quiz
                , forms = List.map questionToAnswerForm quiz.questions
              }
            , Cmd.none
            )

        QuizFetchFail error ->
            ( model
            , Cmd.none
            )

        Input index string ->
            ( { model
                | forms =
                    List.indexedMap
                        (updateForm index string)
                        model.forms
              }
            , Cmd.none
            )

        SubmitAnswer answer ->
            case model.quiz of
                Just quiz ->
                    let
                        nextVisibleForm =
                            model.visibleForm + 1

                        nextModel =
                            { model
                                | feedback = model.feedback ++ [ answer ]
                                , visibleForm = nextVisibleForm
                            }
                    in
                        ( nextModel
                        , if isQuizCompleted nextModel then
                            postFeedback quiz.id nextModel.feedback
                          else
                            Cmd.none
                        )

                Nothing ->
                    ( model, Cmd.none )


questionToAnswerForm : Question -> AnswerForm
questionToAnswerForm question =
    case question of
        InputQuestionT quest ->
            InputForm { question = quest, answer = "" }

        OptionQuestionT quest ->
            OptionForm { question = quest }


updateForm : Int -> String -> Int -> AnswerForm -> AnswerForm
updateForm updateIndex string index form =
    if updateIndex /= index then
        form
    else
        case form of
            InputForm f ->
                InputForm { f | answer = string }

            OptionForm f ->
                OptionForm f



---- VIEW ----


view : Model -> Html Msg
view model =
    if isQuizCompleted model then
        h1 [] [ text "Благодарим вас за участие в опросе" ]
    else
        div []
            [ h1 [] [ text "Quiz" ]
            , model.forms
                |> List.indexedMap (formView model.visibleForm)
                |> div []
            ]


formView : Int -> Int -> AnswerForm -> Html Msg
formView visibleIndex index form =
    let
        isHidden =
            visibleIndex /= index
    in
        case form of
            InputForm inputForm ->
                inputFormView index isHidden inputForm

            OptionForm optionForm ->
                optionFormView isHidden optionForm


inputFormView : Int -> Bool -> InputAnswerForm -> Html Msg
inputFormView index isHidden form =
    div [ hidden isHidden ]
        [ h2 [] [ text form.question.title ]
        , textarea [ onInput (Input index), value form.answer ] []
        , button [ onClick <| SubmitAnswer ( form.question.title, form.answer ) ]
            [ text "Submit" ]
        ]


optionFormView : Bool -> OptionAnswerForm -> Html Msg
optionFormView isHidden { question } =
    let
        optionView option =
            button [ onClick <| SubmitAnswer ( question.title, option ) ]
                [ text option ]
    in
        div [ hidden isHidden ]
            [ h2 [] [ text question.title ]
            , div []
                (List.map optionView question.options)
            ]
