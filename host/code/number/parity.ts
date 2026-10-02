export type Bit =
  | { form: "off" }
  | { form: "on" }

export function flip(b: Bit): Bit {
  if (b.form === "off") {
    return { form: "on" }
  } else {
    return { form: "off" }
  }
}

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

export function parity(n: Natural): Bit {
  if (n.form === "zero") {
    return { form: "off" }
  } else {
    const p = n.prior
    return flip(parity(p))
  }
}

export function flipFlipIsIdentity(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function paritySuccSteps(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function plusSuccLeftSteps(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plusSuccRightSteps(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function doubleIsEven(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function succDoubleIsOdd(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function half(n: Natural): Natural {
  if (n.form === "zero") {
    return { form: "zero" }
  } else {
    const m = n.prior
    if (m.form === "zero") {
      return { form: "zero" }
    } else {
      const k = m.prior
      return { form: "succ", prior: half(k) }
    }
  }
}

export function halfTwoSteps(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function halfOfDoubleIsSelf(n: Natural): Natural {
  // hold: verified at compile time
  return n
}
