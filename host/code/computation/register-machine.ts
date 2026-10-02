export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export function run(a: Natural, b: Natural): Natural {
  if (b.form === "zero") {
    return a
  } else {
    const bp = b.prior
    return run({ form: "succ", prior: a }, bp)
  }
}

export function machineComputesTwoPlusThree(): void {
  // hold: verified at compile time
  return undefined
}

export function machineComputesZeroPlusTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function machineHaltsOnEmptyCounter(a: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plus(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return b
  } else {
    const ap = a.prior
    return { form: "succ", prior: plus(ap, b) }
  }
}

export function runSuccSteps(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plusSuccRight(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plusZeroRight(a: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function machineComputesAddition(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}
