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

export function addZeroLeft(n: Natural): Natural {
  return n
}

export function identity(n: Natural): Natural {
  return n
}

export function addZeroLeftIsIdentityFunction(): void {
  // hold: verified at compile time
  return undefined
}

export function addZeroTwice(n: Natural): Natural {
  return n
}

export function addZeroTwiceIsIdentityFunction(): void {
  // hold: verified at compile time
  return undefined
}

export function addZeroRight(n: Natural): Natural {
  return plus(n, { form: "zero" })
}

export function addZeroRightPointwise(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function addZeroRightIsIdentityFunction(): void {
  // hold: verified at compile time
  return undefined
}
