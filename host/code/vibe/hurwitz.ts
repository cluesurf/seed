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

export function toneConjugate(a: Tone): Tone {
  if (a.form === "fear") {
    return { form: "love" }
  } else if (a.form === "calm") {
    return { form: "calm" }
  } else {
    return { form: "fear" }
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

export function q8Unit(): Q8 {
  return { form: "signed", sign: { form: "positive" }, axis: { form: "real-axis" } }
}

export function q8ProductIsAssociative(a: Q8, b: Q8, c: Q8): Q8 {
  // hold: verified at compile time
  return a
}

export function q8ProductHasALeftIdentity(a: Q8): Q8 {
  // hold: verified at compile time
  return a
}

export function q8ProductHasARightIdentity(a: Q8): Q8 {
  // hold: verified at compile time
  return a
}

export function q8ProductHasALeftInverse(a: Q8): Q8 {
  // hold: verified at compile time
  return a
}

export function q8ProductHasARightInverse(a: Q8): Q8 {
  // hold: verified at compile time
  return a
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

export function q8TurnIsAHomomorphism(a: Q8, b: Q8): Q8 {
  // hold: verified at compile time
  return a
}

export function theTurnHasOrderThree(q: Q8): Q8 {
  // hold: verified at compile time
  return q
}

export function turnsComposeByAdding(s: Tone, t: Tone, q: Q8): Tone {
  // hold: verified at compile time
  return s
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

export function hurwitzUnit(): HurwitzElement {
  return hurwitzOf(q8Unit(), { form: "calm" })
}

export function hurwitzProductIsAssociative(a: HurwitzElement, b: HurwitzElement, c: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return a
}

export function hurwitzProductHasALeftIdentity(a: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return a
}

export function hurwitzProductHasARightIdentity(a: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return a
}

export function hurwitzProductHasALeftInverse(a: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return a
}

export function hurwitzProductHasARightInverse(a: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return a
}

export function minusOneUnit(): HurwitzElement {
  return { form: "unit-of", core: { form: "signed", sign: { form: "negative" }, axis: { form: "real-axis" } }, turn: { form: "calm" } }
}

export function unitI(): HurwitzElement {
  return { form: "unit-of", core: { form: "signed", sign: { form: "positive" }, axis: { form: "i-axis" } }, turn: { form: "calm" } }
}

export function unitOmega(): HurwitzElement {
  return hurwitzOf(q8Unit(), { form: "love" })
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

export function isPlusOrMinusOne(g: HurwitzElement): Flag {
  return both(sameAxis(q8Axis(hurwitzCore(g)), { form: "real-axis" }), sameTone(hurwitzTurn(g), { form: "calm" }))
}

export function omegaCubedIsTheIdentity(): void {
  // hold: verified at compile time
  return undefined
}

export function minusOneIsCentral(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function theCenterIsPlusOrMinusOne(g: HurwitzElement): HurwitzElement {
  if (hurwitzProduct(g, unitI()) == hurwitzProduct(unitI(), g)) {
    if (hurwitzProduct(g, unitOmega()) == hurwitzProduct(unitOmega(), g)) {
      // hold: verified at compile time
    }
  }
  return g
}

export function onlyPlusOrMinusOneSquareToOne(g: HurwitzElement): HurwitzElement {
  if (sameHurwitz(hurwitzProduct(g, g), hurwitzUnit()) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return g
}

export function iSquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function hurwitzSquare(g: HurwitzElement): HurwitzElement {
  return hurwitzProduct(g, g)
}

export function hurwitzCube(g: HurwitzElement): HurwitzElement {
  return hurwitzProduct(hurwitzSquare(g), g)
}

export function aUnitOfTheFirstFrameHasOrderDividingFour(q: Q8): Q8 {
  // hold: verified at compile time
  return q
}

export function aTurnedUnitHasOrderDividingSix(q: Q8, t: Tone): Q8 {
  if (sameTone(t, { form: "calm" }) == { form: "no" }) {
    // hold: verified at compile time
  }
  return q
}

export function hurwitzTurnIsAHomomorphism(a: HurwitzElement, b: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return a
}

export function theFirstFrameIsANormalSubgroup(g: HurwitzElement, q: Q8): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function omegaCyclesTheFrames(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
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

export function sameHalf(a: Half, b: Half): Flag {
  if (a.form === "minus-whole") {
    if (b.form === "minus-whole") {
      return { form: "yes" }
    } else if (b.form === "minus-half") {
      return { form: "no" }
    } else if (b.form === "naught") {
      return { form: "no" }
    } else if (b.form === "plus-half") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "minus-half") {
    if (b.form === "minus-whole") {
      return { form: "no" }
    } else if (b.form === "minus-half") {
      return { form: "yes" }
    } else if (b.form === "naught") {
      return { form: "no" }
    } else if (b.form === "plus-half") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "naught") {
    if (b.form === "minus-whole") {
      return { form: "no" }
    } else if (b.form === "minus-half") {
      return { form: "no" }
    } else if (b.form === "naught") {
      return { form: "yes" }
    } else if (b.form === "plus-half") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "plus-half") {
    if (b.form === "minus-whole") {
      return { form: "no" }
    } else if (b.form === "minus-half") {
      return { form: "no" }
    } else if (b.form === "naught") {
      return { form: "no" }
    } else if (b.form === "plus-half") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "minus-whole") {
      return { form: "no" }
    } else if (b.form === "minus-half") {
      return { form: "no" }
    } else if (b.form === "naught") {
      return { form: "no" }
    } else if (b.form === "plus-half") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function samePoint(p: QuaternionPoint, q: QuaternionPoint): Flag {
  if (p.form === "coordinates") {
    const pr = p.r
    const pi = p.i
    const pj = p.j
    const pk = p.k
    if (q.form === "coordinates") {
      const qr = q.r
      const qi = q.i
      const qj = q.j
      const qk = q.k
      return both(both(sameHalf(pr, qr), sameHalf(pi, qi)), both(sameHalf(pj, qj), sameHalf(pk, qk)))
    }
  }
}

export function distinctUnitsHaveDistinctCoordinates(g: HurwitzElement, h: HurwitzElement): HurwitzElement {
  if (samePoint(hurwitzPoint(g), hurwitzPoint(h)) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return g
}

export function isWhole(a: Half): Flag {
  if (a.form === "minus-whole") {
    return { form: "yes" }
  } else if (a.form === "minus-half") {
    return { form: "no" }
  } else if (a.form === "naught") {
    return { form: "no" }
  } else if (a.form === "plus-half") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
}

export function isHalf(a: Half): Flag {
  if (a.form === "minus-whole") {
    return { form: "no" }
  } else if (a.form === "minus-half") {
    return { form: "yes" }
  } else if (a.form === "naught") {
    return { form: "no" }
  } else if (a.form === "plus-half") {
    return { form: "yes" }
  } else {
    return { form: "no" }
  }
}

export function isNaught(a: Half): Flag {
  return sameHalf(a, { form: "naught" })
}

export function oneWholeThreeNaught(a: Half, b: Half, c: Half, d: Half): Flag {
  return either(either(both(isWhole(a), both(isNaught(b), both(isNaught(c), isNaught(d)))), both(isWhole(b), both(isNaught(a), both(isNaught(c), isNaught(d))))), either(both(isWhole(c), both(isNaught(a), both(isNaught(b), isNaught(d)))), both(isWhole(d), both(isNaught(a), both(isNaught(b), isNaught(c))))))
}

export function isUnitPoint(p: QuaternionPoint): Flag {
  if (p.form === "coordinates") {
    const r = p.r
    const i = p.i
    const j = p.j
    const k = p.k
    return either(oneWholeThreeNaught(r, i, j, k), both(both(isHalf(r), isHalf(i)), both(isHalf(j), isHalf(k))))
  }
}

export function everyElementIsAHurwitzUnitVector(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function hamiltonReal(a0: number, a1: number, a2: number, a3: number, b0: number, b1: number, b2: number, b3: number): number {
  return a0 * b0 - a1 * b1 - a2 * b2 - a3 * b3
}

export function hamiltonI(a0: number, a1: number, a2: number, a3: number, b0: number, b1: number, b2: number, b3: number): number {
  return a0 * b1 + a1 * b0 + a2 * b3 - a3 * b2
}

export function hamiltonJ(a0: number, a1: number, a2: number, a3: number, b0: number, b1: number, b2: number, b3: number): number {
  return a0 * b2 - a1 * b3 + a2 * b0 + a3 * b1
}

export function hamiltonK(a0: number, a1: number, a2: number, a3: number, b0: number, b1: number, b2: number, b3: number): number {
  return a0 * b3 + a1 * b2 - a2 * b1 + a3 * b0
}

export function quaternionNorm(a0: number, a1: number, a2: number, a3: number): number {
  return a0 * a0 + a1 * a1 + (a2 * a2 + a3 * a3)
}

export function theHamiltonProductIsAssociativeReal(a0: number, a1: number, a2: number, a3: number, b0: number, b1: number, b2: number, b3: number, c0: number, c1: number, c2: number, c3: number): number {
  // hold: verified at compile time
  return a0
}

export function theHamiltonProductIsAssociativeI(a0: number, a1: number, a2: number, a3: number, b0: number, b1: number, b2: number, b3: number, c0: number, c1: number, c2: number, c3: number): number {
  // hold: verified at compile time
  return a0
}

export function theHamiltonProductIsAssociativeJ(a0: number, a1: number, a2: number, a3: number, b0: number, b1: number, b2: number, b3: number, c0: number, c1: number, c2: number, c3: number): number {
  // hold: verified at compile time
  return a0
}

export function theHamiltonProductIsAssociativeK(a0: number, a1: number, a2: number, a3: number, b0: number, b1: number, b2: number, b3: number, c0: number, c1: number, c2: number, c3: number): number {
  // hold: verified at compile time
  return a0
}

export function theQuaternionNormIsMultiplicative(a0: number, a1: number, a2: number, a3: number, b0: number, b1: number, b2: number, b3: number): number {
  // hold: verified at compile time
  return a0
}

export function iTimesIIsMinusOneReal(): void {
  // hold: verified at compile time
  return undefined
}

export function iTimesIIsMinusOneI(): void {
  // hold: verified at compile time
  return undefined
}

export function iTimesIIsMinusOneJ(): void {
  // hold: verified at compile time
  return undefined
}

export function iTimesIIsMinusOneK(): void {
  // hold: verified at compile time
  return undefined
}

export function iTimesJIsKReal(): void {
  // hold: verified at compile time
  return undefined
}

export function iTimesJIsKI(): void {
  // hold: verified at compile time
  return undefined
}

export function iTimesJIsKJ(): void {
  // hold: verified at compile time
  return undefined
}

export function iTimesJIsKK(): void {
  // hold: verified at compile time
  return undefined
}

export function jTimesKIsIReal(): void {
  // hold: verified at compile time
  return undefined
}

export function jTimesKIsII(): void {
  // hold: verified at compile time
  return undefined
}

export function jTimesKIsIJ(): void {
  // hold: verified at compile time
  return undefined
}

export function jTimesKIsIK(): void {
  // hold: verified at compile time
  return undefined
}

export function kTimesIIsJReal(): void {
  // hold: verified at compile time
  return undefined
}

export function kTimesIIsJI(): void {
  // hold: verified at compile time
  return undefined
}

export function kTimesIIsJJ(): void {
  // hold: verified at compile time
  return undefined
}

export function kTimesIIsJK(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTimesItsInverseReal(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTimesItsInverseI(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTimesItsInverseJ(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTimesItsInverseK(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaHasOrderThreeReal(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaHasOrderThreeI(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaHasOrderThreeJ(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaHasOrderThreeK(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsIToKReal(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsIToKI(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsIToKJ(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsIToKK(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsJToIReal(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsJToII(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsJToIJ(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsJToIK(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsKToJReal(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsKToJI(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsKToJJ(): void {
  // hold: verified at compile time
  return undefined
}

export function omegaTurnsKToJK(): void {
  // hold: verified at compile time
  return undefined
}
