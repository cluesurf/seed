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

export function implies(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return b
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

export function sameSign(a: Sign, b: Sign): Flag {
  if (a.form === "positive") {
    if (b.form === "positive") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "positive") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export type Tone =
  | { form: "fear" }
  | { form: "calm" }
  | { form: "love" }

export function toneSum(a: Tone, b: Tone): Tone {
  if (a.form === "fear") {
    if (b.form === "fear") {
      return { form: "love" }
    } else if (b.form === "calm") {
      return { form: "fear" }
    } else {
      return { form: "calm" }
    }
  } else if (a.form === "calm") {
    if (b.form === "fear") {
      return { form: "fear" }
    } else if (b.form === "calm") {
      return { form: "calm" }
    } else {
      return { form: "love" }
    }
  } else {
    if (b.form === "fear") {
      return { form: "calm" }
    } else if (b.form === "calm") {
      return { form: "love" }
    } else {
      return { form: "fear" }
    }
  }
}

export function toneProduct(a: Tone, b: Tone): Tone {
  if (a.form === "fear") {
    if (b.form === "fear") {
      return { form: "love" }
    } else if (b.form === "calm") {
      return { form: "calm" }
    } else {
      return { form: "fear" }
    }
  } else if (a.form === "calm") {
    if (b.form === "fear") {
      return { form: "calm" }
    } else if (b.form === "calm") {
      return { form: "calm" }
    } else {
      return { form: "calm" }
    }
  } else {
    if (b.form === "fear") {
      return { form: "fear" }
    } else if (b.form === "calm") {
      return { form: "calm" }
    } else {
      return { form: "love" }
    }
  }
}

export function toneConjugate(a: Tone): Tone {
  if (a.form === "fear") {
    return { form: "love" }
  } else if (a.form === "calm") {
    return { form: "calm" }
  } else {
    return { form: "fear" }
  }
}

export function toneDifference(a: Tone, b: Tone): Tone {
  return toneSum(a, toneConjugate(b))
}

export function sameTone(a: Tone, b: Tone): Flag {
  if (a.form === "fear") {
    if (b.form === "fear") {
      return { form: "yes" }
    } else if (b.form === "calm") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "calm") {
    if (b.form === "fear") {
      return { form: "no" }
    } else if (b.form === "calm") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "fear") {
      return { form: "no" }
    } else if (b.form === "calm") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export type Role =
  | { form: "grid-point"; shift: Tone; clock: Tone }

export function roleOf(shift: Tone, clock: Tone): Role {
  return { form: "grid-point", shift: shift, clock: clock }
}

export function roleShift(u: Role): Tone {
  if (u.form === "grid-point") {
    const shift = u.shift
    return shift
  }
}

export function roleClock(u: Role): Tone {
  if (u.form === "grid-point") {
    const clock = u.clock
    return clock
  }
}

export function roleSum(u: Role, v: Role): Role {
  return roleOf(toneSum(roleShift(u), roleShift(v)), toneSum(roleClock(u), roleClock(v)))
}

export function wedge(u: Role, v: Role): Tone {
  return toneDifference(toneProduct(roleShift(u), roleClock(v)), toneProduct(roleClock(u), roleShift(v)))
}

export type Weyl =
  | { form: "operator"; phase: Tone; place: Role }

export function weylOf(phase: Tone, place: Role): Weyl {
  return { form: "operator", phase: phase, place: place }
}

export function weylPhase(g: Weyl): Tone {
  if (g.form === "operator") {
    const phase = g.phase
    return phase
  }
}

export function weylPlace(g: Weyl): Role {
  if (g.form === "operator") {
    const place = g.place
    return place
  }
}

export function weylProduct(g: Weyl, k: Weyl): Weyl {
  return weylOf(toneSum(toneSum(weylPhase(g), weylPhase(k)), wedge(weylPlace(g), weylPlace(k))), roleSum(weylPlace(g), weylPlace(k)))
}

export type HurwitzAxis =
  | { form: "real-axis" }
  | { form: "i-axis" }
  | { form: "j-axis" }
  | { form: "k-axis" }

export type Q8 =
  | { form: "signed"; sign: Sign; axis: HurwitzAxis }

export function q8Of(sign: Sign, axis: HurwitzAxis): Q8 {
  return { form: "signed", sign: sign, axis: axis }
}

export function q8Sign(q: Q8): Sign {
  if (q.form === "signed") {
    const sign = q.sign
    return sign
  }
}

export function q8Axis(q: Q8): HurwitzAxis {
  if (q.form === "signed") {
    const axis = q.axis
    return axis
  }
}

export function signTimes(a: Sign, b: Sign): Sign {
  if (a.form === "positive") {
    return b
  } else {
    return flipSign(b)
  }
}

export function axisProduct(a: HurwitzAxis, b: HurwitzAxis): Q8 {
  if (a.form === "real-axis") {
    if (b.form === "real-axis") {
      return { form: "signed", sign: { form: "positive" }, axis: { form: "real-axis" } }
    } else if (b.form === "i-axis") {
      return { form: "signed", sign: { form: "positive" }, axis: { form: "i-axis" } }
    } else if (b.form === "j-axis") {
      return { form: "signed", sign: { form: "positive" }, axis: { form: "j-axis" } }
    } else {
      return { form: "signed", sign: { form: "positive" }, axis: { form: "k-axis" } }
    }
  } else if (a.form === "i-axis") {
    if (b.form === "real-axis") {
      return { form: "signed", sign: { form: "positive" }, axis: { form: "i-axis" } }
    } else if (b.form === "i-axis") {
      return { form: "signed", sign: { form: "negative" }, axis: { form: "real-axis" } }
    } else if (b.form === "j-axis") {
      return { form: "signed", sign: { form: "positive" }, axis: { form: "k-axis" } }
    } else {
      return { form: "signed", sign: { form: "negative" }, axis: { form: "j-axis" } }
    }
  } else if (a.form === "j-axis") {
    if (b.form === "real-axis") {
      return { form: "signed", sign: { form: "positive" }, axis: { form: "j-axis" } }
    } else if (b.form === "i-axis") {
      return { form: "signed", sign: { form: "negative" }, axis: { form: "k-axis" } }
    } else if (b.form === "j-axis") {
      return { form: "signed", sign: { form: "negative" }, axis: { form: "real-axis" } }
    } else {
      return { form: "signed", sign: { form: "positive" }, axis: { form: "i-axis" } }
    }
  } else {
    if (b.form === "real-axis") {
      return { form: "signed", sign: { form: "positive" }, axis: { form: "k-axis" } }
    } else if (b.form === "i-axis") {
      return { form: "signed", sign: { form: "positive" }, axis: { form: "j-axis" } }
    } else if (b.form === "j-axis") {
      return { form: "signed", sign: { form: "negative" }, axis: { form: "i-axis" } }
    } else {
      return { form: "signed", sign: { form: "negative" }, axis: { form: "real-axis" } }
    }
  }
}

export function q8Product(x: Q8, y: Q8): Q8 {
  return q8Of(signTimes(signTimes(q8Sign(x), q8Sign(y)), q8Sign(axisProduct(q8Axis(x), q8Axis(y)))), q8Axis(axisProduct(q8Axis(x), q8Axis(y))))
}

export function turnAxis(a: HurwitzAxis): HurwitzAxis {
  if (a.form === "real-axis") {
    return { form: "real-axis" }
  } else if (a.form === "i-axis") {
    return { form: "k-axis" }
  } else if (a.form === "j-axis") {
    return { form: "i-axis" }
  } else {
    return { form: "j-axis" }
  }
}

export function q8Turn(q: Q8): Q8 {
  return q8Of(q8Sign(q), turnAxis(q8Axis(q)))
}

export function q8TurnBy(t: Tone, q: Q8): Q8 {
  if (t.form === "calm") {
    return q
  } else if (t.form === "love") {
    return q8Turn(q)
  } else {
    return q8Turn(q8Turn(q))
  }
}

export type HurwitzElement =
  | { form: "unit-of"; core: Q8; turn: Tone }

export function hurwitzOf(core: Q8, turn: Tone): HurwitzElement {
  return { form: "unit-of", core: core, turn: turn }
}

export function hurwitzCore(g: HurwitzElement): Q8 {
  if (g.form === "unit-of") {
    const core = g.core
    return core
  }
}

export function hurwitzTurn(g: HurwitzElement): Tone {
  if (g.form === "unit-of") {
    const turn = g.turn
    return turn
  }
}

export function hurwitzProduct(g: HurwitzElement, h: HurwitzElement): HurwitzElement {
  return hurwitzOf(q8Product(hurwitzCore(g), q8TurnBy(hurwitzTurn(g), hurwitzCore(h))), toneSum(hurwitzTurn(g), hurwitzTurn(h)))
}

export function sameQ8(x: Q8, y: Q8): Flag {
  return both(sameSign(q8Sign(x), q8Sign(y)), sameAxis(q8Axis(x), q8Axis(y)))
}

export function sameAxis(a: HurwitzAxis, b: HurwitzAxis): Flag {
  if (a.form === "real-axis") {
    if (b.form === "real-axis") {
      return { form: "yes" }
    } else if (b.form === "i-axis") {
      return { form: "no" }
    } else if (b.form === "j-axis") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "i-axis") {
    if (b.form === "real-axis") {
      return { form: "no" }
    } else if (b.form === "i-axis") {
      return { form: "yes" }
    } else if (b.form === "j-axis") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "j-axis") {
    if (b.form === "real-axis") {
      return { form: "no" }
    } else if (b.form === "i-axis") {
      return { form: "no" }
    } else if (b.form === "j-axis") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "real-axis") {
      return { form: "no" }
    } else if (b.form === "i-axis") {
      return { form: "no" }
    } else if (b.form === "j-axis") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function sameHurwitz(g: HurwitzElement, h: HurwitzElement): Flag {
  return both(sameQ8(hurwitzCore(g), hurwitzCore(h)), sameTone(hurwitzTurn(g), hurwitzTurn(h)))
}

export type TurnMatrix =
  | { form: "grid"; a: Tone; b: Tone; c: Tone; d: Tone }

export function matrixOf(a: Tone, b: Tone, c: Tone, d: Tone): TurnMatrix {
  return { form: "grid", a: a, b: b, c: c, d: d }
}

export function entryA(m: TurnMatrix): Tone {
  if (m.form === "grid") {
    const a = m.a
    return a
  }
}

export function entryB(m: TurnMatrix): Tone {
  if (m.form === "grid") {
    const b = m.b
    return b
  }
}

export function entryC(m: TurnMatrix): Tone {
  if (m.form === "grid") {
    const c = m.c
    return c
  }
}

export function entryD(m: TurnMatrix): Tone {
  if (m.form === "grid") {
    const d = m.d
    return d
  }
}

export function rowTimesColumn(x: Tone, y: Tone, z: Tone, w: Tone): Tone {
  return toneSum(toneProduct(x, y), toneProduct(z, w))
}

export function turnCompose(m: TurnMatrix, n: TurnMatrix): TurnMatrix {
  return matrixOf(rowTimesColumn(entryA(m), entryA(n), entryB(m), entryC(n)), rowTimesColumn(entryA(m), entryB(n), entryB(m), entryD(n)), rowTimesColumn(entryC(m), entryA(n), entryD(m), entryC(n)), rowTimesColumn(entryC(m), entryB(n), entryD(m), entryD(n)))
}

export function determinant(m: TurnMatrix): Tone {
  return toneDifference(toneProduct(entryA(m), entryD(m)), toneProduct(entryB(m), entryC(m)))
}

export function applyTurn(m: TurnMatrix, u: Role): Role {
  return roleOf(rowTimesColumn(entryA(m), roleShift(u), entryB(m), roleClock(u)), rowTimesColumn(entryC(m), roleShift(u), entryD(m), roleClock(u)))
}

export function sameMatrix(m: TurnMatrix, n: TurnMatrix): Flag {
  return both(both(sameTone(entryA(m), entryA(n)), sameTone(entryB(m), entryB(n))), both(sameTone(entryC(m), entryC(n)), sameTone(entryD(m), entryD(n))))
}

export function theDeterminantIsMultiplicative(m: TurnMatrix, n: TurnMatrix): TurnMatrix {
  // hold: verified at compile time
  return m
}

export function aProductOfTurnsMovesTheGridAsOneMoveAfterTheOther(m: TurnMatrix, n: TurnMatrix, u: Role): TurnMatrix {
  // hold: verified at compile time
  return m
}

export function aTurnScalesTheWedgeByItsDeterminant(m: TurnMatrix, u: Role, v: Role): TurnMatrix {
  // hold: verified at compile time
  return m
}

export function axisMatrix(a: HurwitzAxis): TurnMatrix {
  if (a.form === "real-axis") {
    return { form: "grid", a: { form: "love" }, b: { form: "calm" }, c: { form: "calm" }, d: { form: "love" } }
  } else if (a.form === "i-axis") {
    return { form: "grid", a: { form: "calm" }, b: { form: "love" }, c: { form: "fear" }, d: { form: "calm" } }
  } else if (a.form === "j-axis") {
    return { form: "grid", a: { form: "love" }, b: { form: "love" }, c: { form: "love" }, d: { form: "fear" } }
  } else {
    return { form: "grid", a: { form: "love" }, b: { form: "fear" }, c: { form: "fear" }, d: { form: "fear" } }
  }
}

export function signMatrix(s: Sign, m: TurnMatrix): TurnMatrix {
  if (s.form === "positive") {
    return m
  } else {
    return matrixOf(toneConjugate(entryA(m)), toneConjugate(entryB(m)), toneConjugate(entryC(m)), toneConjugate(entryD(m)))
  }
}

export function omegaMatrix(): TurnMatrix {
  return { form: "grid", a: { form: "fear" }, b: { form: "fear" }, c: { form: "love" }, d: { form: "calm" } }
}

export function omegaMatrixPower(t: Tone): TurnMatrix {
  if (t.form === "calm") {
    return { form: "grid", a: { form: "love" }, b: { form: "calm" }, c: { form: "calm" }, d: { form: "love" } }
  } else if (t.form === "love") {
    return omegaMatrix()
  } else {
    return turnCompose(omegaMatrix(), omegaMatrix())
  }
}

export function rho(g: HurwitzElement): TurnMatrix {
  return turnCompose(signMatrix(q8Sign(hurwitzCore(g)), axisMatrix(q8Axis(hurwitzCore(g)))), omegaMatrixPower(hurwitzTurn(g)))
}

export function rhoIsAHomomorphism(a: HurwitzElement, b: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return a
}

export function everyImageHasDeterminantOne(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function rhoIsInjective(g: HurwitzElement, h: HurwitzElement): HurwitzElement {
  if (sameMatrix(rho(g), rho(h)) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return g
}

export function q8ImageOf(m: TurnMatrix): Flag {
  return either(either(either(both(both(sameTone(entryA(m), entryA({ form: "grid", a: { form: "love" }, b: { form: "calm" }, c: { form: "calm" }, d: { form: "love" } })), sameTone(entryB(m), entryB({ form: "grid", a: { form: "love" }, b: { form: "calm" }, c: { form: "calm" }, d: { form: "love" } }))), both(sameTone(entryC(m), entryC({ form: "grid", a: { form: "love" }, b: { form: "calm" }, c: { form: "calm" }, d: { form: "love" } })), sameTone(entryD(m), entryD({ form: "grid", a: { form: "love" }, b: { form: "calm" }, c: { form: "calm" }, d: { form: "love" } })))), sameMatrix(m, matrixOf(toneConjugate(entryA({ form: "grid", a: { form: "love" }, b: { form: "calm" }, c: { form: "calm" }, d: { form: "love" } })), toneConjugate(entryB({ form: "grid", a: { form: "love" }, b: { form: "calm" }, c: { form: "calm" }, d: { form: "love" } })), toneConjugate(entryC({ form: "grid", a: { form: "love" }, b: { form: "calm" }, c: { form: "calm" }, d: { form: "love" } })), toneConjugate(entryD({ form: "grid", a: { form: "love" }, b: { form: "calm" }, c: { form: "calm" }, d: { form: "love" } }))))), either(both(both(sameTone(entryA(m), entryA({ form: "grid", a: { form: "calm" }, b: { form: "love" }, c: { form: "fear" }, d: { form: "calm" } })), sameTone(entryB(m), entryB({ form: "grid", a: { form: "calm" }, b: { form: "love" }, c: { form: "fear" }, d: { form: "calm" } }))), both(sameTone(entryC(m), entryC({ form: "grid", a: { form: "calm" }, b: { form: "love" }, c: { form: "fear" }, d: { form: "calm" } })), sameTone(entryD(m), entryD({ form: "grid", a: { form: "calm" }, b: { form: "love" }, c: { form: "fear" }, d: { form: "calm" } })))), sameMatrix(m, matrixOf(toneConjugate(entryA({ form: "grid", a: { form: "calm" }, b: { form: "love" }, c: { form: "fear" }, d: { form: "calm" } })), toneConjugate(entryB({ form: "grid", a: { form: "calm" }, b: { form: "love" }, c: { form: "fear" }, d: { form: "calm" } })), toneConjugate(entryC({ form: "grid", a: { form: "calm" }, b: { form: "love" }, c: { form: "fear" }, d: { form: "calm" } })), toneConjugate(entryD({ form: "grid", a: { form: "calm" }, b: { form: "love" }, c: { form: "fear" }, d: { form: "calm" } })))))), either(either(both(both(sameTone(entryA(m), entryA({ form: "grid", a: { form: "love" }, b: { form: "love" }, c: { form: "love" }, d: { form: "fear" } })), sameTone(entryB(m), entryB({ form: "grid", a: { form: "love" }, b: { form: "love" }, c: { form: "love" }, d: { form: "fear" } }))), both(sameTone(entryC(m), entryC({ form: "grid", a: { form: "love" }, b: { form: "love" }, c: { form: "love" }, d: { form: "fear" } })), sameTone(entryD(m), entryD({ form: "grid", a: { form: "love" }, b: { form: "love" }, c: { form: "love" }, d: { form: "fear" } })))), sameMatrix(m, matrixOf(toneConjugate(entryA({ form: "grid", a: { form: "love" }, b: { form: "love" }, c: { form: "love" }, d: { form: "fear" } })), toneConjugate(entryB({ form: "grid", a: { form: "love" }, b: { form: "love" }, c: { form: "love" }, d: { form: "fear" } })), toneConjugate(entryC({ form: "grid", a: { form: "love" }, b: { form: "love" }, c: { form: "love" }, d: { form: "fear" } })), toneConjugate(entryD({ form: "grid", a: { form: "love" }, b: { form: "love" }, c: { form: "love" }, d: { form: "fear" } }))))), either(both(both(sameTone(entryA(m), entryA({ form: "grid", a: { form: "love" }, b: { form: "fear" }, c: { form: "fear" }, d: { form: "fear" } })), sameTone(entryB(m), entryB({ form: "grid", a: { form: "love" }, b: { form: "fear" }, c: { form: "fear" }, d: { form: "fear" } }))), both(sameTone(entryC(m), entryC({ form: "grid", a: { form: "love" }, b: { form: "fear" }, c: { form: "fear" }, d: { form: "fear" } })), sameTone(entryD(m), entryD({ form: "grid", a: { form: "love" }, b: { form: "fear" }, c: { form: "fear" }, d: { form: "fear" } })))), sameMatrix(m, matrixOf(toneConjugate(entryA({ form: "grid", a: { form: "love" }, b: { form: "fear" }, c: { form: "fear" }, d: { form: "fear" } })), toneConjugate(entryB({ form: "grid", a: { form: "love" }, b: { form: "fear" }, c: { form: "fear" }, d: { form: "fear" } })), toneConjugate(entryC({ form: "grid", a: { form: "love" }, b: { form: "fear" }, c: { form: "fear" }, d: { form: "fear" } })), toneConjugate(entryD({ form: "grid", a: { form: "love" }, b: { form: "fear" }, c: { form: "fear" }, d: { form: "fear" } })))))))
}

export function signOfTone(t: Tone): Sign {
  if (t.form === "love") {
    return { form: "positive" }
  } else if (t.form === "calm") {
    return { form: "positive" }
  } else {
    return { form: "negative" }
  }
}

export function q8OfMatrix(m: TurnMatrix): Q8 {
  if (m.form === "grid") {
    const a = m.a
    const b = m.b
    if (b.form === "calm") {
      return q8Of(signOfTone(a), { form: "real-axis" })
    } else if (b.form === "love") {
      if (a.form === "calm") {
        return { form: "signed", sign: { form: "positive" }, axis: { form: "i-axis" } }
      } else if (a.form === "love") {
        return { form: "signed", sign: { form: "positive" }, axis: { form: "j-axis" } }
      } else {
        return { form: "signed", sign: { form: "negative" }, axis: { form: "k-axis" } }
      }
    } else {
      if (a.form === "calm") {
        return { form: "signed", sign: { form: "negative" }, axis: { form: "i-axis" } }
      } else if (a.form === "love") {
        return { form: "signed", sign: { form: "positive" }, axis: { form: "k-axis" } }
      } else {
        return { form: "signed", sign: { form: "negative" }, axis: { form: "j-axis" } }
      }
    }
  }
}

export function turnFromFlags(here: Flag, backOne: Flag): Tone {
  if (here.form === "yes") {
    return { form: "calm" }
  } else {
    if (backOne.form === "yes") {
      return { form: "love" }
    } else {
      return { form: "fear" }
    }
  }
}

export function turnOfMatrix(m: TurnMatrix): Tone {
  return turnFromFlags(q8ImageOf(m), q8ImageOf(turnCompose(m, turnCompose(omegaMatrix(), omegaMatrix()))))
}

export function unrhoByCases(here: Flag, backOne: Flag, m: TurnMatrix): HurwitzElement {
  if (here.form === "yes") {
    return hurwitzOf(q8OfMatrix(m), { form: "calm" })
  } else {
    if (backOne.form === "yes") {
      return hurwitzOf(q8OfMatrix(turnCompose(m, turnCompose(omegaMatrix(), omegaMatrix()))), { form: "love" })
    } else {
      return hurwitzOf(q8OfMatrix(turnCompose(m, omegaMatrix())), { form: "fear" })
    }
  }
}

export function unrho(m: TurnMatrix): HurwitzElement {
  return unrhoByCases(q8ImageOf(m), q8ImageOf(turnCompose(m, turnCompose(omegaMatrix(), omegaMatrix()))), m)
}

export function everyDeterminantOneMatrixIsAnImage(m: TurnMatrix): TurnMatrix {
  // hold: verified at compile time
  return m
}

export function turnWeyl(m: TurnMatrix, g: Weyl): Weyl {
  return weylOf(weylPhase(g), applyTurn(m, weylPlace(g)))
}

export function shiftWeyl(t: Role, g: Weyl): Weyl {
  return weylOf(toneSum(weylPhase(g), wedge(t, weylPlace(g))), weylPlace(g))
}

export function aSymplecticTurnIsAnAutomorphism(m: TurnMatrix, g: Weyl, h: Weyl): TurnMatrix {
  if (determinant(m) == { form: "love" }) {
    // hold: verified at compile time
  }
  return m
}

export function aGridShiftIsAnAutomorphism(t: Role, g: Weyl, h: Weyl): Role {
  // hold: verified at compile time
  return t
}
