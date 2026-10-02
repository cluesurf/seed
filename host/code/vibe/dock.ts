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

export function totalOfThree(a: Tone, b: Tone, c: Tone): Balance {
  return balanceShift(balanceShift(balanceShift({ form: "even" }, a), b), c)
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

export function presence(t: Tone): Tone {
  if (t.form === "fear") {
    return { form: "love" }
  } else if (t.form === "calm") {
    return { form: "calm" }
  } else {
    return { form: "love" }
  }
}

export function support(v: Tetrad): Balance {
  return balanceShift(totalOfThree(presence(tetradFirst(v)), presence(tetradSecond(v)), presence(tetradThird(v))), presence(tetradFourth(v)))
}

export function isSlot(v: Tetrad): Flag {
  {
    const __at1 = support(v)
    if (__at1.form === "minus-four") {
    return { form: "no" }
  } else if (__at1.form === "minus-three") {
    return { form: "no" }
  } else if (__at1.form === "minus-two") {
    return { form: "no" }
  } else if (__at1.form === "minus-one") {
    return { form: "no" }
  } else if (__at1.form === "even") {
    return { form: "no" }
  } else if (__at1.form === "plus-one") {
    return { form: "no" }
  } else if (__at1.form === "plus-two") {
    return { form: "yes" }
  } else if (__at1.form === "plus-three") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
  }
}

export function dot(v: Tetrad, w: Tetrad): Balance {
  return balanceShift(totalOfThree(toneProduct(tetradFirst(v), tetradFirst(w)), toneProduct(tetradSecond(v), tetradSecond(w)), toneProduct(tetradThird(v), tetradThird(w))), toneProduct(tetradFourth(v), tetradFourth(w)))
}

export function balanceNegate(n: Balance): Balance {
  if (n.form === "minus-four") {
    return { form: "plus-four" }
  } else if (n.form === "minus-three") {
    return { form: "plus-three" }
  } else if (n.form === "minus-two") {
    return { form: "plus-two" }
  } else if (n.form === "minus-one") {
    return { form: "plus-one" }
  } else if (n.form === "even") {
    return { form: "even" }
  } else if (n.form === "plus-one") {
    return { form: "minus-one" }
  } else if (n.form === "plus-two") {
    return { form: "minus-two" }
  } else if (n.form === "plus-three") {
    return { form: "minus-three" }
  } else {
    return { form: "minus-four" }
  }
}

export function isOddDot(n: Balance): Flag {
  if (n.form === "minus-four") {
    return { form: "no" }
  } else if (n.form === "minus-three") {
    return { form: "yes" }
  } else if (n.form === "minus-two") {
    return { form: "no" }
  } else if (n.form === "minus-one") {
    return { form: "yes" }
  } else if (n.form === "even") {
    return { form: "no" }
  } else if (n.form === "plus-one") {
    return { form: "yes" }
  } else if (n.form === "plus-two") {
    return { form: "no" }
  } else if (n.form === "plus-three") {
    return { form: "yes" }
  } else {
    return { form: "no" }
  }
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

export function everySlotHasNormTwo(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function theInnerProductIsSymmetric(v: Tetrad, w: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function negatingASlotNegatesTheInnerProduct(v: Tetrad, w: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function theOppositeOfASlotIsASlot(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function aSlotAndItsOppositeMeetAtMinusTwo(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function noSlotIsItsOwnOpposite(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function slotsOfDifferentFramesMeetAtPlusOrMinusOne(v: Tetrad, w: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    if (isSlot(w) == { form: "yes" }) {
      // hold: verified at compile time
    }
  }
  return v
}

export function aLineLiesInOneFrame(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectA(v: Tetrad): Tetrad {
  return tetradOf(tetradSecond(v), tetradFirst(v), tetradThird(v), tetradFourth(v))
}

export function slotReflectB(v: Tetrad): Tetrad {
  return tetradOf(tetradFirst(v), tetradThird(v), tetradSecond(v), tetradFourth(v))
}

export function slotReflectC(v: Tetrad): Tetrad {
  return tetradOf(tetradFirst(v), tetradSecond(v), tetradFourth(v), tetradThird(v))
}

export function slotReflectD(v: Tetrad): Tetrad {
  return tetradOf(tetradFirst(v), tetradSecond(v), toneConjugate(tetradFourth(v)), toneConjugate(tetradThird(v)))
}

export function slotReflectAIsAnInvolution(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectAKeepsTheInnerProduct(v: Tetrad, w: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectAKeepsTheSlots(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectBIsAnInvolution(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectBKeepsTheInnerProduct(v: Tetrad, w: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectBKeepsTheSlots(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectCIsAnInvolution(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectCKeepsTheInnerProduct(v: Tetrad, w: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectCKeepsTheSlots(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectDIsAnInvolution(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectDKeepsTheInnerProduct(v: Tetrad, w: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function slotReflectDKeepsTheSlots(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function aAndBMakeAThirdTurn(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function bAndCMakeAThirdTurn(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function bAndDMakeAThirdTurn(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function aAndCCommute(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function aAndDCommute(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function cAndDCommute(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function swapCalmFear(t: Tone): Tone {
  if (t.form === "fear") {
    return { form: "calm" }
  } else if (t.form === "calm") {
    return { form: "fear" }
  } else {
    return { form: "love" }
  }
}

export function reflectionASwapsTheSecondAndThirdFrames(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function reflectionBSwapsTheFirstAndThirdFrames(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function reflectE4(v: Tetrad): Tetrad {
  return tetradOf(tetradFirst(v), tetradSecond(v), tetradThird(v), toneConjugate(tetradFourth(v)))
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

export function halfSumOfFour(a: Tone, b: Tone, c: Tone, d: Tone): Tone {
  return halve(balanceShift(totalOfThree(a, b, c), d))
}

export function reflectH(v: Tetrad): Tetrad {
  return shiftByH(v, halfSumOfFour(tetradFirst(v), toneConjugate(tetradSecond(v)), toneConjugate(tetradThird(v)), toneConjugate(tetradFourth(v))))
}

export function shiftByH(v: Tetrad, k: Tone): Tetrad {
  return tetradOf(toneDifference(tetradFirst(v), k), toneSum(tetradSecond(v), k), toneSum(tetradThird(v), k), toneSum(tetradFourth(v), k))
}

export function e4ReflectionIsAnInvolution(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function hReflectionIsAnInvolutionOnTheSlots(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function hReflectionKeepsTheSlots(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function hReflectionKeepsTheInnerProduct(v: Tetrad, w: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    if (isSlot(w) == { form: "yes" }) {
      // hold: verified at compile time
    }
  }
  return v
}

export function e4ReflectionKeepsTheInnerProduct(v: Tetrad, w: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function cAndE4MakeAQuarterTurn(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function e4AndHMakeAThirdTurnOnTheSlots(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function bAndE4Commute(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function bAndHCommuteOnTheSlots(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function cAndHCommuteOnTheSlots(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function triality(v: Tetrad): Tetrad {
  return tetradOf(halfSumOfFour(tetradFirst(v), tetradSecond(v), tetradThird(v), tetradFourth(v)), halfSumOfFour(tetradFirst(v), tetradSecond(v), toneConjugate(tetradThird(v)), toneConjugate(tetradFourth(v))), halfSumOfFour(tetradFirst(v), toneConjugate(tetradSecond(v)), tetradThird(v), toneConjugate(tetradFourth(v))), halfSumOfFour(toneConjugate(tetradFirst(v)), tetradSecond(v), tetradThird(v), toneConjugate(tetradFourth(v))))
}

export function trialityKeepsTheSlots(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function trialityKeepsTheInnerProduct(v: Tetrad, w: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    if (isSlot(w) == { form: "yes" }) {
      // hold: verified at compile time
    }
  }
  return v
}

export function trialityHasOrderThree(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
}

export function trialityCarriesAToC(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function trialityCarriesCToD(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function trialityCarriesDToA(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function trialityFixesB(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function trialityKeepsEveryFrame(v: Tetrad): Tetrad {
  if (isSlot(v) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return v
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

export function everyUnitIsASlot(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function distinctUnitsAreDistinctSlots(g: HurwitzElement, h: HurwitzElement): HurwitzElement {
  if (sameTetrad(unitSlot(g), unitSlot(h)) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return g
}

export function theTurnOfAUnitIsTheFrameOfItsSlot(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function minusAUnitIsTheOppositeSlot(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function pointReal(p: QuaternionPoint): Half {
  if (p.form === "coordinates") {
    const r = p.r
    return r
  }
}

export function theInnerProductOfTwoSlotsIsTwiceTheRealPartOfTheirQuotient(g: HurwitzElement, h: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function chooseQ8(test: Flag, chosen: Q8, otherwise: Q8): Q8 {
  if (test.form === "yes") {
    return chosen
  } else {
    return otherwise
  }
}

export function coreFits(sign: Sign, axis: HurwitzAxis, t: Tone, r: Tetrad): Flag {
  return sameTetrad(unitSlot(hurwitzOf(q8Of(sign, axis), t)), r)
}

export function coreOfSlot(t: Tone, r: Tetrad): Q8 {
  return chooseQ8(sameTetrad(unitSlot({ form: "unit-of", core: { form: "signed", sign: { form: "positive" }, axis: { form: "real-axis" } }, turn: t }), r), { form: "signed", sign: { form: "positive" }, axis: { form: "real-axis" } }, chooseQ8(sameTetrad(unitSlot({ form: "unit-of", core: { form: "signed", sign: { form: "negative" }, axis: { form: "real-axis" } }, turn: t }), r), { form: "signed", sign: { form: "negative" }, axis: { form: "real-axis" } }, chooseQ8(sameTetrad(unitSlot({ form: "unit-of", core: { form: "signed", sign: { form: "positive" }, axis: { form: "i-axis" } }, turn: t }), r), { form: "signed", sign: { form: "positive" }, axis: { form: "i-axis" } }, chooseQ8(sameTetrad(unitSlot({ form: "unit-of", core: { form: "signed", sign: { form: "negative" }, axis: { form: "i-axis" } }, turn: t }), r), { form: "signed", sign: { form: "negative" }, axis: { form: "i-axis" } }, chooseQ8(sameTetrad(unitSlot({ form: "unit-of", core: { form: "signed", sign: { form: "positive" }, axis: { form: "j-axis" } }, turn: t }), r), { form: "signed", sign: { form: "positive" }, axis: { form: "j-axis" } }, chooseQ8(sameTetrad(unitSlot({ form: "unit-of", core: { form: "signed", sign: { form: "negative" }, axis: { form: "j-axis" } }, turn: t }), r), { form: "signed", sign: { form: "negative" }, axis: { form: "j-axis" } }, chooseQ8(sameTetrad(unitSlot({ form: "unit-of", core: { form: "signed", sign: { form: "positive" }, axis: { form: "k-axis" } }, turn: t }), r), { form: "signed", sign: { form: "positive" }, axis: { form: "k-axis" } }, { form: "signed", sign: { form: "negative" }, axis: { form: "k-axis" } })))))))
}

export function slotUnit(r: Tetrad): HurwitzElement {
  return hurwitzOf(coreOfSlot(frameOf(r), r), frameOf(r))
}

export function everySlotIsAUnit(r: Tetrad): Tetrad {
  // hold: verified at compile time
  return r
}
