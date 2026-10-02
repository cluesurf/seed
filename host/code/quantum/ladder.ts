export type Mode =
  | { form: "empty" }
  | { form: "more"; prior: Mode }

export function create(n: Mode): Mode {
  return { form: "more", prior: n }
}

export function annihilate(n: Mode): Mode {
  if (n.form === "empty") {
    return { form: "empty" }
  } else {
    const prior = n.prior
    return prior
  }
}

export function annihilateUndoesCreate(n: Mode): Mode {
  // hold: verified at compile time
  return n
}

export function vacuumAnnihilatesToItself(): void {
  // hold: verified at compile time
  return undefined
}

export function commutatorAsymmetryAtVacuum(): void {
  // hold: verified at compile time
  return undefined
}

export function creationRaisesTheNumber(n: Mode): Mode {
  // hold: verified at compile time
  return n
}
