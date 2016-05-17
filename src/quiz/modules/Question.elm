module Question exposing (..)


import Html exposing (..)
import Html.App
import Json.Decode as Decode exposing (Decoder, (:=))
import Question.Option as Option
import Question.Input as Input


type Model
  = OptionModel Option.Model
  | InputModel Input.Model

type Question
   = OptionQuestion Option.Question
   | InputQuestion Input.Question


init : Question -> Model
init question =
  case question of
    OptionQuestion actualQuestion ->
      Option.init actualQuestion |> OptionModel

    InputQuestion actualQuestion ->
      Input.init actualQuestion |> InputModel


decoder : Decoder Question
decoder =
  Decode.andThen
    ("kind" := Decode.string)
    (\kind ->
      case kind of
        "singular" ->
          Decode.map OptionQuestion Option.decoder

        "input" ->
          Decode.map InputQuestion Input.decoder
        _ ->
          Decode.fail "unsupported kind of Question"
    )


type Msg
  = InputMsg Input.Msg
  | OptionMsg Option.Msg


type Shout
  = OnSubmit ( String, String )


update : Msg -> Model -> ( Model, List Shout )
update msg model =
  case ( msg, model ) of
    ( OptionMsg childMsg, OptionModel childModel ) ->
      let
        ( updatedModel, shouts ) = Option.update childMsg childModel
      in
        List.foldl
          handleOptionShout
          ( (OptionModel updatedModel), [] )
          shouts

    ( InputMsg childMsg, InputModel childModel ) ->
      let
        ( updatedModel, shouts ) = Input.update childMsg childModel
      in
        List.foldl
          handleInputShout
          ( (InputModel updatedModel), [] )
          shouts

    _ ->
      ( model, [] )


handleOptionShout : Option.Shout -> ( Model, List Shout ) -> ( Model, List Shout )
handleOptionShout shout ( model, shouts ) =
  case shout of
    Option.OnSubmit answer ->
      ( model, shouts ++ [ OnSubmit answer ] )

handleInputShout : Input.Shout -> ( Model, List Shout ) -> ( Model, List Shout )
handleInputShout shout ( model, shouts ) =
  case shout of
    Input.OnSubmit answer ->
      ( model, shouts ++ [ OnSubmit answer ] )


view : Bool -> Model -> Html Msg
view isHidden model =
  case model of
    OptionModel question ->
      Option.view isHidden question |> Html.App.map OptionMsg

    InputModel question ->
      Input.view isHidden question |> Html.App.map InputMsg
