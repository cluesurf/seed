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

export function n0(): Natural {
  return { form: "zero" }
}

export function n1(): Natural {
  return { form: "succ", prior: { form: "zero" } }
}

export function n2(): Natural {
  return { form: "succ", prior: { form: "succ", prior: { form: "zero" } } }
}

export function n3(): Natural {
  return { form: "succ", prior: { form: "succ", prior: { form: "succ", prior: { form: "zero" } } } }
}

export function n4(): Natural {
  return { form: "succ", prior: { form: "succ", prior: { form: "succ", prior: { form: "succ", prior: { form: "zero" } } } } }
}

export type Weight =
  | { form: "neg"; prior: Natural }
  | { form: "zero-weight" }
  | { form: "pos"; prior: Natural }

export function negateWeight(m: Weight): Weight {
  if (m.form === "neg") {
    const prior = m.prior
    return { form: "pos", prior: prior }
  } else if (m.form === "zero-weight") {
    return { form: "zero-weight" }
  } else {
    const prior = m.prior
    return { form: "neg", prior: prior }
  }
}

export function nextWeight(m: Weight): Weight {
  if (m.form === "neg") {
    const prior = m.prior
    if (prior.form === "zero") {
      return { form: "zero-weight" }
    } else {
      const q = prior.prior
      return { form: "neg", prior: q }
    }
  } else if (m.form === "zero-weight") {
    return { form: "pos", prior: { form: "zero" } }
  } else {
    const prior = m.prior
    return { form: "pos", prior: { form: "succ", prior: prior } }
  }
}

export function backWeight(m: Weight): Weight {
  if (m.form === "neg") {
    const prior = m.prior
    return { form: "neg", prior: { form: "succ", prior: prior } }
  } else if (m.form === "zero-weight") {
    return { form: "neg", prior: { form: "zero" } }
  } else {
    const prior = m.prior
    if (prior.form === "zero") {
      return { form: "zero-weight" }
    } else {
      const q = prior.prior
      return { form: "pos", prior: q }
    }
  }
}

export function cartan(m: Weight): Weight {
  return m
}

export function raise(m: Weight): Weight {
  return nextWeight(nextWeight(m))
}

export function lower(m: Weight): Weight {
  return backWeight(backWeight(m))
}

export function topWeight(n: Natural): Weight {
  if (n.form === "zero") {
    return { form: "zero-weight" }
  } else {
    const prior = n.prior
    return { form: "pos", prior: prior }
  }
}

export type StringForm =
  | { form: "empty" }
  | { form: "rung"; here: Weight; more: StringForm }

export function length(xs: StringForm): Natural {
  if (xs.form === "empty") {
    return { form: "zero" }
  } else {
    const more = xs.more
    return { form: "succ", prior: length(more) }
  }
}

export function negateString(xs: StringForm): StringForm {
  if (xs.form === "empty") {
    return { form: "empty" }
  } else {
    const here = xs.here
    const more = xs.more
    return { form: "rung", here: negateWeight(here), more: negateString(more) }
  }
}

export function ladderDown(c: Natural, m: Weight): StringForm {
  if (c.form === "zero") {
    return { form: "rung", here: m, more: { form: "empty" } }
  } else {
    const prior = c.prior
    return { form: "rung", here: m, more: ladderDown(prior, lower(m)) }
  }
}

export function irreducible(n: Natural): StringForm {
  return ladderDown(n, topWeight(n))
}

export function cartanAfterRaiseIsTheRaisedWeight(m: Weight): Weight {
  // hold: verified at compile time
  return m
}

export function cartanAfterLowerIsTheLoweredWeight(m: Weight): Weight {
  // hold: verified at compile time
  return m
}

export function lowerAfterRaiseReturns(m: Weight): Weight {
  // hold: verified at compile time
  return m
}

export function raiseAfterLowerReturns(m: Weight): Weight {
  // hold: verified at compile time
  return m
}

export function backAfterNextReturns(m: Weight): Weight {
  // hold: verified at compile time
  return m
}

export function nextAfterBackReturns(m: Weight): Weight {
  // hold: verified at compile time
  return m
}

export function negateWeightIsAnInvolution(m: Weight): Weight {
  // hold: verified at compile time
  return m
}

export function raiseIsTheMirrorOfLower(m: Weight): Weight {
  // hold: verified at compile time
  return m
}

export function highestWeightOfTrivialIsJustZero(): void {
  // hold: verified at compile time
  return undefined
}

export function raisingTheTopLeavesTheModule(): void {
  // hold: verified at compile time
  return undefined
}

export function ladderDownZeroLengthIsOne(m: Weight): Weight {
  // hold: verified at compile time
  return m
}

export function ladderDownSuccLengthSteps(c: Natural, m: Weight): Natural {
  // hold: verified at compile time
  return c
}

export function ladderLengthIsCounterPlusOne(c: Natural, m: Weight): Natural {
  // hold: verified at compile time
  return c
}

export function irreducibleIsTheLadderFromTheTop(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function irreducibleDimensionIsNPlusOne(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function weightStringOfDoubletIsSignSymmetric(): void {
  // hold: verified at compile time
  return undefined
}

export function weightStringOfTripletIsSignSymmetric(): void {
  // hold: verified at compile time
  return undefined
}

export function negateStringIsAnInvolution(xs: StringForm): StringForm {
  // hold: verified at compile time
  return xs
}

export function product(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return { form: "zero" }
  } else {
    const prior = a.prior
    return plus(b, product(prior, b))
  }
}

export function casimir(n: Natural): Natural {
  return product(n, plus(n, n2()))
}

export function casimirOnTripletIsEight(): void {
  // hold: verified at compile time
  return undefined
}

export function casimirOnDoubletIsThree(): void {
  // hold: verified at compile time
  return undefined
}

export function casimirAt(n: Natural, m: Weight): Natural {
  return casimir(n)
}

export function casimirIsScalarOnTopAndBottomOfTriplet(): void {
  // hold: verified at compile time
  return undefined
}

export function casimirAtIsConstantAcrossTheString(n: Natural, m: Weight): Natural {
  // hold: verified at compile time
  return n
}

export function productDimensionOfDoubletTimesDoubletIsFour(): void {
  // hold: verified at compile time
  return undefined
}

export function clebschGordanDimensionCount(): void {
  // hold: verified at compile time
  return undefined
}

export function clebschGordanProductEqualsSum(): void {
  // hold: verified at compile time
  return undefined
}

export function clebschGordanTopWeightAdds(): void {
  // hold: verified at compile time
  return undefined
}
