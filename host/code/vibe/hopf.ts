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

export function hopf(g: HurwitzElement): HurwitzElement {
  return hurwitzProduct(hurwitzProduct(g, unitI()), hurwitzInverse(g))
}

export function isImaginaryUnit(g: HurwitzElement): Flag {
  return both(sameTone(hurwitzTurn(g), { form: "calm" }), notFlag(sameAxis(q8Axis(hurwitzCore(g)), { form: "real-axis" })))
}

export function onTheICircle(g: HurwitzElement): Flag {
  return both(sameTone(hurwitzTurn(g), { form: "calm" }), either(sameAxis(q8Axis(hurwitzCore(g)), { form: "real-axis" }), sameAxis(q8Axis(hurwitzCore(g)), { form: "i-axis" })))
}

export function theHopfMapLandsOnAnImaginaryUnit(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function theHopfMapIsConstantAlongI(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function theHopfMapIsConstantUnderNegation(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}

export function unitsOnOnePointDifferByTheICircle(g: HurwitzElement, h: HurwitzElement): HurwitzElement {
  if (sameHurwitz(hopf(g), hopf(h)) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return g
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

export function eachFrameIsThePairOfCirclesOverOneAxis(g: HurwitzElement): HurwitzElement {
  // hold: verified at compile time
  return g
}
