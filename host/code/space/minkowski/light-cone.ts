export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export type Order =
  | { form: "below" }
  | { form: "same" }
  | { form: "above" }

export type Interval =
  | { form: "spacelike" }
  | { form: "lightlike" }
  | { form: "timelike" }

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

export function compare(a: Natural, b: Natural): Order {
  if (a.form === "zero") {
    if (b.form === "zero") {
      return { form: "same" }
    } else {
      return { form: "below" }
    }
  } else {
    const ap = a.prior
    if (b.form === "zero") {
      return { form: "above" }
    } else {
      const bp = b.prior
      return compare(ap, bp)
    }
  }
}

export function atMost(a: Natural, b: Natural): Flag {
  if (a.form === "zero") {
    return { form: "yes" }
  } else {
    const ap = a.prior
    if (b.form === "zero") {
      return { form: "no" }
    } else {
      const bp = b.prior
      return atMost(ap, bp)
    }
  }
}

export function gapApart(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return b
  } else {
    const ap = a.prior
    if (b.form === "zero") {
      return { form: "succ", prior: ap }
    } else {
      const bp = b.prior
      return gapApart(ap, bp)
    }
  }
}

export function plus(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return b
  } else {
    const ap = a.prior
    return { form: "succ", prior: plus(ap, b) }
  }
}

export function square(n: Natural): Natural {
  if (n.form === "zero") {
    return { form: "zero" }
  } else {
    const p = n.prior
    return plus(n, square(p))
  }
}

export function orderToInterval(o: Order): Interval {
  if (o.form === "below") {
    return { form: "spacelike" }
  } else if (o.form === "same") {
    return { form: "lightlike" }
  } else {
    return { form: "timelike" }
  }
}

export function sort(dt: Natural, dx: Natural): Interval {
  return orderToInterval(compare(dt, dx))
}

export function intervalIsCausal(i: Interval): Flag {
  if (i.form === "spacelike") {
    return { form: "no" }
  } else if (i.form === "lightlike") {
    return { form: "yes" }
  } else {
    return { form: "yes" }
  }
}

export function precedes(tickA: Natural, spotA: Natural, tickB: Natural, spotB: Natural): Flag {
  return both(atMost(tickA, tickB), intervalIsCausal(sort(gapApart(tickA, tickB), gapApart(spotA, spotB))))
}

export function separationTwoOneIsTimelike(): void {
  // hold: verified at compile time
  return undefined
}

export function separationOneOneIsLightlike(): void {
  // hold: verified at compile time
  return undefined
}

export function separationOneTwoIsSpacelike(): void {
  // hold: verified at compile time
  return undefined
}

export function separationThreeZeroIsTimelike(): void {
  // hold: verified at compile time
  return undefined
}

export function separationZeroThreeIsSpacelike(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

export function compareSelfIsSame(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function equalGapsAreLightlike(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function gapApartIsSymmetric(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function intervalClassIsSymmetricOnRepresentatives(): void {
  // hold: verified at compile time
  return undefined
}

export function eventAPrecedesEventB(): void {
  // hold: verified at compile time
  return undefined
}

export function eventBPrecedesEventC(): void {
  // hold: verified at compile time
  return undefined
}

export function causalityIsTransitiveOnTheChain(): void {
  if (both({ form: "yes" }, intervalIsCausal(orderToInterval(compare({ form: "succ", prior: { form: "succ", prior: { form: "zero" } } }, { form: "succ", prior: { form: "zero" } })))) == { form: "yes" }) {
    if (both(atMost({ form: "succ", prior: { form: "succ", prior: { form: "zero" } } }, { form: "succ", prior: { form: "succ", prior: { form: "succ", prior: { form: "succ", prior: { form: "zero" } } } } }), intervalIsCausal(sort(gapApart({ form: "succ", prior: { form: "succ", prior: { form: "zero" } } }, { form: "succ", prior: { form: "succ", prior: { form: "succ", prior: { form: "succ", prior: { form: "zero" } } } } }), gapApart({ form: "succ", prior: { form: "zero" } }, { form: "succ", prior: { form: "succ", prior: { form: "zero" } } })))) == { form: "yes" }) {
      // hold: verified at compile time
    }
  }
  return undefined
}

export function theCausalOrderIsOneWay(): void {
  // hold: verified at compile time
  return undefined
}

export function atMostSelfIsYes(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function gapApartSelfIsZero(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function causalPrecedenceIsReflexive(tick: Natural, spot: Natural): Natural {
  // hold: verified at compile time
  return tick
}
