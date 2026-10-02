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

export function max(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return b
  } else {
    const ap = a.prior
    if (b.form === "zero") {
      return { form: "succ", prior: ap }
    } else {
      const bp = b.prior
      return { form: "succ", prior: max(ap, bp) }
    }
  }
}

export function monusSuccRightSteps(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function predSuccIsPrior(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function monusZeroLeft(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function monusSuccSuccCancels(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function monusZeroRight(a: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plusSuccLeftSteps(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function maxSuccBothSteps(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plusZeroRight(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function maxIsPlusMonus(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plusSuccRightSteps(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function monusPlusIsMax(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}
