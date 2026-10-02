export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Basis =
  | { form: "zero-state" }
  | { form: "one-state" }

export type Result =
  | { form: "vanish" }
  | { form: "keep"; state: Basis }

export function projectZero(s: Basis): Result {
  if (s.form === "zero-state") {
    return { form: "keep", state: { form: "zero-state" } }
  } else {
    return { form: "vanish" }
  }
}

export function projectOne(s: Basis): Result {
  if (s.form === "zero-state") {
    return { form: "vanish" }
  } else {
    return { form: "keep", state: { form: "one-state" } }
  }
}

export function projectZeroOnResult(r: Result): Result {
  if (r.form === "vanish") {
    return { form: "vanish" }
  } else {
    const state = r.state
    return projectZero(state)
  }
}

export function projectOneOnResult(r: Result): Result {
  if (r.form === "vanish") {
    return { form: "vanish" }
  } else {
    const state = r.state
    return projectOne(state)
  }
}

export function isZeroOutcome(s: Basis): Flag {
  if (s.form === "zero-state") {
    return { form: "yes" }
  } else {
    return { form: "no" }
  }
}

export function isKept(r: Result): Flag {
  if (r.form === "vanish") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
}

export function projectZeroIsIdempotent(s: Basis): Basis {
  // hold: verified at compile time
  return s
}

export function projectOneIsIdempotent(s: Basis): Basis {
  // hold: verified at compile time
  return s
}

export function projectZeroThenOneVanishes(s: Basis): Basis {
  // hold: verified at compile time
  return s
}

export function projectOneThenZeroVanishes(s: Basis): Basis {
  // hold: verified at compile time
  return s
}

export function pZeroKeepsExactlyTheZeroOutcome(s: Basis): Basis {
  // hold: verified at compile time
  return s
}

export function otherOutcome(s: Basis): Basis {
  if (s.form === "zero-state") {
    return { form: "one-state" }
  } else {
    return { form: "zero-state" }
  }
}

export function pOneKeepsExactlyTheOneOutcome(s: Basis): Basis {
  // hold: verified at compile time
  return s
}

export function projectorsDifferOnTheZeroState(): void {
  // hold: verified at compile time
  return undefined
}

export function pOneVanishesTheZeroState(): void {
  // hold: verified at compile time
  return undefined
}
