import Text.Printf {- base -}

core_modules :: [String]
core_modules = words "array counter dictionary dom encode error function io localstorage null number opensoundcontrol operators queue rate set string tree websocket"

base_modules :: [String]
base_modules = words "alias bindings buffer buffer-cache envelope event graph graph-print pointer pseudo servercommand smalltalk soundfile stc texture u8 ugen websocket-osc"

hyphen_to_underscore :: Char -> Char
hyphen_to_underscore c = if c == '-' then '_' else c

mk_exporter :: String -> String -> String
mk_exporter g m =
  let m_ = map hyphen_to_underscore m
  in unlines
     [printf "import * as sc3_%s from './sc3-%s.js'" m_ m
     ,printf "Object.entries(sc3_%s).forEach(([key, value]) => %s[key] = value);" m_ g]

main :: IO ()
main = writeFile "sc3-definitions.js" (unlines (map (mk_exporter "window") (core_modules ++ base_modules)))
