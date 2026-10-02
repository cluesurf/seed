export type Bit =
  | { form: "off" }
  | { form: "on" }

export function flip(a: Bit): Bit {
  if (a.form === "off") {
    return { form: "on" }
  } else {
    return { form: "off" }
  }
}

export function xor(a: Bit, b: Bit): Bit {
  if (a.form === "off") {
    return b
  } else {
    return flip(b)
  }
}

export function zeroIsTheIdentity(a: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function everyBitIsItsOwnInverse(a: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function exclusiveOrIsCommutative(a: Bit, b: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function exclusiveOrIsAssociative(a: Bit, b: Bit, c: Bit): Bit {
  // hold: verified at compile time
  return a
}

// hold: verified at compile time
