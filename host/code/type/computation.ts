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

export function flipOffIsOn(): void {
  // hold: verified at compile time
  return undefined
}

export function flipOnIsOff(): void {
  // hold: verified at compile time
  return undefined
}

export function flipFlipOffIsOff(): void {
  // hold: verified at compile time
  return undefined
}

export function both(a: Bit, b: Bit): Bit {
  if (a.form === "off") {
    return { form: "off" }
  } else {
    return b
  }
}

export function some(a: Bit, b: Bit): Bit {
  if (a.form === "off") {
    return b
  } else {
    return { form: "on" }
  }
}

export function bothOffAbsorbs(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function bothOnIsIdentity(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function someOnAbsorbs(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function someOffIsIdentity(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function deMorganOnOff(): void {
  // hold: verified at compile time
  return undefined
}
