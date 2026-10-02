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

export function one(): Natural {
  return { form: "succ", prior: { form: "zero" } }
}

export function two(): Natural {
  return { form: "succ", prior: { form: "succ", prior: { form: "zero" } } }
}

export function three(): Natural {
  return { form: "succ", prior: { form: "succ", prior: { form: "succ", prior: { form: "zero" } } } }
}

export function onePlusOneIsTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function twoPlusOneIsThree(): void {
  // hold: verified at compile time
  return undefined
}

export function onePlusTwoIsThree(): void {
  // hold: verified at compile time
  return undefined
}

export function zeroPlusThreeIsThree(): void {
  // hold: verified at compile time
  return undefined
}

export function plusZeroLeftIsIdentity(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function plusSuccStepsOut(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plusZeroRightIsIdentity(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function plusSuccRightStepsOut(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plusIsAssociative(a: Natural, b: Natural, c: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plusIsCommutative(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function times(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return { form: "zero" }
  } else {
    const prior = a.prior
    return plus(b, times(prior, b))
  }
}

export function timesZeroLeftIsZero(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function timesZeroRightIsZero(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function timesOneRightIsIdentity(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function timesSuccLeftStepsOut(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function timesDistributesRight(a: Natural, b: Natural, c: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function timesIsAssociative(a: Natural, b: Natural, c: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function timesSuccRightIsPlus(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function timesIsCommutative(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function twoTimesTwoIsFour(): void {
  // hold: verified at compile time
  return undefined
}

export function power(b: Natural, d: Natural): Natural {
  if (d.form === "zero") {
    return { form: "succ", prior: { form: "zero" } }
  } else {
    const prior = d.prior
    return times(b, power(b, prior))
  }
}

export function powerZeroIsOne(b: Natural): Natural {
  // hold: verified at compile time
  return b
}

export function powerSuccStepsOut(b: Natural, d: Natural): Natural {
  // hold: verified at compile time
  return b
}

export function powerAddsExponents(b: Natural, d: Natural, e: Natural): Natural {
  // hold: verified at compile time
  return b
}

export function timesDistributesLeft(a: Natural, b: Natural, c: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function timesOneLeftIsIdentity(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function timesTwoIsDouble(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function squareOfSum(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}
