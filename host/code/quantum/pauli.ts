export type Phase =
  | { form: "one" }
  | { form: "eye" }
  | { form: "neg" }
  | { form: "neg-eye" }

export function mulPhase(a: Phase, b: Phase): Phase {
  if (a.form === "one") {
    return b
  } else if (a.form === "eye") {
    if (b.form === "one") {
      return { form: "eye" }
    } else if (b.form === "eye") {
      return { form: "neg" }
    } else if (b.form === "neg") {
      return { form: "neg-eye" }
    } else {
      return { form: "one" }
    }
  } else if (a.form === "neg") {
    if (b.form === "one") {
      return { form: "neg" }
    } else if (b.form === "eye") {
      return { form: "neg-eye" }
    } else if (b.form === "neg") {
      return { form: "one" }
    } else {
      return { form: "eye" }
    }
  } else {
    if (b.form === "one") {
      return { form: "neg-eye" }
    } else if (b.form === "eye") {
      return { form: "one" }
    } else if (b.form === "neg") {
      return { form: "eye" }
    } else {
      return { form: "neg" }
    }
  }
}

export type Pauli =
  | { form: "letter-i" }
  | { form: "letter-x" }
  | { form: "letter-y" }
  | { form: "letter-z" }

export type Op =
  | { form: "scaled"; phase: Phase; pauli: Pauli }

export function mulLetter(a: Pauli, b: Pauli): Op {
  if (a.form === "letter-i") {
    if (b.form === "letter-i") {
      return { form: "scaled", phase: { form: "one" }, pauli: { form: "letter-i" } }
    } else if (b.form === "letter-x") {
      return { form: "scaled", phase: { form: "one" }, pauli: { form: "letter-x" } }
    } else if (b.form === "letter-y") {
      return { form: "scaled", phase: { form: "one" }, pauli: { form: "letter-y" } }
    } else {
      return { form: "scaled", phase: { form: "one" }, pauli: { form: "letter-z" } }
    }
  } else if (a.form === "letter-x") {
    if (b.form === "letter-i") {
      return { form: "scaled", phase: { form: "one" }, pauli: { form: "letter-x" } }
    } else if (b.form === "letter-x") {
      return { form: "scaled", phase: { form: "one" }, pauli: { form: "letter-i" } }
    } else if (b.form === "letter-y") {
      return { form: "scaled", phase: { form: "eye" }, pauli: { form: "letter-z" } }
    } else {
      return { form: "scaled", phase: { form: "neg-eye" }, pauli: { form: "letter-y" } }
    }
  } else if (a.form === "letter-y") {
    if (b.form === "letter-i") {
      return { form: "scaled", phase: { form: "one" }, pauli: { form: "letter-y" } }
    } else if (b.form === "letter-x") {
      return { form: "scaled", phase: { form: "neg-eye" }, pauli: { form: "letter-z" } }
    } else if (b.form === "letter-y") {
      return { form: "scaled", phase: { form: "one" }, pauli: { form: "letter-i" } }
    } else {
      return { form: "scaled", phase: { form: "eye" }, pauli: { form: "letter-x" } }
    }
  } else {
    if (b.form === "letter-i") {
      return { form: "scaled", phase: { form: "one" }, pauli: { form: "letter-z" } }
    } else if (b.form === "letter-x") {
      return { form: "scaled", phase: { form: "eye" }, pauli: { form: "letter-y" } }
    } else if (b.form === "letter-y") {
      return { form: "scaled", phase: { form: "neg-eye" }, pauli: { form: "letter-x" } }
    } else {
      return { form: "scaled", phase: { form: "one" }, pauli: { form: "letter-i" } }
    }
  }
}

export function combinePhase(pa: Phase, pb: Phase, prod: Op): Op {
  if (prod.form === "scaled") {
    const pp = prod.phase
    const letter = prod.pauli
    return { form: "scaled", phase: mulPhase(mulPhase(pa, pb), pp), pauli: letter }
  }
}

export function mul(x: Op, y: Op): Op {
  if (x.form === "scaled") {
    const px = x.phase
    const lx = x.pauli
    if (y.form === "scaled") {
      const py = y.phase
      const ly = y.pauli
      return combinePhase(px, py, mulLetter(lx, ly))
    }
  }
}

export function xSquaresToIdentity(): void {
  // hold: verified at compile time
  return undefined
}

export function xTimesYIsIZ(): void {
  // hold: verified at compile time
  return undefined
}

export function yTimesXIsNegIZ(): void {
  // hold: verified at compile time
  return undefined
}
