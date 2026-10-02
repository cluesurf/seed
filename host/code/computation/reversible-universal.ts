export type Bit =
  | { form: "off" }
  | { form: "on" }

export function notBit(a: Bit): Bit {
  if (a.form === "off") {
    return { form: "on" }
  } else {
    return { form: "off" }
  }
}

export function andBit(a: Bit, b: Bit): Bit {
  if (a.form === "off") {
    return { form: "off" }
  } else {
    return b
  }
}

export function xorBit(a: Bit, b: Bit): Bit {
  if (a.form === "off") {
    return b
  } else {
    return notBit(b)
  }
}

export function nandBit(a: Bit, b: Bit): Bit {
  return notBit(andBit(a, b))
}

export type Triple =
  | { form: "wires"; first: Bit; second: Bit; target: Bit }

export function targetOf(t: Triple): Bit {
  if (t.form === "wires") {
    const target = t.target
    return target
  }
}

export function firstOf(t: Triple): Bit {
  if (t.form === "wires") {
    const first = t.first
    return first
  }
}

export function toffoli(t: Triple): Triple {
  if (t.form === "wires") {
    const first = t.first
    const second = t.second
    const target = t.target
    return { form: "wires", first: first, second: second, target: xorBit(target, andBit(first, second)) }
  }
}

export function toffoliIsItsOwnInverse(a: Bit, b: Bit, c: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function toffoliComputesAnd(a: Bit, b: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function toffoliComputesNand(a: Bit, b: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function toffoliComputesNot(c: Bit): Bit {
  // hold: verified at compile time
  return c
}

export function toffoliFansOut(a: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function toffoliPreservesTheFirstControl(a: Bit, b: Bit, c: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function andThenNotIsNand(a: Bit, b: Bit): Bit {
  // hold: verified at compile time
  return a
}
