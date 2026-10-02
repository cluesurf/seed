export type Bit =
  | { form: "off" }
  | { form: "on" }

export function flip(b: Bit): Bit {
  if (b.form === "off") {
    return { form: "on" }
  } else {
    return { form: "off" }
  }
}

export type Opt =
  | { form: "none" }
  | { form: "some"; value: Bit }

export function ret(x: Bit): Opt {
  return { form: "some", value: x }
}

export function bind(m: Opt, f: (a0: Bit) => Opt): Opt {
  if (m.form === "none") {
    return { form: "none" }
  } else {
    const value = m.value
    return f(value)
  }
}

export function chainReturn(m: Opt): Opt {
  if (m.form === "none") {
    return { form: "none" }
  } else {
    const value = m.value
    return ret(value)
  }
}

export function monadRightIdentity(m: Opt): Opt {
  // hold: verified at compile time
  return m
}

export function flipOpt(x: Bit): Opt {
  return { form: "some", value: flip(x) }
}

export function chainFlip(m: Opt): Opt {
  if (m.form === "none") {
    return { form: "none" }
  } else {
    const value = m.value
    return flipOpt(value)
  }
}

export function monadLeftIdentityInstance(a: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function noneShortCircuits(): void {
  // hold: verified at compile time
  return undefined
}
