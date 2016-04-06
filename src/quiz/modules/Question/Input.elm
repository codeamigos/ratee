module Question.Input exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode exposing (Decoder, (:=))


type alias Model =
  { question : Question
  , input : String
  }

type alias Question =
  { title : String
  }

init : Question -> Model
init question =
  { question = question
  , input = ""
  }

decoder : Decoder Question
decoder =
  Decode.object1 Question
    ("title" := Decode.string)


type Msg
  = Input String
  | Submit ( String, String )


update : Msg -> Model -> Model
update msg model =
  case msg of
    Input str ->
      { model | input = str }
    _ ->
      model


view : Bool -> Model -> Html Msg
view isHidden model =
  div
    [ hidden isHidden ]
    [ h2 [] [ text model.question.title ]
    , textarea [ onInput Input, value model.input ] []
    , button
      [ onClick <| Submit ( model.question.title, model.input ) ]
      [ text "Submit" ]
    ]
