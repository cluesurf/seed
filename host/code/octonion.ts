export type Sign =
  | { form: "pos" }
  | { form: "neg" }

export type Gen =
  | { form: "e0" }
  | { form: "e1" }
  | { form: "e2" }
  | { form: "e3" }
  | { form: "e4" }
  | { form: "e5" }
  | { form: "e6" }
  | { form: "e7" }

export type Octo =
  | { form: "scaled"; sign: Sign; gen: Gen }

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

export function mulGen(a: Gen, b: Gen): Octo {
  if (a.form === "e0") {
    if (b.form === "e0") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e0" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e1" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e2" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e3" } }
    } else if (b.form === "e4") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e4" } }
    } else if (b.form === "e5") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e5" } }
    } else if (b.form === "e6") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e6" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e7" } }
    }
  } else if (a.form === "e1") {
    if (b.form === "e0") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e1" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e0" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e3" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e2" } }
    } else if (b.form === "e4") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e5" } }
    } else if (b.form === "e5") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e4" } }
    } else if (b.form === "e6") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e7" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e6" } }
    }
  } else if (a.form === "e2") {
    if (b.form === "e0") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e2" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e3" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e0" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e1" } }
    } else if (b.form === "e4") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e6" } }
    } else if (b.form === "e5") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e7" } }
    } else if (b.form === "e6") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e4" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e5" } }
    }
  } else if (a.form === "e3") {
    if (b.form === "e0") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e3" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e2" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e1" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e0" } }
    } else if (b.form === "e4") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e7" } }
    } else if (b.form === "e5") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e6" } }
    } else if (b.form === "e6") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e5" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e4" } }
    }
  } else if (a.form === "e4") {
    if (b.form === "e0") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e4" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e5" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e6" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e7" } }
    } else if (b.form === "e4") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e0" } }
    } else if (b.form === "e5") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e1" } }
    } else if (b.form === "e6") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e2" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e3" } }
    }
  } else if (a.form === "e5") {
    if (b.form === "e0") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e5" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e4" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e7" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e6" } }
    } else if (b.form === "e4") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e1" } }
    } else if (b.form === "e5") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e0" } }
    } else if (b.form === "e6") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e3" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e2" } }
    }
  } else if (a.form === "e6") {
    if (b.form === "e0") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e6" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e7" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e4" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e5" } }
    } else if (b.form === "e4") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e2" } }
    } else if (b.form === "e5") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e3" } }
    } else if (b.form === "e6") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e0" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e1" } }
    }
  } else {
    if (b.form === "e0") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e7" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e6" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e5" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e4" } }
    } else if (b.form === "e4") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e3" } }
    } else if (b.form === "e5") {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e2" } }
    } else if (b.form === "e6") {
      return { form: "scaled", sign: { form: "pos" }, gen: { form: "e1" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, gen: { form: "e0" } }
    }
  }
}

export function foldSign(sa: Sign, sb: Sign, prod: Octo): Octo {
  if (prod.form === "scaled") {
    const sp = prod.sign
    const gp = prod.gen
    return { form: "scaled", sign: mulSign(mulSign(sa, sb), sp), gen: gp }
  }
}

export function mul(x: Octo, y: Octo): Octo {
  if (x.form === "scaled") {
    const sx = x.sign
    const gx = x.gen
    if (y.form === "scaled") {
      const sy = y.sign
      const gy = y.gen
      return foldSign(sx, sy, mulGen(gx, gy))
    }
  }
}

export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function sameSign(a: Sign, b: Sign): Flag {
  if (a.form === "pos") {
    if (b.form === "pos") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "pos") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function sameGen(a: Gen, b: Gen): Flag {
  if (a.form === "e0") {
    if (b.form === "e0") {
      return { form: "yes" }
    } else if (b.form === "e1") {
      return { form: "no" }
    } else if (b.form === "e2") {
      return { form: "no" }
    } else if (b.form === "e3") {
      return { form: "no" }
    } else if (b.form === "e4") {
      return { form: "no" }
    } else if (b.form === "e5") {
      return { form: "no" }
    } else if (b.form === "e6") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "e1") {
    if (b.form === "e0") {
      return { form: "no" }
    } else if (b.form === "e1") {
      return { form: "yes" }
    } else if (b.form === "e2") {
      return { form: "no" }
    } else if (b.form === "e3") {
      return { form: "no" }
    } else if (b.form === "e4") {
      return { form: "no" }
    } else if (b.form === "e5") {
      return { form: "no" }
    } else if (b.form === "e6") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "e2") {
    if (b.form === "e0") {
      return { form: "no" }
    } else if (b.form === "e1") {
      return { form: "no" }
    } else if (b.form === "e2") {
      return { form: "yes" }
    } else if (b.form === "e3") {
      return { form: "no" }
    } else if (b.form === "e4") {
      return { form: "no" }
    } else if (b.form === "e5") {
      return { form: "no" }
    } else if (b.form === "e6") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "e3") {
    if (b.form === "e0") {
      return { form: "no" }
    } else if (b.form === "e1") {
      return { form: "no" }
    } else if (b.form === "e2") {
      return { form: "no" }
    } else if (b.form === "e3") {
      return { form: "yes" }
    } else if (b.form === "e4") {
      return { form: "no" }
    } else if (b.form === "e5") {
      return { form: "no" }
    } else if (b.form === "e6") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "e4") {
    if (b.form === "e0") {
      return { form: "no" }
    } else if (b.form === "e1") {
      return { form: "no" }
    } else if (b.form === "e2") {
      return { form: "no" }
    } else if (b.form === "e3") {
      return { form: "no" }
    } else if (b.form === "e4") {
      return { form: "yes" }
    } else if (b.form === "e5") {
      return { form: "no" }
    } else if (b.form === "e6") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "e5") {
    if (b.form === "e0") {
      return { form: "no" }
    } else if (b.form === "e1") {
      return { form: "no" }
    } else if (b.form === "e2") {
      return { form: "no" }
    } else if (b.form === "e3") {
      return { form: "no" }
    } else if (b.form === "e4") {
      return { form: "no" }
    } else if (b.form === "e5") {
      return { form: "yes" }
    } else if (b.form === "e6") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "e6") {
    if (b.form === "e0") {
      return { form: "no" }
    } else if (b.form === "e1") {
      return { form: "no" }
    } else if (b.form === "e2") {
      return { form: "no" }
    } else if (b.form === "e3") {
      return { form: "no" }
    } else if (b.form === "e4") {
      return { form: "no" }
    } else if (b.form === "e5") {
      return { form: "no" }
    } else if (b.form === "e6") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "e0") {
      return { form: "no" }
    } else if (b.form === "e1") {
      return { form: "no" }
    } else if (b.form === "e2") {
      return { form: "no" }
    } else if (b.form === "e3") {
      return { form: "no" }
    } else if (b.form === "e4") {
      return { form: "no" }
    } else if (b.form === "e5") {
      return { form: "no" }
    } else if (b.form === "e6") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function andFlag(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return b
  } else {
    return { form: "no" }
  }
}

export function sameOcto(x: Octo, y: Octo): Flag {
  if (x.form === "scaled") {
    const sx = x.sign
    const gx = x.gen
    if (y.form === "scaled") {
      const sy = y.sign
      const gy = y.gen
      return andFlag(sameSign(sx, sy), sameGen(gx, gy))
    }
  }
}

export function e1SquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function e1TimesE2IsE3(): void {
  // hold: verified at compile time
  return undefined
}

export function e3TimesE4IsE7(): void {
  // hold: verified at compile time
  return undefined
}

export function e2TimesE4IsE6(): void {
  // hold: verified at compile time
  return undefined
}

export function e1TimesE6IsMinusE7(): void {
  // hold: verified at compile time
  return undefined
}

export function e0IsTheIdentity(q: Octo): Octo {
  // hold: verified at compile time
  return q
}

export function octonionsAreNonAssociative(): void {
  // hold: verified at compile time
  return undefined
}
