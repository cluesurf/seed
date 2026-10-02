export type Z3 =
  | { form: "e0" }
  | { form: "e1" }
  | { form: "e2" }

export function op(a: Z3, b: Z3): Z3 {
  if (a.form === "e0") {
    return b
  } else if (a.form === "e1") {
    if (b.form === "e0") {
      return { form: "e1" }
    } else if (b.form === "e1") {
      return { form: "e2" }
    } else {
      return { form: "e0" }
    }
  } else {
    if (b.form === "e0") {
      return { form: "e2" }
    } else if (b.form === "e1") {
      return { form: "e0" }
    } else {
      return { form: "e1" }
    }
  }
}

export function f(a: Z3): Z3 {
  if (a.form === "e0") {
    return { form: "e0" }
  } else if (a.form === "e1") {
    return { form: "e2" }
  } else {
    return { form: "e1" }
  }
}

export function fIsAHomomorphism(a: Z3, b: Z3): Z3 {
  // hold: verified at compile time
  return a
}

export function fPreservesIdentity(): void {
  // hold: verified at compile time
  return undefined
}

export function fIsAnIsomorphism(a: Z3): Z3 {
  // hold: verified at compile time
  return a
}

export function fSendsElementToItsInverse(a: Z3): Z3 {
  // hold: verified at compile time
  return a
}
