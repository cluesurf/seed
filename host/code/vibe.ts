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

export function isVibe(a: Tone): Flag {
  if (a.form === "fear") {
    return { form: "yes" }
  } else if (a.form === "calm") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
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

export type Balance =
  | { form: "minus-four" }
  | { form: "minus-three" }
  | { form: "minus-two" }
  | { form: "minus-one" }
  | { form: "even" }
  | { form: "plus-one" }
  | { form: "plus-two" }
  | { form: "plus-three" }
  | { form: "plus-four" }

export function balanceShift(n: Balance, t: Tone): Balance {
  if (n.form === "minus-four") {
    if (t.form === "fear") {
      return { form: "minus-four" }
    } else if (t.form === "calm") {
      return { form: "minus-four" }
    } else {
      return { form: "minus-three" }
    }
  } else if (n.form === "minus-three") {
    if (t.form === "fear") {
      return { form: "minus-four" }
    } else if (t.form === "calm") {
      return { form: "minus-three" }
    } else {
      return { form: "minus-two" }
    }
  } else if (n.form === "minus-two") {
    if (t.form === "fear") {
      return { form: "minus-three" }
    } else if (t.form === "calm") {
      return { form: "minus-two" }
    } else {
      return { form: "minus-one" }
    }
  } else if (n.form === "minus-one") {
    if (t.form === "fear") {
      return { form: "minus-two" }
    } else if (t.form === "calm") {
      return { form: "minus-one" }
    } else {
      return { form: "even" }
    }
  } else if (n.form === "even") {
    if (t.form === "fear") {
      return { form: "minus-one" }
    } else if (t.form === "calm") {
      return { form: "even" }
    } else {
      return { form: "plus-one" }
    }
  } else if (n.form === "plus-one") {
    if (t.form === "fear") {
      return { form: "even" }
    } else if (t.form === "calm") {
      return { form: "plus-one" }
    } else {
      return { form: "plus-two" }
    }
  } else if (n.form === "plus-two") {
    if (t.form === "fear") {
      return { form: "plus-one" }
    } else if (t.form === "calm") {
      return { form: "plus-two" }
    } else {
      return { form: "plus-three" }
    }
  } else if (n.form === "plus-three") {
    if (t.form === "fear") {
      return { form: "plus-two" }
    } else if (t.form === "calm") {
      return { form: "plus-three" }
    } else {
      return { form: "plus-four" }
    }
  } else {
    if (t.form === "fear") {
      return { form: "plus-three" }
    } else if (t.form === "calm") {
      return { form: "plus-four" }
    } else {
      return { form: "plus-four" }
    }
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

export function q8Inverse(q: Q8): Q8 {
  if (q.form === "signed") {
    const sign = q.sign
    const axis = q.axis
    if (axis.form === "real-axis") {
      return q
    } else if (axis.form === "i-axis") {
      return q8Of(flipSign(sign), { form: "i-axis" })
    } else if (axis.form === "j-axis") {
      return q8Of(flipSign(sign), { form: "j-axis" })
    } else {
      return q8Of(flipSign(sign), { form: "k-axis" })
    }
  }
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

export function hurwitzInverse(g: HurwitzElement): HurwitzElement {
  return hurwitzOf(q8TurnBy(toneConjugate(hurwitzTurn(g)), q8Inverse(hurwitzCore(g))), toneConjugate(hurwitzTurn(g)))
}

export function minusOneUnit(): HurwitzElement {
  return { form: "unit-of", core: { form: "signed", sign: { form: "negative" }, axis: { form: "real-axis" } }, turn: { form: "calm" } }
}

export function unitI(): HurwitzElement {
  return { form: "unit-of", core: { form: "signed", sign: { form: "positive" }, axis: { form: "i-axis" } }, turn: { form: "calm" } }
}

export type Half =
  | { form: "minus-whole" }
  | { form: "minus-half" }
  | { form: "naught" }
  | { form: "plus-half" }
  | { form: "plus-whole" }

export function halfNegate(a: Half): Half {
  if (a.form === "minus-whole") {
    return { form: "plus-whole" }
  } else if (a.form === "minus-half") {
    return { form: "plus-half" }
  } else if (a.form === "naught") {
    return { form: "naught" }
  } else if (a.form === "plus-half") {
    return { form: "minus-half" }
  } else {
    return { form: "minus-whole" }
  }
}

export type QuaternionPoint =
  | { form: "coordinates"; r: Half; i: Half; j: Half; k: Half }

export function pointOf(r: Half, i: Half, j: Half, k: Half): QuaternionPoint {
  return { form: "coordinates", r: r, i: i, j: j, k: k }
}

export function omegaPowerPoint(t: Tone): QuaternionPoint {
  if (t.form === "calm") {
    return { form: "coordinates", r: { form: "plus-whole" }, i: { form: "naught" }, j: { form: "naught" }, k: { form: "naught" } }
  } else if (t.form === "love") {
    return { form: "coordinates", r: { form: "minus-half" }, i: { form: "plus-half" }, j: { form: "plus-half" }, k: { form: "plus-half" } }
  } else {
    return { form: "coordinates", r: { form: "minus-half" }, i: { form: "minus-half" }, j: { form: "minus-half" }, k: { form: "minus-half" } }
  }
}

export function axisTimesPoint(a: HurwitzAxis, p: QuaternionPoint): QuaternionPoint {
  if (p.form === "coordinates") {
    const r = p.r
    const i = p.i
    const j = p.j
    const k = p.k
    if (a.form === "real-axis") {
      return p
    } else if (a.form === "i-axis") {
      return pointOf(halfNegate(i), r, halfNegate(k), j)
    } else if (a.form === "j-axis") {
      return pointOf(halfNegate(j), k, r, halfNegate(i))
    } else {
      return pointOf(halfNegate(k), halfNegate(j), i, r)
    }
  }
}

export function signTimesPoint(s: Sign, p: QuaternionPoint): QuaternionPoint {
  if (s.form === "positive") {
    return p
  } else {
    if (p.form === "coordinates") {
      const r = p.r
      const i = p.i
      const j = p.j
      const k = p.k
      return pointOf(halfNegate(r), halfNegate(i), halfNegate(j), halfNegate(k))
    }
  }
}

export function hurwitzPoint(g: HurwitzElement): QuaternionPoint {
  return signTimesPoint(q8Sign(hurwitzCore(g)), axisTimesPoint(q8Axis(hurwitzCore(g)), omegaPowerPoint(hurwitzTurn(g))))
}

export type Tetrad =
  | { form: "tones-of"; first: Tone; second: Tone; third: Tone; fourth: Tone }

export function tetradOf(first: Tone, second: Tone, third: Tone, fourth: Tone): Tetrad {
  return { form: "tones-of", first: first, second: second, third: third, fourth: fourth }
}

export function tetradFirst(v: Tetrad): Tone {
  if (v.form === "tones-of") {
    const first = v.first
    return first
  }
}

export function tetradSecond(v: Tetrad): Tone {
  if (v.form === "tones-of") {
    const second = v.second
    return second
  }
}

export function tetradThird(v: Tetrad): Tone {
  if (v.form === "tones-of") {
    const third = v.third
    return third
  }
}

export function tetradFourth(v: Tetrad): Tone {
  if (v.form === "tones-of") {
    const fourth = v.fourth
    return fourth
  }
}

export function sameTetrad(v: Tetrad, w: Tetrad): Flag {
  return both(both(sameTone(tetradFirst(v), tetradFirst(w)), sameTone(tetradSecond(v), tetradSecond(w))), both(sameTone(tetradThird(v), tetradThird(w)), sameTone(tetradFourth(v), tetradFourth(w))))
}

export function opposite(v: Tetrad): Tetrad {
  return tetradOf(toneConjugate(tetradFirst(v)), toneConjugate(tetradSecond(v)), toneConjugate(tetradThird(v)), toneConjugate(tetradFourth(v)))
}

export function frameFromFlags(firstPair: Flag, crossedPair: Flag): Tone {
  if (firstPair.form === "yes") {
    return { form: "calm" }
  } else {
    if (crossedPair.form === "yes") {
      return { form: "love" }
    } else {
      return { form: "fear" }
    }
  }
}

export function bothVibes(a: Tone, b: Tone): Flag {
  return both(isVibe(a), isVibe(b))
}

export function frameOf(v: Tetrad): Tone {
  return frameFromFlags(either(bothVibes(tetradFirst(v), tetradSecond(v)), bothVibes(tetradThird(v), tetradFourth(v))), either(bothVibes(tetradFirst(v), tetradFourth(v)), bothVibes(tetradSecond(v), tetradThird(v))))
}

export function halve(n: Balance): Tone {
  if (n.form === "minus-four") {
    return { form: "calm" }
  } else if (n.form === "minus-three") {
    return { form: "calm" }
  } else if (n.form === "minus-two") {
    return { form: "fear" }
  } else if (n.form === "minus-one") {
    return { form: "calm" }
  } else if (n.form === "even") {
    return { form: "calm" }
  } else if (n.form === "plus-one") {
    return { form: "calm" }
  } else if (n.form === "plus-two") {
    return { form: "love" }
  } else if (n.form === "plus-three") {
    return { form: "calm" }
  } else {
    return { form: "calm" }
  }
}

export function twice(a: Half): Balance {
  if (a.form === "minus-whole") {
    return { form: "minus-two" }
  } else if (a.form === "minus-half") {
    return { form: "minus-one" }
  } else if (a.form === "naught") {
    return { form: "even" }
  } else if (a.form === "plus-half") {
    return { form: "plus-one" }
  } else {
    return { form: "plus-two" }
  }
}

export function halfPairSum(a: Half, b: Half): Tone {
  return halve(addBalance(twice(a), twice(b)))
}

export function addBalance(m: Balance, n: Balance): Balance {
  if (n.form === "minus-four") {
    return balanceShift(balanceShift(balanceShift(balanceShift(m, { form: "fear" }), { form: "fear" }), { form: "fear" }), { form: "fear" })
  } else if (n.form === "minus-three") {
    return balanceShift(balanceShift(balanceShift(m, { form: "fear" }), { form: "fear" }), { form: "fear" })
  } else if (n.form === "minus-two") {
    return balanceShift(balanceShift(m, { form: "fear" }), { form: "fear" })
  } else if (n.form === "minus-one") {
    return balanceShift(m, { form: "fear" })
  } else if (n.form === "even") {
    return m
  } else if (n.form === "plus-one") {
    return balanceShift(m, { form: "love" })
  } else if (n.form === "plus-two") {
    return balanceShift(balanceShift(m, { form: "love" }), { form: "love" })
  } else if (n.form === "plus-three") {
    return balanceShift(balanceShift(balanceShift(m, { form: "love" }), { form: "love" }), { form: "love" })
  } else {
    return balanceShift(balanceShift(balanceShift(balanceShift(m, { form: "love" }), { form: "love" }), { form: "love" }), { form: "love" })
  }
}

export function unitSlot(g: HurwitzElement): Tetrad {
  {
    const __at1 = hurwitzPoint(g)
    if (__at1.form === "coordinates") {
    const r = __at1.r
    const i = __at1.i
    const j = __at1.j
    const k = __at1.k
    return tetradOf(halfPairSum(r, i), halfPairSum(r, halfNegate(i)), halfPairSum(j, k), halfPairSum(j, halfNegate(k)))
  }
  }
}

export function hopf(g: HurwitzElement): HurwitzElement {
  return hurwitzProduct(hurwitzProduct(g, unitI()), hurwitzInverse(g))
}

export function axisOfFrame(t: Tone): HurwitzAxis {
  if (t.form === "calm") {
    return { form: "i-axis" }
  } else if (t.form === "love") {
    return { form: "k-axis" }
  } else {
    return { form: "j-axis" }
  }
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

export function theFrameOfASlotIsTheAxisOfItsHopfCircle(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function hurwitzOfOne(): HurwitzElement {
  return hurwitzProduct(minusOneUnit(), minusOneUnit())
}

export function theFullTurnIsTheOppositeSlot(): void {
  // hold: verified at compile time
  return undefined
}

export function theFullTurnIsMinusTheIdentityOnTheGrid(): void {
  // hold: verified at compile time
  return undefined
}
