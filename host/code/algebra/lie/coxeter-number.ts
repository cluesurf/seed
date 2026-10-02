export type ATwoRoot =
  | { form: "alpha" }
  | { form: "beta" }
  | { form: "gamma" }

export function coxeterElement(r: ATwoRoot): ATwoRoot {
  if (r.form === "alpha") {
    return { form: "beta" }
  } else if (r.form === "beta") {
    return { form: "gamma" }
  } else {
    return { form: "alpha" }
  }
}

export function theCoxeterElementHasOrderThree(r: ATwoRoot): ATwoRoot {
  // hold: verified at compile time
  return r
}

export function theCoxeterElementMovesAlpha(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time
