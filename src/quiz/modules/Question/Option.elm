module Question.Option exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode exposing (Decoder, (:=))


type alias Model =
    { question : Question
    }


type alias Question =
    { title : String
    , options : List String
    }


decoder : Decoder Question
decoder =
    Decode.object2 Question
        ("title" := Decode.string)
        ("options" := (Decode.list Decode.string))


init : Question -> Model
init question =
    { question = question
    }


type Msg
    = Submit ( String, String )


type Shout
    = OnSubmit ( String, String )


update : Msg -> Model -> ( Model, List Shout )
update msg model =
    case msg of
        Submit answer ->
            ( model, [ OnSubmit answer ] )


view : Bool -> Model -> Html Msg
view isHidden model =
    let
        optionView option =
            button [ onClick <| Submit ( model.question.title, option ) ]
                [ text option ]
    in
        div [ hidden isHidden ]
            [ h2 [] [ text model.question.title ]
            , div []
                (List.map optionView model.question.options)
            ]
