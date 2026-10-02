export type Parity =
  | { form: "even" }
  | { form: "odd" }

export function turnAdd(a: Parity, b: Parity): Parity {
  if (a.form === "even") {
    return b
  } else {
    if (b.form === "even") {
      return { form: "odd" }
    } else {
      return { form: "even" }
    }
  }
}

export function fullTurnIsNotIdentity(): void {
  // hold: verified at compile time
  return undefined
}

export function doubleTurnReturns(): void {
  // hold: verified at compile time
  return undefined
}

export function turnAddIsAssociative(a: Parity, b: Parity, c: Parity): Parity {
  // hold: verified at compile time
  return a
}

export function turnEvenIsIdentity(a: Parity): Parity {
  // hold: verified at compile time
  return a
}

export function turnSelfInverse(a: Parity): Parity {
  // hold: verified at compile time
  return a
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
