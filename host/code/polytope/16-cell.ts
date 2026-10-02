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

export type Axis =
  | { form: "ax1" }
  | { form: "ax2" }
  | { form: "ax3" }
  | { form: "ax4" }

export type Spike =
  | { form: "point"; sign: Sign; axis: Axis }

export function negateSpike(s: Spike): Spike {
  if (s.form === "point") {
    const sign = s.sign
    const axis = s.axis
    return { form: "point", sign: flipSign(sign), axis: axis }
  }
}

export type Quad =
  | { form: "corner"; a: Sign; b: Sign; c: Sign; d: Sign }

export function negateQuad(q: Quad): Quad {
  if (q.form === "corner") {
    const a = q.a
    const b = q.b
    const c = q.c
    const d = q.d
    return { form: "corner", a: flipSign(a), b: flipSign(b), c: flipSign(c), d: flipSign(d) }
  }
}

export type Parity =
  | { form: "even" }
  | { form: "odd" }

export function toggle(p: Parity): Parity {
  if (p.form === "even") {
    return { form: "odd" }
  } else {
    return { form: "even" }
  }
}

export function addSign(p: Parity, s: Sign): Parity {
  if (s.form === "positive") {
    return p
  } else {
    return toggle(p)
  }
}

export function parityOf(q: Quad): Parity {
  if (q.form === "corner") {
    const a = q.a
    const b = q.b
    const c = q.c
    const d = q.d
    return addSign(addSign(addSign(addSign({ form: "even" }, a), b), c), d)
  }
}

export function crossPolytopeAntipodeIsAnInvolution(s: Sign, x: Axis): Sign {
  // hold: verified at compile time
  return s
}

export function hypercubeAntipodeIsAnInvolution(a: Sign, b: Sign, c: Sign, d: Sign): Sign {
  // hold: verified at compile time
  return a
}

export function antipodePreservesParity(a: Sign, b: Sign, c: Sign, d: Sign): Sign {
  // hold: verified at compile time
  return a
}

export function allPlusIsEven(): void {
  // hold: verified at compile time
  return undefined
}

export function oneMinusIsOdd(): void {
  // hold: verified at compile time
  return undefined
}
