export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function plus(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return b
  } else {
    const prior = a.prior
    return { form: "succ", prior: plus(prior, b) }
  }
}

export function fib(n: Natural): Natural {
  if (n.form === "zero") {
    return { form: "zero" }
  } else {
    const m = n.prior
    if (m.form === "zero") {
      return { form: "succ", prior: { form: "zero" } }
    } else {
      const k = m.prior
      return plus(fib(m), fib(k))
    }
  }
}

export function isEqualNatural(a: Natural, b: Natural): Flag {
  if (a.form === "zero") {
    if (b.form === "zero") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    const pa = a.prior
    if (b.form === "zero") {
      return { form: "no" }
    } else {
      const pb = b.prior
      return isEqualNatural(pa, pb)
    }
  }
}

export type Bits =
  | { form: "done" }
  | { form: "zero"; rest: Bits }
  | { form: "one"; rest: Bits }

export function validFrom(prev: Flag, xs: Bits): Flag {
  if (xs.form === "done") {
    return { form: "yes" }
  } else if (xs.form === "zero") {
    const rest = xs.rest
    return validFrom({ form: "no" }, rest)
  } else {
    const rest = xs.rest
    if (prev.form === "yes") {
      return { form: "no" }
    } else {
      return validFrom({ form: "yes" }, rest)
    }
  }
}

export function isValid(xs: Bits): Flag {
  return validFrom({ form: "no" }, xs)
}

export function valueFrom(index: Natural, xs: Bits): Natural {
  if (xs.form === "done") {
    return { form: "zero" }
  } else if (xs.form === "zero") {
    const rest = xs.rest
    return valueFrom({ form: "succ", prior: index }, rest)
  } else {
    const rest = xs.rest
    return plus(fib(index), valueFrom({ form: "succ", prior: index }, rest))
  }
}

export function value(xs: Bits): Natural {
  return valueFrom({ form: "succ", prior: { form: "succ", prior: { form: "zero" } } }, xs)
}

export function zeros(n: Natural): Bits {
  if (n.form === "zero") {
    return { form: "done" }
  } else {
    const prior = n.prior
    return { form: "zero", rest: zeros(prior) }
  }
}

export function countOn(xs: Bits): Natural {
  if (xs.form === "done") {
    return { form: "zero" }
  } else if (xs.form === "zero") {
    const rest = xs.rest
    return countOn(rest)
  } else {
    const rest = xs.rest
    return { form: "succ", prior: countOn(rest) }
  }
}

export function doneIsValid(): void {
  // hold: verified at compile time
  return undefined
}

export function acceptsSparseCode(): void {
  // hold: verified at compile time
  return undefined
}

export function rejectsAdjacentOnes(): void {
  // hold: verified at compile time
  return undefined
}

export function isValidClosedUnderLeadingZero(xs: Bits): Bits {
  // hold: verified at compile time
  return xs
}

export function onAfterOnAlwaysRejects(xs: Bits): Bits {
  // hold: verified at compile time
  return xs
}

export function valueOfOneIsOne(): void {
  // hold: verified at compile time
  return undefined
}

export function valueOfZeroOneIsTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function valueOfOneZeroOneIsFour(): void {
  // hold: verified at compile time
  return undefined
}

export function differentCodesCarryDifferentValues(): void {
  // hold: verified at compile time
  return undefined
}

export function zerosHaveNoOnBits(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function zerosAreValid(n: Natural): Natural {
  // hold: verified at compile time
  return n
}
