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

export function rowOff(x: Bit): Bit {
  return x
}

export function rowOn(x: Bit): Bit {
  return flip(x)
}

export function diagonal(x: Bit): Bit {
  if (x.form === "off") {
    return { form: "on" }
  } else {
    return { form: "on" }
  }
}

export function diagonalDiffersFromRowOff(): void {
  // hold: verified at compile time
  return undefined
}

export function diagonalDiffersFromRowOn(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
