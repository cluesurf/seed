export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function both(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return b
  } else {
    return { form: "no" }
  }
}

export function either(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return { form: "yes" }
  } else {
    return b
  }
}

export function notFlag(a: Flag): Flag {
  if (a.form === "yes") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
}

export type Sign =
  | { form: "positive" }
  | { form: "negative" }

export function flipSign(s: Sign): Sign {
  if (s.form === "positive") {
    return { form: "negative" }
  } else {
    return { form: "positive" }
  }
}

export type Cl4Blade =
  | { form: "signed-blade"; sign: Sign; e1: Flag; e2: Flag; e3: Flag; e4: Flag }

export function bladeOf(sign: Sign, e1: Flag, e2: Flag, e3: Flag, e4: Flag): Cl4Blade {
  return { form: "signed-blade", sign: sign, e1: e1, e2: e2, e3: e3, e4: e4 }
}

export function bladeSign(x: Cl4Blade): Sign {
  if (x.form === "signed-blade") {
    const sign = x.sign
    return sign
  }
}

export function bitOne(x: Cl4Blade): Flag {
  if (x.form === "signed-blade") {
    const e1 = x.e1
    return e1
  }
}

export function bitTwo(x: Cl4Blade): Flag {
  if (x.form === "signed-blade") {
    const e2 = x.e2
    return e2
  }
}

export function bitThree(x: Cl4Blade): Flag {
  if (x.form === "signed-blade") {
    const e3 = x.e3
    return e3
  }
}

export function bitFour(x: Cl4Blade): Flag {
  if (x.form === "signed-blade") {
    const e4 = x.e4
    return e4
  }
}

export function differ(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return notFlag(b)
  } else {
    return b
  }
}

export function signTimes(a: Sign, b: Sign): Sign {
  if (a.form === "positive") {
    return b
  } else {
    return flipSign(b)
  }
}

export function signIf(odd: Flag, s: Sign): Sign {
  if (odd.form === "yes") {
    return flipSign(s)
  } else {
    return s
  }
}

export function crossing(x: Cl4Blade, y: Cl4Blade): Flag {
  return differ(differ(differ(both(bitTwo(x), bitOne(y)), both(bitThree(x), bitOne(y))), differ(both(bitFour(x), bitOne(y)), both(bitThree(x), bitTwo(y)))), differ(both(bitFour(x), bitTwo(y)), both(bitFour(x), bitThree(y))))
}

export function bladeProduct(x: Cl4Blade, y: Cl4Blade): Cl4Blade {
  return bladeOf(signIf(crossing(x, y), signTimes(bladeSign(x), bladeSign(y))), differ(bitOne(x), bitOne(y)), differ(bitTwo(x), bitTwo(y)), differ(bitThree(x), bitThree(y)), differ(bitFour(x), bitFour(y)))
}

export function scalarOne(): Cl4Blade {
  return { form: "signed-blade", sign: { form: "positive" }, e1: { form: "no" }, e2: { form: "no" }, e3: { form: "no" }, e4: { form: "no" } }
}

export function volume(): Cl4Blade {
  return { form: "signed-blade", sign: { form: "positive" }, e1: { form: "yes" }, e2: { form: "yes" }, e3: { form: "yes" }, e4: { form: "yes" } }
}

export function negateBlade(x: Cl4Blade): Cl4Blade {
  return bladeOf(flipSign(bladeSign(x)), bitOne(x), bitTwo(x), bitThree(x), bitFour(x))
}

export function oddGrade(x: Cl4Blade): Flag {
  return differ(differ(bitOne(x), bitTwo(x)), differ(bitThree(x), bitFour(x)))
}

export function bladeProductIsAssociative(a: Cl4Blade, b: Cl4Blade, c: Cl4Blade): Cl4Blade {
  // hold: verified at compile time
  return a
}

export function bladeProductHasALeftIdentity(a: Cl4Blade): Cl4Blade {
  // hold: verified at compile time
  return a
}

export function bladeProductHasARightIdentity(a: Cl4Blade): Cl4Blade {
  // hold: verified at compile time
  return a
}

export function everyBladeSquaresToAScalar(x: Cl4Blade): Cl4Blade {
  // hold: verified at compile time
  return x
}

export function eOneAndETwoAnticommute(): void {
  // hold: verified at compile time
  return undefined
}

export function aBivectorSquaresToMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function theVolumeElementSquaresToOne(): void {
  // hold: verified at compile time
  return undefined
}

export function theVolumeElementCommutesWithEvenAndAnticommutesWithOdd(x: Cl4Blade): Cl4Blade {
  // hold: verified at compile time
  return x
}

export function gradeParityAddsUnderTheProduct(x: Cl4Blade, y: Cl4Blade): Cl4Blade {
  // hold: verified at compile time
  return x
}

export function rightVolume(x: Cl4Blade): Cl4Blade {
  return bladeProduct(x, volume())
}

export function rightVolumeIsAnInvolution(x: Cl4Blade): Cl4Blade {
  // hold: verified at compile time
  return x
}

export function rightVolumeComplementsEveryBit(x: Cl4Blade): Cl4Blade {
  // hold: verified at compile time
  return x
}
