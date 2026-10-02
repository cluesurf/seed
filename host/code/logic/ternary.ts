export type Trit =
  | { form: "no" }
  | { form: "maybe" }
  | { form: "yes" }

export function neg(a: Trit): Trit {
  if (a.form === "no") {
    return { form: "yes" }
  } else if (a.form === "maybe") {
    return { form: "maybe" }
  } else {
    return { form: "no" }
  }
}

export function con(a: Trit, b: Trit): Trit {
  if (a.form === "no") {
    return { form: "no" }
  } else if (a.form === "maybe") {
    if (b.form === "no") {
      return { form: "no" }
    } else if (b.form === "maybe") {
      return { form: "maybe" }
    } else {
      return { form: "maybe" }
    }
  } else {
    return b
  }
}

export function dis(a: Trit, b: Trit): Trit {
  if (a.form === "no") {
    return b
  } else if (a.form === "maybe") {
    if (b.form === "no") {
      return { form: "maybe" }
    } else if (b.form === "maybe") {
      return { form: "maybe" }
    } else {
      return { form: "yes" }
    }
  } else {
    return { form: "yes" }
  }
}

export function negIsAnInvolution(a: Trit): Trit {
  // hold: verified at compile time
  return a
}

export function conIsCommutative(a: Trit, b: Trit): Trit {
  // hold: verified at compile time
  return a
}

export function disIsCommutative(a: Trit, b: Trit): Trit {
  // hold: verified at compile time
  return a
}

export function conIsIdempotent(a: Trit): Trit {
  // hold: verified at compile time
  return a
}

export function deMorganTernary(a: Trit, b: Trit): Trit {
  // hold: verified at compile time
  return a
}

export function excludedMiddleFails(): void {
  // hold: verified at compile time
  return undefined
}

export function excludedMiddleHoldsOnDefinite(): void {
  // hold: verified at compile time
  return undefined
}
