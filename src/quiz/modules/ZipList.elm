module ZipList exposing (..)

import Json.Decode as Decode


type ZipList a
    = ZipList
        { prev : List a
        , current : a
        , next : List a
        }


create : a -> List a -> ZipList a
create x xs =
    ZipList
        { prev = []
        , current = x
        , next = xs
        }


current : ZipList a -> a
current (ZipList zipList) =
    zipList.current


next : ZipList a -> ZipList a
next (ZipList zipList) =
    case zipList.next of
        [] ->
            ZipList zipList

        x :: xs ->
            ZipList
                { zipList
                    | prev = zipList.prev ++ [ zipList.current ]
                    , current = x
                    , next = xs
                }


updateCurrent : (a -> a) -> ZipList a -> ZipList a
updateCurrent f (ZipList zipList) =
    ZipList
        { zipList | current = f zipList.current }


toList : ZipList a -> List a
toList (ZipList zipList) =
    zipList.prev ++ [ zipList.current ] ++ zipList.next


decoder : Decode.Decoder a -> Decode.Decoder (ZipList a)
decoder itemDecoder =
    Decode.andThen (Decode.list itemDecoder)
        (\list ->
            case list of
                [] ->
                    Decode.fail "Cannot decode empty list into ZipList"

                x :: xs ->
                    Decode.succeed (create x xs)
        )
