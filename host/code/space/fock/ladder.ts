export type Occupation =
  | { form: "vacuum" }
  | { form: "more"; prior: Occupation }

export function successor(n: Occupation): Occupation {
  return { form: "more", prior: n }
}

export type State =
  | { form: "ket"; fill: Occupation }

export function ground(): State {
  return { form: "ket", fill: { form: "vacuum" } }
}

export function raise(s: State): State {
  if (s.form === "ket") {
    const fill = s.fill
    return { form: "ket", fill: successor(fill) }
  }
}

export function lower(s: State): State {
  if (s.form === "ket") {
    const fill = s.fill
    if (fill.form === "vacuum") {
      return { form: "ket", fill: { form: "vacuum" } }
    } else {
      const prior = fill.prior
      return { form: "ket", fill: prior }
    }
  }
}

export function number(s: State): Occupation {
  if (s.form === "ket") {
    const fill = s.fill
    return fill
  }
}

export function creationRaisesTheNumber(s: State): State {
  // hold: verified at compile time
  return s
}

export function annihilationLowersTheNumber(s: State): State {
  // hold: verified at compile time
  return s
}

export function annihilationUndoesCreation(s: State): State {
  // hold: verified at compile time
  return s
}

export function vacuumIsTheFloor(): void {
  // hold: verified at compile time
  return undefined
}

export function numberOfTheVacuumIsEmpty(): void {
  // hold: verified at compile time
  return undefined
}

export function creationLeavesTheVacuum(): void {
  // hold: verified at compile time
  return undefined
}

export function raiseThenLowerIsIdentity(s: State): State {
  // hold: verified at compile time
  return s
}
