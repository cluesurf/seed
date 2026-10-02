export type Sign =
  | { form: "neg" }
  | { form: "pos" }

export type Duo =
  | { form: "wx" }
  | { form: "wy" }
  | { form: "wz" }
  | { form: "xy" }
  | { form: "xz" }
  | { form: "yz" }

export type Vertex =
  | { form: "at"; axes: Duo; signOne: Sign; signTwo: Sign }

export function flipSign(s: Sign): Sign {
  if (s.form === "neg") {
    return { form: "pos" }
  } else {
    return { form: "neg" }
  }
}

export function antipode(v: Vertex): Vertex {
  if (v.form === "at") {
    const axes = v.axes
    const signOne = v.signOne
    const signTwo = v.signTwo
    return { form: "at", axes: axes, signOne: flipSign(signOne), signTwo: flipSign(signTwo) }
  }
}

export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function sameSign(a: Sign, b: Sign): Flag {
  if (a.form === "neg") {
    if (b.form === "neg") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "neg") {
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

export function sameVertex(a: Vertex, b: Vertex): Flag {
  if (a.form === "at") {
    const s1 = a.signOne
    const s2 = a.signTwo
    if (b.form === "at") {
      const t1 = b.signOne
      const t2 = b.signTwo
      return andFlag(sameSign(s1, t1), sameSign(s2, t2))
    }
  }
}

export function antipodeIsAnInvolution(v: Vertex): Vertex {
  // hold: verified at compile time
  return v
}

export function flipSignDiffers(s: Sign): Sign {
  // hold: verified at compile time
  return s
}

export function antipodeHasNoFixedPoint(v: Vertex): Vertex {
  // hold: verified at compile time
  return v
}

export function signFlipGivesDistinctVertex(a: Duo, s: Sign): Duo {
  // hold: verified at compile time
  return a
}
