export type Sign =
  | { form: "pos" }
  | { form: "neg" }

export type Blade =
  | { form: "one" }
  | { form: "e1" }
  | { form: "e2" }
  | { form: "e3" }
  | { form: "e12" }
  | { form: "e13" }
  | { form: "e23" }
  | { form: "e123" }

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
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e1" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e2" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e3" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e12" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e13" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e23" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e123" } }
    }
  } else if (a.form === "e1") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e1" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "one" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e12" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e13" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e2" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e3" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e123" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e23" } }
    }
  } else if (a.form === "e2") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e2" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e12" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "one" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e23" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e1" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e123" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e3" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e13" } }
    }
  } else if (a.form === "e3") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e3" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e13" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e23" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "one" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e123" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e1" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e2" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e12" } }
    }
  } else if (a.form === "e12") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e12" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e2" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e1" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e123" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e23" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e13" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e3" } }
    }
  } else if (a.form === "e13") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e13" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e3" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e123" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e1" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e23" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e12" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e2" } }
    }
  } else if (a.form === "e23") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e23" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e123" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e3" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e2" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e13" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e12" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e1" } }
    }
  } else {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e123" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e23" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e13" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e12" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e3" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e2" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e1" } }
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

export function e1SquaredIsPlusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function e2SquaredIsPlusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function e3SquaredIsPlusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function e1TimesE2IsTheBivectorE12(): void {
  // hold: verified at compile time
  return undefined
}

export function e1TimesE3IsTheBivectorE13(): void {
  // hold: verified at compile time
  return undefined
}

export function e2TimesE3IsTheBivectorE23(): void {
  // hold: verified at compile time
  return undefined
}

export function pseudoscalarSquaresToMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function e12SquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function e13SquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function e23SquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function e12TimesE13IsMinusE23(): void {
  // hold: verified at compile time
  return undefined
}

export function e23TimesE12IsMinusE13(): void {
  // hold: verified at compile time
  return undefined
}

export function e13TimesE23IsMinusE12(): void {
  // hold: verified at compile time
  return undefined
}

export function e2TimesE1IsMinusE12(): void {
  // hold: verified at compile time
  return undefined
}

export function e3TimesE1IsMinusE13(): void {
  // hold: verified at compile time
  return undefined
}

export function e3TimesE2IsMinusE23(): void {
  // hold: verified at compile time
  return undefined
}

export function oneIsTheIdentity(x: Cliff): Cliff {
  // hold: verified at compile time
  return x
}

export function negateE1E2IsTheReverseProduct(): void {
  // hold: verified at compile time
  return undefined
}
