export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Length =
  | { form: "long" }
  | { form: "short" }

export type Clock =
  | { form: "c0" }
  | { form: "c1" }
  | { form: "c2" }
  | { form: "c3" }
  | { form: "c4" }
  | { form: "c5" }

export type G2Root =
  | { form: "at"; length: Length; spin: Clock }

export function halfTurn(s: Clock): Clock {
  if (s.form === "c0") {
    return { form: "c3" }
  } else if (s.form === "c1") {
    return { form: "c4" }
  } else if (s.form === "c2") {
    return { form: "c5" }
  } else if (s.form === "c3") {
    return { form: "c0" }
  } else if (s.form === "c4") {
    return { form: "c1" }
  } else {
    return { form: "c2" }
  }
}

export function negate(r: G2Root): G2Root {
  if (r.form === "at") {
    const length = r.length
    const spin = r.spin
    return { form: "at", length: length, spin: halfTurn(spin) }
  }
}

export function isLong(r: G2Root): Flag {
  if (r.form === "at") {
    const length = r.length
    if (length.form === "long") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  }
}

export function halfTurnIsAnInvolution(s: Clock): Clock {
  // hold: verified at compile time
  return s
}

export function negateIsAnInvolution(lengthOf: Length, spinOf: Clock): Length {
  // hold: verified at compile time
  return lengthOf
}

export function negatePreservesLength(lengthOf: Length, spinOf: Clock): Length {
  // hold: verified at compile time
  return lengthOf
}

export function aLongRootIsLong(): void {
  // hold: verified at compile time
  return undefined
}

export function aShortRootIsShort(): void {
  // hold: verified at compile time
  return undefined
}
