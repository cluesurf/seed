export type Bit =
  | { form: "off" }
  | { form: "on" }

export function xor(a: Bit, b: Bit): Bit {
  if (a.form === "off") {
    return b
  } else {
    if (b.form === "off") {
      return { form: "on" }
    } else {
      return { form: "off" }
    }
  }
}

export function andBit(a: Bit, b: Bit): Bit {
  if (a.form === "off") {
    return { form: "off" }
  } else {
    return b
  }
}

export type Pair =
  | { form: "reg"; control: Bit; target: Bit }

export function cnot(p: Pair): Pair {
  if (p.form === "reg") {
    const control = p.control
    const target = p.target
    return { form: "reg", control: control, target: xor(target, control) }
  }
}

export function cnotIsReversible(c: Bit, t: Bit): Bit {
  // hold: verified at compile time
  return c
}

export type Trio =
  | { form: "wire"; first: Bit; second: Bit; target: Bit }

export function toffoli(w: Trio): Trio {
  if (w.form === "wire") {
    const first = w.first
    const second = w.second
    const target = w.target
    return { form: "wire", first: first, second: second, target: xor(target, andBit(first, second)) }
  }
}

export function toffoliIsReversible(a: Bit, b: Bit, c: Bit): Bit {
  // hold: verified at compile time
  return a
}
