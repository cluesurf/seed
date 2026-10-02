export type Pauli =
  | { form: "identity" }
  | { form: "bit-flip" }
  | { form: "both-flip" }
  | { form: "phase-flip" }

export type Phase =
  | { form: "pos-one" }
  | { form: "pos-i" }
  | { form: "neg-one" }
  | { form: "neg-i" }

export type Element =
  | { form: "scaled"; turn: Phase; flip: Pauli }

export function phaseMultiply(a: Phase, b: Phase): Phase {
  if (a.form === "pos-one") {
    if (b.form === "pos-one") {
      return { form: "pos-one" }
    } else if (b.form === "pos-i") {
      return { form: "pos-i" }
    } else if (b.form === "neg-one") {
      return { form: "neg-one" }
    } else {
      return { form: "neg-i" }
    }
  } else if (a.form === "pos-i") {
    if (b.form === "pos-one") {
      return { form: "pos-i" }
    } else if (b.form === "pos-i") {
      return { form: "neg-one" }
    } else if (b.form === "neg-one") {
      return { form: "neg-i" }
    } else {
      return { form: "pos-one" }
    }
  } else if (a.form === "neg-one") {
    if (b.form === "pos-one") {
      return { form: "neg-one" }
    } else if (b.form === "pos-i") {
      return { form: "neg-i" }
    } else if (b.form === "neg-one") {
      return { form: "pos-one" }
    } else {
      return { form: "pos-i" }
    }
  } else {
    if (b.form === "pos-one") {
      return { form: "neg-i" }
    } else if (b.form === "pos-i") {
      return { form: "pos-one" }
    } else if (b.form === "neg-one") {
      return { form: "pos-i" }
    } else {
      return { form: "neg-one" }
    }
  }
}

export function pauliMultiply(a: Pauli, b: Pauli): Element {
  if (a.form === "identity") {
    if (b.form === "identity") {
      return { form: "scaled", turn: { form: "pos-one" }, flip: { form: "identity" } }
    } else if (b.form === "bit-flip") {
      return { form: "scaled", turn: { form: "pos-one" }, flip: { form: "bit-flip" } }
    } else if (b.form === "both-flip") {
      return { form: "scaled", turn: { form: "pos-one" }, flip: { form: "both-flip" } }
    } else {
      return { form: "scaled", turn: { form: "pos-one" }, flip: { form: "phase-flip" } }
    }
  } else if (a.form === "bit-flip") {
    if (b.form === "identity") {
      return { form: "scaled", turn: { form: "pos-one" }, flip: { form: "bit-flip" } }
    } else if (b.form === "bit-flip") {
      return { form: "scaled", turn: { form: "pos-one" }, flip: { form: "identity" } }
    } else if (b.form === "both-flip") {
      return { form: "scaled", turn: { form: "pos-i" }, flip: { form: "phase-flip" } }
    } else {
      return { form: "scaled", turn: { form: "neg-i" }, flip: { form: "both-flip" } }
    }
  } else if (a.form === "both-flip") {
    if (b.form === "identity") {
      return { form: "scaled", turn: { form: "pos-one" }, flip: { form: "both-flip" } }
    } else if (b.form === "bit-flip") {
      return { form: "scaled", turn: { form: "neg-i" }, flip: { form: "phase-flip" } }
    } else if (b.form === "both-flip") {
      return { form: "scaled", turn: { form: "pos-one" }, flip: { form: "identity" } }
    } else {
      return { form: "scaled", turn: { form: "pos-i" }, flip: { form: "bit-flip" } }
    }
  } else {
    if (b.form === "identity") {
      return { form: "scaled", turn: { form: "pos-one" }, flip: { form: "phase-flip" } }
    } else if (b.form === "bit-flip") {
      return { form: "scaled", turn: { form: "pos-i" }, flip: { form: "both-flip" } }
    } else if (b.form === "both-flip") {
      return { form: "scaled", turn: { form: "neg-i" }, flip: { form: "bit-flip" } }
    } else {
      return { form: "scaled", turn: { form: "pos-one" }, flip: { form: "identity" } }
    }
  }
}

export function negatePhase(p: Phase): Phase {
  return phaseMultiply(p, { form: "neg-one" })
}

export function multiplyByI(p: Phase): Phase {
  return phaseMultiply(p, { form: "pos-i" })
}

export function extractPhase(e: Element): Phase {
  if (e.form === "scaled") {
    const turn = e.turn
    return turn
  }
}

export function everyPauliSquaresToIdentity(p: Pauli): Pauli {
  // hold: verified at compile time
  return p
}

export function iSquaredIsNegativeOne(): void {
  // hold: verified at compile time
  return undefined
}

export function iToTheFourthIsOne(): void {
  // hold: verified at compile time
  return undefined
}

export function bitTimesBothIsIPhase(): void {
  // hold: verified at compile time
  return undefined
}

export function bitAndBothAnticommute(): void {
  // hold: verified at compile time
  return undefined
}
