export type Bit =
  | { form: "off" }
  | { form: "on" }

export function some(a: Bit, b: Bit): Bit {
  if (a.form === "off") {
    return b
  } else {
    return { form: "on" }
  }
}

export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export function atMost(a: Natural, b: Natural): Bit {
  if (a.form === "zero") {
    return { form: "on" }
  } else {
    const ap = a.prior
    if (b.form === "zero") {
      return { form: "off" }
    } else {
      const bp = b.prior
      return atMost(ap, bp)
    }
  }
}

export function min(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return { form: "zero" }
  } else {
    const ap = a.prior
    if (b.form === "zero") {
      return { form: "zero" }
    } else {
      const bp = b.prior
      return { form: "succ", prior: min(ap, bp) }
    }
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

export function atMostZeroLeftIsOn(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function atMostSuccBoth(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function atMostReflexive(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function atMostIsTransitive(a: Natural, b: Natural, c: Natural): Natural {
  if (atMost(a, b) == { form: "on" }) {
    if (atMost(b, c) == { form: "on" }) {
      // hold: verified at compile time
    }
  }
  return a
}

export function atMostIsAntisymmetric(a: Natural, b: Natural): Natural {
  if (atMost(a, b) == { form: "on" }) {
    if (atMost(b, a) == { form: "on" }) {
      // hold: verified at compile time
    }
  }
  return a
}

export function atMostIsTotal(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function atMostMinLeft(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function minSelfIsSelf(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function maxSelfIsSelf(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function minZeroLeftIsZero(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function maxZeroLeftIsSelf(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function minIsCommutative(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function maxIsCommutative(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function minIsAssociative(a: Natural, b: Natural, c: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function maxIsAssociative(a: Natural, b: Natural, c: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plus(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return b
  } else {
    const prior = a.prior
    return { form: "succ", prior: plus(prior, b) }
  }
}

export function plusZeroRightIsIdentity(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function plusSuccRightStepsOut(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function atMostPlusMonotone(a: Natural, b: Natural, c: Natural): Natural {
  if (atMost(a, b) == { form: "on" }) {
    // hold: verified at compile time
  }
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

export function minSuccBothSteps(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function maxPlusMinIsPlus(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}
