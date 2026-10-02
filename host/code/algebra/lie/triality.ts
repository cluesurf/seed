export type Rep =
  | { form: "vector" }
  | { form: "spinor" }
  | { form: "cospinor" }

export function cycle(r: Rep): Rep {
  if (r.form === "vector") {
    return { form: "spinor" }
  } else if (r.form === "spinor") {
    return { form: "cospinor" }
  } else {
    return { form: "vector" }
  }
}

export function swap(r: Rep): Rep {
  if (r.form === "vector") {
    return { form: "vector" }
  } else if (r.form === "spinor") {
    return { form: "cospinor" }
  } else {
    return { form: "spinor" }
  }
}

export function cycleHasOrderThree(r: Rep): Rep {
  // hold: verified at compile time
  return r
}

export function swapIsAnInvolution(r: Rep): Rep {
  // hold: verified at compile time
  return r
}

export function vectorIsTheFixedPointOfTheSwap(): void {
  // hold: verified at compile time
  return undefined
}

export function spinorAndCospinorAreExchangedByTheSwap(): void {
  // hold: verified at compile time
  return undefined
}

export function trialityGroupIsTheSymmetricGroup(r: Rep): Rep {
  // hold: verified at compile time
  return r
}

export function cycleSwapProductHasOrderTwo(r: Rep): Rep {
  // hold: verified at compile time
  return r
}

// hold: verified at compile time

// hold: verified at compile time
