main =
  let rw s =
        case s of
          [] -> []
          '>':'\n':'<':s' -> '>' : '<' : rw s'
          c : s' -> c : rw s'
  in interact rw
