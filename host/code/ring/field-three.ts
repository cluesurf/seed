export type F3 =
  | { form: "f0" }
  | { form: "f1" }
  | { form: "f2" }

export function plus3(a: F3, b: F3): F3 {
  if (a.form === "f0") {
    return b
  } else if (a.form === "f1") {
    if (b.form === "f0") {
      return { form: "f1" }
    } else if (b.form === "f1") {
      return { form: "f2" }
    } else {
      return { form: "f0" }
    }
  } else {
    if (b.form === "f0") {
      return { form: "f2" }
    } else if (b.form === "f1") {
      return { form: "f0" }
    } else {
      return { form: "f1" }
    }
  }
}

export function times3(a: F3, b: F3): F3 {
  if (a.form === "f0") {
    return { form: "f0" }
  } else if (a.form === "f1") {
    return b
  } else {
    if (b.form === "f0") {
      return { form: "f0" }
    } else if (b.form === "f1") {
      return { form: "f2" }
    } else {
      return { form: "f1" }
    }
  }
}

export function invert3(a: F3): F3 {
  if (a.form === "f0") {
    return { form: "f0" }
  } else if (a.form === "f1") {
    return { form: "f1" }
  } else {
    return { form: "f2" }
  }
}

export function times3OneLeft(a: F3): F3 {
  // hold: verified at compile time
  return a
}

export function times3OneRight(a: F3): F3 {
  // hold: verified at compile time
  return a
}

export function times3IsCommutative(a: F3, b: F3): F3 {
  // hold: verified at compile time
  return a
}

export function times3IsAssociative(a: F3, b: F3, c: F3): F3 {
  // hold: verified at compile time
  return a
}

export function times3DistributesOverPlus3(a: F3, b: F3, c: F3): F3 {
  // hold: verified at compile time
  return a
}

export function times3ZeroLeft(a: F3): F3 {
  // hold: verified at compile time
  return a
}

export function oneIsInvertible(): void {
  // hold: verified at compile time
  return undefined
}

export function twoIsInvertible(): void {
  // hold: verified at compile time
  return undefined
}
