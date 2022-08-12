-- quill adds newlines between close and open tags to the display, this deletes such newlines
main =
  let rw s =
        case s of
                  [] -> []
                  '>':'\n':'<':s' -> '>' : '<' : rw s'
                  c : s' -> c : rw s'
  in interact rw
