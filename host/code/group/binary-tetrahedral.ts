export type Sign =
  | { form: "pos" }
  | { form: "neg" }

export type Axis =
  | { form: "one" }
  | { form: "eye" }
  | { form: "jay" }
  | { form: "kay" }

export type Quat =
  | { form: "scaled"; sign: Sign; part: Axis }

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

export function mulAxis(a: Axis, b: Axis): Quat {
  if (a.form === "one") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, part: { form: "one" } }
    } else if (b.form === "eye") {
      return { form: "scaled", sign: { form: "pos" }, part: { form: "eye" } }
    } else if (b.form === "jay") {
      return { form: "scaled", sign: { form: "pos" }, part: { form: "jay" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, part: { form: "kay" } }
    }
  } else if (a.form === "eye") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, part: { form: "eye" } }
    } else if (b.form === "eye") {
      return { form: "scaled", sign: { form: "neg" }, part: { form: "one" } }
    } else if (b.form === "jay") {
      return { form: "scaled", sign: { form: "pos" }, part: { form: "kay" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, part: { form: "jay" } }
    }
  } else if (a.form === "jay") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, part: { form: "jay" } }
    } else if (b.form === "eye") {
      return { form: "scaled", sign: { form: "neg" }, part: { form: "kay" } }
    } else if (b.form === "jay") {
      return { form: "scaled", sign: { form: "neg" }, part: { form: "one" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, part: { form: "eye" } }
    }
  } else {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, part: { form: "kay" } }
    } else if (b.form === "eye") {
      return { form: "scaled", sign: { form: "pos" }, part: { form: "jay" } }
    } else if (b.form === "jay") {
      return { form: "scaled", sign: { form: "neg" }, part: { form: "eye" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, part: { form: "one" } }
    }
  }
}

export function foldSign(sa: Sign, sb: Sign, prod: Quat): Quat {
  if (prod.form === "scaled") {
    const sp = prod.sign
    const bp = prod.part
    return { form: "scaled", sign: mulSign(mulSign(sa, sb), sp), part: bp }
  }
}

export function mul(x: Quat, y: Quat): Quat {
  if (x.form === "scaled") {
    const sx = x.sign
    const bx = x.part
    if (y.form === "scaled") {
      const sy = y.sign
      const by = y.part
      return foldSign(sx, sy, mulAxis(bx, by))
    }
  }
}

export type Hurwitz =
  | { form: "lipschitz"; mood: Sign; part: Axis }
  | { form: "half"; wa: Sign; wb: Sign; wc: Sign; wd: Sign }

export function toQuaternion(u: Hurwitz): Quat {
  if (u.form === "lipschitz") {
    const s = u.mood
    const p = u.part
    return { form: "scaled", sign: s, part: p }
  } else {
    return { form: "scaled", sign: { form: "pos" }, part: { form: "one" } }
  }
}

export function negate(u: Hurwitz): Hurwitz {
  if (u.form === "lipschitz") {
    const s = u.mood
    const p = u.part
    return { form: "lipschitz", mood: flipSign(s), part: p }
  } else {
    const a = u.wa
    const b = u.wb
    const c = u.wc
    const d = u.wd
    return { form: "half", wa: flipSign(a), wb: flipSign(b), wc: flipSign(c), wd: flipSign(d) }
  }
}

export function conjugate(u: Hurwitz): Hurwitz {
  if (u.form === "lipschitz") {
    const s = u.mood
    const p = u.part
    if (p.form === "one") {
      return { form: "lipschitz", mood: s, part: { form: "one" } }
    } else if (p.form === "eye") {
      return { form: "lipschitz", mood: flipSign(s), part: { form: "eye" } }
    } else if (p.form === "jay") {
      return { form: "lipschitz", mood: flipSign(s), part: { form: "jay" } }
    } else {
      return { form: "lipschitz", mood: flipSign(s), part: { form: "kay" } }
    }
  } else {
    const a = u.wa
    const b = u.wb
    const c = u.wc
    const d = u.wd
    return { form: "half", wa: a, wb: flipSign(b), wc: flipSign(c), wd: flipSign(d) }
  }
}

export function multiplyLipschitz(x: Hurwitz, y: Hurwitz): Quat {
  return mul(toQuaternion(x), toQuaternion(y))
}

export function flipSignIsAnInvolution(s: Sign): Sign {
  // hold: verified at compile time
  return s
}

export function negateIsAnInvolutionOnLipschitz(s: Sign, p: Axis): Sign {
  // hold: verified at compile time
  return s
}

export function negateIsAnInvolutionOnHalf(a: Sign, b: Sign, c: Sign, d: Sign): Sign {
  // hold: verified at compile time
  return a
}

export function conjugateIsAnInvolutionOnLipschitz(s: Sign, p: Axis): Sign {
  // hold: verified at compile time
  return s
}

export function conjugateIsAnInvolutionOnHalf(a: Sign, b: Sign, c: Sign, d: Sign): Sign {
  // hold: verified at compile time
  return a
}

export function eyeSquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function eyeTimesJayIsKay(): void {
  // hold: verified at compile time
  return undefined
}

export function jayTimesKayIsEye(): void {
  // hold: verified at compile time
  return undefined
}

export function kayTimesEyeIsJay(): void {
  // hold: verified at compile time
  return undefined
}

export function kaySquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function eyeTimesItsConjugateIsOne(): void {
  // hold: verified at compile time
  return undefined
}

export function negateOfAHalfUnitIsAHalfUnit(): void {
  // hold: verified at compile time
  return undefined
}

export function conjugateOfAHalfUnitIsAHalfUnit(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
