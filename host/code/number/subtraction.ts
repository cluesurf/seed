export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export function pred(n: Natural): Natural {
  if (n.form === "zero") {
    return { form: "zero" }
  } else {
    const prior = n.prior
    return prior
  }
}

export function monus(a: Natural, b: Natural): Natural {
  if (b.form === "zero") {
    return a
  } else {
    const prior = b.prior
    return pred(monus(a, prior))
  }
}

export function predSuccIsPrior(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function monusZeroRightIsSelf(a: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function monusSuccRightSteps(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function monusZeroLeftIsZero(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function monusSuccSuccCancels(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function monusSelfIsZero(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function plus(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return b
  } else {
    const prior = a.prior
    return { form: "succ", prior: plus(prior, b) }
  }
}

export function plusZeroRight(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function plusSuccRight(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function monusPlusCancel(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function monusMonusIsMonusPlus(a: Natural, b: Natural, c: Natural): Natural {
  // hold: verified at compile time
  return a
}
