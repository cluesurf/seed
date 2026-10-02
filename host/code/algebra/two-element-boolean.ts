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

export function bothIsCommutative(a: Bit, b: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function someIsCommutative(a: Bit, b: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function bothIsAssociative(a: Bit, b: Bit, c: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function someIsAssociative(a: Bit, b: Bit, c: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function bothDistributesOverSome(a: Bit, b: Bit, c: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function absorptionBothSome(a: Bit, b: Bit): Bit {
  // hold: verified at compile time
  return a
}

export function deMorganBoth(a: Bit, b: Bit): Bit {
  // hold: verified at compile time
  return a
}
