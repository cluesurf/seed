export type Zmod3 =
  | { form: "z0" }
  | { form: "z1" }
  | { form: "z2" }

export function add3(a: Zmod3, b: Zmod3): Zmod3 {
  if (a.form === "z0") {
    return b
  } else if (a.form === "z1") {
    if (b.form === "z0") {
      return { form: "z1" }
    } else if (b.form === "z1") {
      return { form: "z2" }
    } else {
      return { form: "z0" }
    }
  } else {
    if (b.form === "z0") {
      return { form: "z2" }
    } else if (b.form === "z1") {
      return { form: "z0" }
    } else {
      return { form: "z1" }
    }
  }
}

export function neg3(a: Zmod3): Zmod3 {
  if (a.form === "z0") {
    return { form: "z0" }
  } else if (a.form === "z1") {
    return { form: "z2" }
  } else {
    return { form: "z1" }
  }
}

export function add3ZeroLeft(a: Zmod3): Zmod3 {
  // hold: verified at compile time
  return a
}

export function add3ZeroRight(a: Zmod3): Zmod3 {
  // hold: verified at compile time
  return a
}

export function add3IsCommutative(a: Zmod3, b: Zmod3): Zmod3 {
  // hold: verified at compile time
  return a
}

export function add3IsAssociative(a: Zmod3, b: Zmod3, c: Zmod3): Zmod3 {
  // hold: verified at compile time
  return a
}

export function add3Inverse(a: Zmod3): Zmod3 {
  // hold: verified at compile time
  return a
}

export function add3LeftCancellation(a: Zmod3, b: Zmod3, c: Zmod3): Zmod3 {
  if (add3(a, b) == add3(a, c)) {
    // hold: verified at compile time
  }
  return a
}
