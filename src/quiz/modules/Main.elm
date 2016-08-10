port module Main exposing (..)

import Html exposing (Html)
import Html.App
import Quiz


main =
    Html.App.program
        { init = Quiz.init
        , update = Quiz.update
        , view = Quiz.view
        , subscriptions = (\_ -> Sub.none)
        }
