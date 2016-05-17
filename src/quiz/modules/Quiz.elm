module Quiz exposing (..)

import Html exposing (..)
import Html.App
import Http
import Json.Decode as Decode exposing (Decoder, (:=))
import Task

import Question


---- MODEL ----


type alias Model =
  { questions : List Question.Model
  , visibleQuestion : Int
  , feedback : List (String, String)
  }


type alias Quiz =
  { title : String
  , questions : List Question.Question
  }


init : ( Model, Cmd Msg )
init =
  ( Model [] 0 []
  , Http.get decoder "/api/quiz/perchini"
      |> Task.perform FetchFail FetchOk
  )

decoder : Decoder Quiz
decoder =
  Decode.object2 Quiz
    ("title" := Decode.string)
    ("questions" := (Decode.list Question.decoder))


---- UPDATE ----


type Msg
  = FetchOk Quiz
  | FetchFail Http.Error
  | QuestionMsg Int Question.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    FetchOk quiz ->
      let
        questions =
          List.map Question.init quiz.questions
      in
        ( { model | questions = questions }, Cmd.none )

    FetchFail _ ->
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
        List.foldl
          handleQuestionShout
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
  div []
    [ h1 [] [ text "Quiz" ]
    , div [] (List.indexedMap (questionView model.visibleQuestion) model.questions)
    , h1 [] [ text "Feedback" ]
    , ul [] (List.map feedbackView model.feedback)
    ]

questionView : Int -> Int -> Question.Model -> Html Msg
questionView visibleIndex index question =
  let
    isHidden = visibleIndex /= index
  in
    Question.view isHidden question |> Html.App.map (QuestionMsg index)

feedbackView : ( String, String ) -> Html msg
feedbackView ( question, answer ) =
  li [] [ text (question ++ " " ++ answer) ]
