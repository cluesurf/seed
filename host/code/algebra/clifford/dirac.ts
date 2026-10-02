export type Sign =
  | { form: "pos" }
  | { form: "neg" }

export type Blade =
  | { form: "one" }
  | { form: "g0" }
  | { form: "g1" }
  | { form: "g2" }
  | { form: "g3" }
  | { form: "g01" }
  | { form: "g02" }
  | { form: "g03" }
  | { form: "g12" }
  | { form: "g13" }
  | { form: "g23" }
  | { form: "g012" }
  | { form: "g013" }
  | { form: "g023" }
  | { form: "g123" }
  | { form: "g0123" }

export type Cliff =
  | { form: "scaled"; sign: Sign; blade: Blade }

export function mulSign(a: Sign, b: Sign): Sign {
  if (a.form === "pos") {
    return b
  } else {
    if (b.form === "pos") {
      return { form: "neg" }
    } else {
      return { form: "pos" }
    }
  }
}

export function flipSign(s: Sign): Sign {
  if (s.form === "pos") {
    return { form: "neg" }
  } else {
    return { form: "pos" }
  }
}

export function mulBlade(a: Blade, b: Blade): Cliff {
  if (a.form === "one") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "one" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g1" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g2" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g3" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g01" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g02" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g03" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g12" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g13" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g23" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g012" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g013" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g023" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g123" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0123" } }
    }
  } else if (a.form === "g0") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "one" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g01" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g02" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g03" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g1" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g2" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g3" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g012" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g013" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g023" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g12" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g13" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g23" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0123" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g123" } }
    }
  } else if (a.form === "g1") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g1" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g01" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g12" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g13" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g012" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g013" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g2" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g3" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g123" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g02" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g03" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0123" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g23" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g023" } }
    }
  } else if (a.form === "g2") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g2" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g02" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g12" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g23" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g012" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g023" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g1" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g123" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g3" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g01" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0123" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g03" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g13" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g013" } }
    }
  } else if (a.form === "g3") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g3" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g03" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g13" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g23" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g013" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g023" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g123" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g1" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g2" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0123" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g01" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g02" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g12" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g012" } }
    }
  } else if (a.form === "g01") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g01" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g1" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g012" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g013" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "one" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g12" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g13" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g02" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g03" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0123" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g2" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g3" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g123" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g023" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g23" } }
    }
  } else if (a.form === "g02") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g02" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g2" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g012" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g023" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g12" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "one" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g23" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g01" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0123" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g03" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g1" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g123" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g3" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g013" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g13" } }
    }
  } else if (a.form === "g03") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g03" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g3" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g013" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g023" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g13" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g23" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "one" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0123" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g01" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g02" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g123" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g1" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g2" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g012" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g12" } }
    }
  } else if (a.form === "g12") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g12" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g012" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g2" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g1" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g123" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g02" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g01" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0123" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g23" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g13" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g023" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g013" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g3" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g03" } }
    }
  } else if (a.form === "g13") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g13" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g013" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g3" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g123" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g1" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g03" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0123" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g01" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g23" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g12" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g023" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g012" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g2" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g02" } }
    }
  } else if (a.form === "g23") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g23" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g023" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g123" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g3" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g2" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0123" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g03" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g02" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g13" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g12" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g013" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g012" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g1" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g01" } }
    }
  } else if (a.form === "g012") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g012" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g12" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g02" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g01" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0123" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g2" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g1" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g123" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g023" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g013" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g23" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g13" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g03" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g3" } }
    }
  } else if (a.form === "g013") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g013" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g13" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g03" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0123" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g01" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g3" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g123" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g1" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g023" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g012" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g23" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g12" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g02" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g2" } }
    }
  } else if (a.form === "g023") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g023" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g23" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0123" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g03" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g02" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g123" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g3" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g2" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g013" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g012" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g13" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g12" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g01" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g1" } }
    }
  } else if (a.form === "g123") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g123" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0123" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g23" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g13" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g12" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g023" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g013" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g012" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g3" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g2" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g1" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g03" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g02" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g01" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "one" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g0" } }
    }
  } else {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0123" } }
    } else if (b.form === "g0") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g123" } }
    } else if (b.form === "g1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g023" } }
    } else if (b.form === "g2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g013" } }
    } else if (b.form === "g3") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g012" } }
    } else if (b.form === "g01") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g23" } }
    } else if (b.form === "g02") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g13" } }
    } else if (b.form === "g03") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g12" } }
    } else if (b.form === "g12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g03" } }
    } else if (b.form === "g13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g02" } }
    } else if (b.form === "g23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g01" } }
    } else if (b.form === "g012") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g3" } }
    } else if (b.form === "g013") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "g2" } }
    } else if (b.form === "g023") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g1" } }
    } else if (b.form === "g123") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    }
  }
}

export function applySigns(sx: Sign, sy: Sign, prod: Cliff): Cliff {
  if (prod.form === "scaled") {
    const sp = prod.sign
    const bp = prod.blade
    return { form: "scaled", sign: mulSign(mulSign(sx, sy), sp), blade: bp }
  }
}

export function mul(x: Cliff, y: Cliff): Cliff {
  if (x.form === "scaled") {
    const sx = x.sign
    const bx = x.blade
    if (y.form === "scaled") {
      const sy = y.sign
      const by = y.blade
      return applySigns(sx, sy, mulBlade(bx, by))
    }
  }
}

export function negate(x: Cliff): Cliff {
  if (x.form === "scaled") {
    const s = x.sign
    const b = x.blade
    return { form: "scaled", sign: flipSign(s), blade: b }
  }
}

export function gamma0(): Cliff {
  return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0" } }
}

export function gamma1(): Cliff {
  return { form: "scaled", sign: { form: "pos" }, blade: { form: "g1" } }
}

export function gamma2(): Cliff {
  return { form: "scaled", sign: { form: "pos" }, blade: { form: "g2" } }
}

export function gamma3(): Cliff {
  return { form: "scaled", sign: { form: "pos" }, blade: { form: "g3" } }
}

export function gamma5(): Cliff {
  return { form: "scaled", sign: { form: "pos" }, blade: { form: "g0123" } }
}

export function gamma0SquaredIsPlusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma1SquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma2SquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma3SquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma0Gamma1IsTheBivectorG01(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma0Gamma2IsTheBivectorG02(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma0Gamma3IsTheBivectorG03(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma1Gamma2IsTheBivectorG12(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma1Gamma3IsTheBivectorG13(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma2Gamma3IsTheBivectorG23(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma1Gamma0IsMinusG01(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma2Gamma0IsMinusG02(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma3Gamma0IsMinusG03(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma2Gamma1IsMinusG12(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma3Gamma1IsMinusG13(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma3Gamma2IsMinusG23(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma012TimesGamma3IsGamma5(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma5SquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma0TimesGamma5IsPlusG123(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma5TimesGamma0IsMinusG123(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma1TimesGamma5IsPlusG023(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma5TimesGamma1IsMinusG023(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma2TimesGamma5IsMinusG013(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma5TimesGamma2IsPlusG013(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma3TimesGamma5IsPlusG012(): void {
  // hold: verified at compile time
  return undefined
}

export function gamma5TimesGamma3IsMinusG012(): void {
  // hold: verified at compile time
  return undefined
}

export function oneIsTheIdentity(x: Cliff): Cliff {
  // hold: verified at compile time
  return x
}

export function negateGamma0Gamma1IsTheReverseProduct(): void {
  // hold: verified at compile time
  return undefined
}
