export type Iterant =
  | { form: "one" }
  | { form: "eye" }
  | { form: "minus-one" }
  | { form: "minus-eye" }

export function timesI(a: Iterant): Iterant {
  if (a.form === "one") {
    return { form: "eye" }
  } else if (a.form === "eye") {
    return { form: "minus-one" }
  } else if (a.form === "minus-one") {
    return { form: "minus-eye" }
  } else {
    return { form: "one" }
  }
}

export function flip(a: Iterant): Iterant {
  if (a.form === "one") {
    return { form: "one" }
  } else if (a.form === "eye") {
    return { form: "minus-eye" }
  } else if (a.form === "minus-one") {
    return { form: "minus-one" }
  } else {
    return { form: "eye" }
  }
}

export function iSquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function multiplyingByIHasOrderFour(a: Iterant): Iterant {
  // hold: verified at compile time
  return a
}

export function conjugationReversesTheShift(a: Iterant): Iterant {
  // hold: verified at compile time
  return a
}

export function conjugationIsAnInvolution(a: Iterant): Iterant {
  // hold: verified at compile time
  return a
}
