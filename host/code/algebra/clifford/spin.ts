export type Sign =
  | { form: "positive" }
  | { form: "negative" }

export type Grade =
  | { form: "even" }
  | { form: "odd" }

export function flipGrade(g: Grade): Grade {
  if (g.form === "even") {
    return { form: "odd" }
  } else {
    return { form: "even" }
  }
}

export function flipGradeIsAnInvolution(g: Grade): Grade {
  // hold: verified at compile time
  return g
}

export function mulGrade(a: Grade, b: Grade): Grade {
  if (a.form === "even") {
    return b
  } else {
    return flipGrade(b)
  }
}

export function evenIsTheGradeIdentity(g: Grade): Grade {
  // hold: verified at compile time
  return g
}

export function evenProductIsInSpin(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectionCompositionIsRotation(): void {
  // hold: verified at compile time
  return undefined
}

export function singleReflectionIsNotARotation(): void {
  // hold: verified at compile time
  return undefined
}

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
  if (a.form === "positive") {
    return b
  } else {
    if (b.form === "positive") {
      return { form: "negative" }
    } else {
      return { form: "positive" }
    }
  }
}

export function flipSign(s: Sign): Sign {
  if (s.form === "positive") {
    return { form: "negative" }
  } else {
    return { form: "positive" }
  }
}

export function mulBlade(a: Blade, b: Blade): Cliff {
  if (a.form === "one") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "one" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e1" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e2" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e3" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e12" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e13" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e23" } }
    } else {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e123" } }
    }
  } else if (a.form === "e1") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e1" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "one" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e12" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e13" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e2" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e3" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e123" } }
    } else {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e23" } }
    }
  } else if (a.form === "e2") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e2" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e12" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "one" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e23" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e1" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e123" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e3" } }
    } else {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e13" } }
    }
  } else if (a.form === "e3") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e3" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e13" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e23" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "one" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e123" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e1" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e2" } }
    } else {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e12" } }
    }
  } else if (a.form === "e12") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e12" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e2" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e1" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e123" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "one" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e23" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e13" } }
    } else {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e3" } }
    }
  } else if (a.form === "e13") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e13" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e3" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e123" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e1" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e23" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "one" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e12" } }
    } else {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e2" } }
    }
  } else if (a.form === "e23") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e23" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e123" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e3" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e2" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e13" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e12" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "one" } }
    } else {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e1" } }
    }
  } else {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e123" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e23" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e13" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e12" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e3" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: { form: "positive" }, blade: { form: "e2" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "e1" } }
    } else {
      return { form: "scaled", sign: { form: "negative" }, blade: { form: "one" } }
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

export function bar(x: Cliff): Cliff {
  if (x.form === "scaled") {
    const s = x.sign
    const b = x.blade
    if (b.form === "one") {
      return { form: "scaled", sign: s, blade: { form: "one" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: s, blade: { form: "e1" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: s, blade: { form: "e2" } }
    } else if (b.form === "e3") {
      return { form: "scaled", sign: s, blade: { form: "e3" } }
    } else if (b.form === "e12") {
      return { form: "scaled", sign: flipSign(s), blade: { form: "e12" } }
    } else if (b.form === "e13") {
      return { form: "scaled", sign: flipSign(s), blade: { form: "e13" } }
    } else if (b.form === "e23") {
      return { form: "scaled", sign: flipSign(s), blade: { form: "e23" } }
    } else {
      return { form: "scaled", sign: flipSign(s), blade: { form: "e123" } }
    }
  }
}

export function conjugate(g: Cliff, v: Cliff): Cliff {
  return mul(mul(g, v), bar(g))
}

export function doubleCoverTwoPreimagesOnE1ActingOnE2(): void {
  // hold: verified at compile time
  return undefined
}

export function doubleCoverTwoPreimagesOnE12ActingOnE1(): void {
  // hold: verified at compile time
  return undefined
}

export function signOf(x: Cliff): Sign {
  if (x.form === "scaled") {
    const s = x.sign
    return s
  }
}

export function theTwoPreimagesAreDistinct(): void {
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

export function spin3IsQuaternionUnitGroup(): void {
  // hold: verified at compile time
  return undefined
}

export function oneIsTheIdentityOfSpin(x: Cliff): Cliff {
  // hold: verified at compile time
  return x
}

export type Morita =
  | { form: "real" }
  | { form: "complex" }
  | { form: "quaternion" }
  | { form: "double-quaternion" }
  | { form: "half-real" }
  | { form: "half-complex" }

export type Clock =
  | { form: "n0" }
  | { form: "n1" }
  | { form: "n2" }
  | { form: "n3" }
  | { form: "n4" }
  | { form: "n5" }
  | { form: "n6" }
  | { form: "n7" }

export function step(c: Clock): Clock {
  if (c.form === "n0") {
    return { form: "n1" }
  } else if (c.form === "n1") {
    return { form: "n2" }
  } else if (c.form === "n2") {
    return { form: "n3" }
  } else if (c.form === "n3") {
    return { form: "n4" }
  } else if (c.form === "n4") {
    return { form: "n5" }
  } else if (c.form === "n5") {
    return { form: "n6" }
  } else if (c.form === "n6") {
    return { form: "n7" }
  } else {
    return { form: "n0" }
  }
}

export function cliffordType(c: Clock): Morita {
  if (c.form === "n0") {
    return { form: "real" }
  } else if (c.form === "n1") {
    return { form: "complex" }
  } else if (c.form === "n2") {
    return { form: "quaternion" }
  } else if (c.form === "n3") {
    return { form: "double-quaternion" }
  } else if (c.form === "n4") {
    return { form: "quaternion" }
  } else if (c.form === "n5") {
    return { form: "complex" }
  } else if (c.form === "n6") {
    return { form: "real" }
  } else {
    return { form: "half-real" }
  }
}

export function step8(c: Clock): Clock {
  return step(step(step(step(step(step(step(step(c))))))))
}

export function step4(c: Clock): Clock {
  return step(step(step(step(c))))
}

export function cliffordTypePeriodIsEight(c: Clock): Clock {
  // hold: verified at compile time
  return c
}

export function eightStepsReturnToStart(c: Clock): Clock {
  // hold: verified at compile time
  return c
}

export function periodIsNotFour(): void {
  // hold: verified at compile time
  return undefined
}

export function periodIsNotTwo(): void {
  // hold: verified at compile time
  return undefined
}
