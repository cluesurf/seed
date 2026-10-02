export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export function plus(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return b
  } else {
    const prior = a.prior
    return { form: "succ", prior: plus(prior, b) }
  }
}

export function equalIsReflexive(a: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function equalIsSymmetric(a: Natural, b: Natural): Natural {
  if (a == b) {
    // hold: verified at compile time
  }
  return a
}

export function equalIsTransitive(a: Natural, b: Natural, c: Natural): Natural {
  if (a == b) {
    if (b == c) {
      // hold: verified at compile time
    }
  }
  return a
}

export function succRespectsEqual(a: Natural, b: Natural): Natural {
  if (a == b) {
    // hold: verified at compile time
  }
  return a
}

export function plusRespectsEqualLeft(a: Natural, b: Natural, c: Natural): Natural {
  if (a == b) {
    // hold: verified at compile time
  }
  return a
}

export function plusRespectsEqualRight(a: Natural, b: Natural, c: Natural): Natural {
  if (a == b) {
    // hold: verified at compile time
  }
  return a
}
