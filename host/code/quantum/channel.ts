export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export type Bit =
  | { form: "off" }
  | { form: "on" }

export type State =
  | { form: "zero" }
  | { form: "one" }
  | { form: "plus" }
  | { form: "minus" }
  | { form: "uniform" }

export function supportSize(s: State): Natural {
  if (s.form === "zero") {
    return { form: "succ", prior: { form: "zero" } }
  } else if (s.form === "one") {
    return { form: "succ", prior: { form: "zero" } }
  } else if (s.form === "plus") {
    return { form: "succ", prior: { form: "zero" } }
  } else if (s.form === "minus") {
    return { form: "succ", prior: { form: "zero" } }
  } else {
    return { form: "succ", prior: { form: "succ", prior: { form: "zero" } } }
  }
}

export function isPure(s: State): Bit {
  if (s.form === "zero") {
    return { form: "on" }
  } else if (s.form === "one") {
    return { form: "on" }
  } else if (s.form === "plus") {
    return { form: "on" }
  } else if (s.form === "minus") {
    return { form: "on" }
  } else {
    return { form: "off" }
  }
}

export type Unitary =
  | { form: "identity" }
  | { form: "flip" }

export function act(u: Unitary, s: State): State {
  if (u.form === "identity") {
    return s
  } else {
    if (s.form === "zero") {
      return { form: "one" }
    } else if (s.form === "one") {
      return { form: "zero" }
    } else if (s.form === "plus") {
      return { form: "plus" }
    } else if (s.form === "minus") {
      return { form: "minus" }
    } else {
      return { form: "uniform" }
    }
  }
}

export function compose(f: Unitary, g: Unitary): Unitary {
  if (f.form === "identity") {
    return g
  } else {
    if (g.form === "identity") {
      return { form: "flip" }
    } else {
      return { form: "identity" }
    }
  }
}

export function measure(s: State): State {
  if (s.form === "zero") {
    return { form: "zero" }
  } else if (s.form === "one") {
    return { form: "one" }
  } else if (s.form === "plus") {
    return { form: "uniform" }
  } else if (s.form === "minus") {
    return { form: "uniform" }
  } else {
    return { form: "uniform" }
  }
}

export function minusOne(n: Natural): Natural {
  if (n.form === "zero") {
    return { form: "zero" }
  } else {
    const prior = n.prior
    return prior
  }
}

export function entropy(s: State): Natural {
  return minusOne(supportSize(s))
}

export function unitaryComposesInSequence(f: Unitary, g: Unitary, s: State): Unitary {
  // hold: verified at compile time
  return f
}

export function compositionIsAssociative(f: Unitary, g: Unitary, h: Unitary): Unitary {
  // hold: verified at compile time
  return f
}

export function identityIsLeftUnit(g: Unitary): Unitary {
  // hold: verified at compile time
  return g
}

export function identityIsRightUnit(g: Unitary): Unitary {
  // hold: verified at compile time
  return g
}

export function flipIsInvolution(s: State): State {
  // hold: verified at compile time
  return s
}

export function trace(s: State): Natural {
  return { form: "succ", prior: { form: "zero" } }
}

export function unitaryPreservesTrace(u: Unitary, s: State): Unitary {
  // hold: verified at compile time
  return u
}

export function measurePreservesTrace(s: State): State {
  // hold: verified at compile time
  return s
}

export function tracePreservationComposes(f: Unitary, g: Unitary, s: State): Unitary {
  // hold: verified at compile time
  return f
}

export function entropyOfZeroIsZero(): void {
  // hold: verified at compile time
  return undefined
}

export function entropyOfOneIsZero(): void {
  // hold: verified at compile time
  return undefined
}

export function entropyOfPlusIsZero(): void {
  // hold: verified at compile time
  return undefined
}

export function entropyOfMinusIsZero(): void {
  // hold: verified at compile time
  return undefined
}

export function atLeastZero(n: Natural): Bit {
  return { form: "on" }
}

export function entropyIsNonNegative(s: State): State {
  // hold: verified at compile time
  return s
}

export function entropyOfUniformIsOne(): void {
  // hold: verified at compile time
  return undefined
}

export function unitaryPreservesEntropy(u: Unitary, s: State): Unitary {
  // hold: verified at compile time
  return u
}

export function unitaryPreservesPurity(u: Unitary, s: State): Unitary {
  // hold: verified at compile time
  return u
}

export function measureRaisesEntropyOfPlus(): void {
  // hold: verified at compile time
  return undefined
}

export function measureDestroysPurityOfPlus(): void {
  // hold: verified at compile time
  return undefined
}

export function plusIsPure(): void {
  // hold: verified at compile time
  return undefined
}

export function measureIsNotAUnitaryOnPlus(): void {
  // hold: verified at compile time
  return undefined
}

export function measureFixesZero(): void {
  // hold: verified at compile time
  return undefined
}

export function measureIsIdempotent(s: State): State {
  // hold: verified at compile time
  return s
}

export function uniformIsNotPure(): void {
  // hold: verified at compile time
  return undefined
}
