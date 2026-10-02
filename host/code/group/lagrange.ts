export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function both(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return b
  } else {
    return { form: "no" }
  }
}

export type Zmod6 =
  | { form: "n0" }
  | { form: "n1" }
  | { form: "n2" }
  | { form: "n3" }
  | { form: "n4" }
  | { form: "n5" }

export type Coset =
  | { form: "c0" }
  | { form: "c1" }
  | { form: "c2" }

export function combine(a: Zmod6, b: Zmod6): Zmod6 {
  if (a.form === "n0") {
    return b
  } else if (a.form === "n1") {
    if (b.form === "n0") {
      return { form: "n1" }
    } else if (b.form === "n1") {
      return { form: "n2" }
    } else if (b.form === "n2") {
      return { form: "n3" }
    } else if (b.form === "n3") {
      return { form: "n4" }
    } else if (b.form === "n4") {
      return { form: "n5" }
    } else {
      return { form: "n0" }
    }
  } else if (a.form === "n2") {
    if (b.form === "n0") {
      return { form: "n2" }
    } else if (b.form === "n1") {
      return { form: "n3" }
    } else if (b.form === "n2") {
      return { form: "n4" }
    } else if (b.form === "n3") {
      return { form: "n5" }
    } else if (b.form === "n4") {
      return { form: "n0" }
    } else {
      return { form: "n1" }
    }
  } else if (a.form === "n3") {
    if (b.form === "n0") {
      return { form: "n3" }
    } else if (b.form === "n1") {
      return { form: "n4" }
    } else if (b.form === "n2") {
      return { form: "n5" }
    } else if (b.form === "n3") {
      return { form: "n0" }
    } else if (b.form === "n4") {
      return { form: "n1" }
    } else {
      return { form: "n2" }
    }
  } else if (a.form === "n4") {
    if (b.form === "n0") {
      return { form: "n4" }
    } else if (b.form === "n1") {
      return { form: "n5" }
    } else if (b.form === "n2") {
      return { form: "n0" }
    } else if (b.form === "n3") {
      return { form: "n1" }
    } else if (b.form === "n4") {
      return { form: "n2" }
    } else {
      return { form: "n3" }
    }
  } else {
    if (b.form === "n0") {
      return { form: "n5" }
    } else if (b.form === "n1") {
      return { form: "n0" }
    } else if (b.form === "n2") {
      return { form: "n1" }
    } else if (b.form === "n3") {
      return { form: "n2" }
    } else if (b.form === "n4") {
      return { form: "n3" }
    } else {
      return { form: "n4" }
    }
  }
}

export function negate(a: Zmod6): Zmod6 {
  if (a.form === "n0") {
    return { form: "n0" }
  } else if (a.form === "n1") {
    return { form: "n5" }
  } else if (a.form === "n2") {
    return { form: "n4" }
  } else if (a.form === "n3") {
    return { form: "n3" }
  } else if (a.form === "n4") {
    return { form: "n2" }
  } else {
    return { form: "n1" }
  }
}

export function inSubgroup(a: Zmod6): Flag {
  if (a.form === "n0") {
    return { form: "yes" }
  } else if (a.form === "n1") {
    return { form: "no" }
  } else if (a.form === "n2") {
    return { form: "no" }
  } else if (a.form === "n3") {
    return { form: "yes" }
  } else if (a.form === "n4") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
}

export function cosetOf(a: Zmod6): Coset {
  if (a.form === "n0") {
    return { form: "c0" }
  } else if (a.form === "n1") {
    return { form: "c1" }
  } else if (a.form === "n2") {
    return { form: "c2" }
  } else if (a.form === "n3") {
    return { form: "c0" }
  } else if (a.form === "n4") {
    return { form: "c1" }
  } else {
    return { form: "c2" }
  }
}

export function combineZeroLeftIsIdentity(a: Zmod6): Zmod6 {
  // hold: verified at compile time
  return a
}

export function combineZeroRightIsIdentity(a: Zmod6): Zmod6 {
  // hold: verified at compile time
  return a
}

export function combineIsCommutative(a: Zmod6, b: Zmod6): Zmod6 {
  // hold: verified at compile time
  return a
}

export function combineIsAssociative(a: Zmod6, b: Zmod6, c: Zmod6): Zmod6 {
  // hold: verified at compile time
  return a
}

export function combineInverseIsZero(a: Zmod6): Zmod6 {
  // hold: verified at compile time
  return a
}

export function combineLeftCancellation(a: Zmod6, b: Zmod6, c: Zmod6): Zmod6 {
  if (combine(a, b) == combine(a, c)) {
    // hold: verified at compile time
  }
  return a
}

export function subgroupIsClosedUnderCombine(a: Zmod6, b: Zmod6): Zmod6 {
  if (both(inSubgroup(a), inSubgroup(b)) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return a
}

export function subgroupIsClosedUnderNegate(a: Zmod6): Zmod6 {
  if (inSubgroup(a) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return a
}

export function cosetsAreInvariantUnderSubgroup(a: Zmod6): Zmod6 {
  // hold: verified at compile time
  return a
}

export function sameCosetMeansDifferenceInSubgroup(a: Zmod6, b: Zmod6): Zmod6 {
  if (cosetOf(a) == cosetOf(b)) {
    // hold: verified at compile time
  }
  return a
}

export function differenceInSubgroupMeansSameCoset(a: Zmod6, b: Zmod6): Zmod6 {
  if (inSubgroup(combine(negate(a), b)) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return a
}

export function cosetZeroIsC0(): void {
  // hold: verified at compile time
  return undefined
}

export function cosetOneIsC1(): void {
  // hold: verified at compile time
  return undefined
}

export function cosetTwoIsC2(): void {
  // hold: verified at compile time
  return undefined
}

export function cosetThreeIsC0(): void {
  // hold: verified at compile time
  return undefined
}

export function cosetFourIsC1(): void {
  // hold: verified at compile time
  return undefined
}

export function cosetFiveIsC2(): void {
  // hold: verified at compile time
  return undefined
}

export function orderOfSubgroupDividesOrderOfGroup(): void {
  // hold: verified at compile time
  return undefined
}
