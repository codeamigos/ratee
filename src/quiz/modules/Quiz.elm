module Quiz exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.App
import Http
import Json.Decode as Decode exposing (Decoder, (:=))
import Task

import Question.Option
import Question.Input


---- MODEL ----


type alias Model =
  { questions : List QuestionModel
  , visibleQuestion : Int
  , feedback : List (String, String)
  }


type QuestionModel
  = OptionModel Question.Option.Model
  | InputModel Question.Input.Model


type alias Quiz =
  { title : String
  , questions : List Question
  }


type Question
   = OptionQuestion Question.Option.Question
   | InputQuestion Question.Input.Question


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
    ("questions" := (Decode.list questionDecoder))

questionDecoder : Decoder Question
questionDecoder =
  Decode.andThen
    ("kind" := Decode.string)
    (\kind ->
      case kind of
        "singular" ->
          Decode.map OptionQuestion Question.Option.decoder

        "input" ->
          Decode.map InputQuestion Question.Input.decoder
        _ ->
          Decode.fail "unsupported kind of Question"
    )


---- UPDATE ----


type Msg
  = FetchOk Quiz
  | FetchFail Http.Error
  | MsgFromOption Int Question.Option.Msg
  | MsgFromInput Int Question.Input.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    FetchOk quiz ->
      let
        questions : List QuestionModel
        questions =
          List.map
            (\question ->
              case question of
                OptionQuestion quest ->
                  OptionModel (Question.Option.init quest)
                InputQuestion quest ->
                  InputModel (Question.Input.init quest)
            )
            quiz.questions
      in
        ( { model | questions = questions }, Cmd.none )

    FetchFail _ ->
      ( model, Cmd.none )

    MsgFromOption id childMsg ->
      case childMsg of
        Question.Option.Submit answer ->
          ( { model | feedback = model.feedback ++ [answer], visibleQuestion = model.visibleQuestion + 1 }
          , Cmd.none
          )
        _ ->
          let
            updateAtIndex index childModel =
              case ( childModel, index ) of
                ( OptionModel actualModel, id ) ->
                  OptionModel (Question.Option.update childMsg actualModel)
                _ ->
                  childModel
          in
            ( { model | questions = List.indexedMap updateAtIndex model.questions }
            , Cmd.none
            )

    MsgFromInput id childMsg ->
      case childMsg of
        Question.Input.Submit answer ->
          ( { model | feedback = model.feedback ++ [answer], visibleQuestion = model.visibleQuestion + 1 }
          , Cmd.none
          )
        _ ->
          let
            updateAtIndex index childModel =
              case ( childModel, index ) of
                ( InputModel actualModel, id ) ->
                  InputModel (Question.Input.update childMsg actualModel)
                _ ->
                  childModel
          in
            ( { model | questions = List.indexedMap updateAtIndex model.questions }
            , Cmd.none
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

questionView : Int -> Int -> QuestionModel -> Html Msg
questionView visibleIndex index question =
  let
    isHidden = visibleIndex /= index
  in
    case question of
      OptionModel quest ->
        Question.Option.view isHidden quest |> Html.App.map (MsgFromOption index)
      InputModel quest ->
        Question.Input.view isHidden quest |> Html.App.map (MsgFromInput index)

feedbackView : ( String, String ) -> Html msg
feedbackView ( question, answer ) =
  li [] [ text (question ++ " " ++ answer) ]
