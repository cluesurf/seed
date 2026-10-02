export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export type Term =
  | { form: "variable"; index: Natural }
  | { form: "lambda"; body: Term }
  | { form: "apply"; function: Term; argument: Term }

export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Ordering =
  | { form: "below" }
  | { form: "equal" }
  | { form: "above" }

export function compare(a: Natural, b: Natural): Ordering {
  if (a.form === "zero") {
    if (b.form === "zero") {
      return { form: "equal" }
    } else {
      return { form: "below" }
    }
  } else {
    const aPrior = a.prior
    if (b.form === "zero") {
      return { form: "above" }
    } else {
      const bPrior = b.prior
      return compare(aPrior, bPrior)
    }
  }
}

export function atLeast(i: Natural, c: Natural): Flag {
  return atOrAbove(compare(i, c))
}

export function atOrAbove(order: Ordering): Flag {
  if (order.form === "below") {
    return { form: "no" }
  } else if (order.form === "equal") {
    return { form: "yes" }
  } else {
    return { form: "yes" }
  }
}

export function shift(c: Natural, t: Term): Term {
  if (t.form === "variable") {
    const index = t.index
    return shiftVariable(atLeast(index, c), index)
  } else if (t.form === "lambda") {
    const body = t.body
    return { form: "lambda", body: shift({ form: "succ", prior: c }, body) }
  } else {
    const shiftFunction = t.function
    const shiftArgument = t.argument
    return { form: "apply", function: shift(c, shiftFunction), argument: shift(c, shiftArgument) }
  }
}

export function shiftVariable(move: Flag, index: Natural): Term {
  if (move.form === "yes") {
    return { form: "variable", index: { form: "succ", prior: index } }
  } else {
    return { form: "variable", index: index }
  }
}

export function substitute(depth: Natural, value: Term, t: Term): Term {
  if (t.form === "variable") {
    const index = t.index
    return substituteVariable(depth, value, index)
  } else if (t.form === "lambda") {
    const body = t.body
    return { form: "lambda", body: substitute({ form: "succ", prior: depth }, shift({ form: "zero" }, value), body) }
  } else {
    const function_ = t.function
    const argument = t.argument
    return { form: "apply", function: substitute(depth, value, function_), argument: substitute(depth, value, argument) }
  }
}

export function predecessor(n: Natural): Natural {
  if (n.form === "zero") {
    return { form: "zero" }
  } else {
    const prior = n.prior
    return prior
  }
}

export function substituteVariable(depth: Natural, value: Term, index: Natural): Term {
  return dispatchSubstitution(compare(index, depth), value, index)
}

export function dispatchSubstitution(order: Ordering, value: Term, index: Natural): Term {
  if (order.form === "equal") {
    return value
  } else if (order.form === "above") {
    return { form: "variable", index: predecessor(index) }
  } else {
    return { form: "variable", index: index }
  }
}

export function step(t: Term): Term {
  if (t.form === "variable") {
    return t
  } else if (t.form === "lambda") {
    return t
  } else {
    const headFunction = t.function
    const headArgument = t.argument
    if (headFunction.form === "lambda") {
      const lambdaBody = headFunction.body
      return substitute({ form: "zero" }, headArgument, lambdaBody)
    } else if (headFunction.form === "variable") {
      return t
    } else {
      const argument = headFunction.argument
      return { form: "apply", function: step(headFunction), argument: headArgument }
    }
  }
}

export function reduce(n: Natural, t: Term): Term {
  if (n.form === "zero") {
    return t
  } else {
    const fuelPrior = n.prior
    return reduce(fuelPrior, step(t))
  }
}

export function reduceZeroIsIdentity(t: Term): Term {
  // hold: verified at compile time
  return t
}

export function identityAppliedReturnsItsArgument(): void {
  // hold: verified at compile time
  return undefined
}

export function identityBetaReducesAnyArgument(x: Term): Term {
  // hold: verified at compile time
  return x
}

export function churchKKeepsTheFirstArgument(): void {
  // hold: verified at compile time
  return undefined
}

export function churchTrueSelectsTheThenBranch(): void {
  // hold: verified at compile time
  return undefined
}

export function churchFalseSelectsTheElseBranch(): void {
  // hold: verified at compile time
  return undefined
}
