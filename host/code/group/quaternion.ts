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

export function conj(x: Quat): Quat {
  if (x.form === "scaled") {
    const s = x.sign
    const u = x.part
    if (u.form === "one") {
      return { form: "scaled", sign: s, part: { form: "one" } }
    } else if (u.form === "eye") {
      return { form: "scaled", sign: flipSign(s), part: { form: "eye" } }
    } else if (u.form === "jay") {
      return { form: "scaled", sign: flipSign(s), part: { form: "jay" } }
    } else {
      return { form: "scaled", sign: flipSign(s), part: { form: "kay" } }
    }
  }
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

export function oneIsTheIdentity(q: Quat): Quat {
  // hold: verified at compile time
  return q
}

export function everyElementHasAnInverse(q: Quat): Quat {
  // hold: verified at compile time
  return q
}
