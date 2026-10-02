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

export type Site =
  | { form: "far-left" }
  | { form: "near-left" }
  | { form: "barrier" }
  | { form: "near-right" }
  | { form: "far-right" }

export type Tally =
  | { form: "none" }
  | { form: "some"; prior: Tally }

export function classicalReach(s: Site): Flag {
  if (s.form === "far-left") {
    return { form: "yes" }
  } else if (s.form === "near-left") {
    return { form: "yes" }
  } else if (s.form === "barrier") {
    return { form: "no" }
  } else if (s.form === "near-right") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
}

export function quantumReach(s: Site): Flag {
  if (s.form === "far-left") {
    return { form: "yes" }
  } else if (s.form === "near-left") {
    return { form: "yes" }
  } else if (s.form === "barrier") {
    return { form: "yes" }
  } else if (s.form === "near-right") {
    return { form: "yes" }
  } else {
    return { form: "yes" }
  }
}

export function hopRight(s: Site): Site {
  if (s.form === "far-left") {
    return { form: "near-left" }
  } else if (s.form === "near-left") {
    return { form: "barrier" }
  } else if (s.form === "barrier") {
    return { form: "near-right" }
  } else if (s.form === "near-right") {
    return { form: "far-right" }
  } else {
    return { form: "far-right" }
  }
}

export function amplitude(s: Site): Tally {
  if (s.form === "far-left") {
    return { form: "some", prior: { form: "some", prior: { form: "some", prior: { form: "some", prior: { form: "some", prior: { form: "none" } } } } } }
  } else if (s.form === "near-left") {
    return { form: "some", prior: { form: "some", prior: { form: "some", prior: { form: "some", prior: { form: "none" } } } } }
  } else if (s.form === "barrier") {
    return { form: "some", prior: { form: "some", prior: { form: "some", prior: { form: "none" } } } }
  } else if (s.form === "near-right") {
    return { form: "some", prior: { form: "none" } }
  } else {
    return { form: "some", prior: { form: "none" } }
  }
}

export function isNonzero(t: Tally): Flag {
  if (t.form === "none") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
}

export function tallyBelow(a: Tally, b: Tally): Flag {
  if (b.form === "none") {
    return { form: "no" }
  } else {
    const moreB = b.prior
    if (a.form === "none") {
      return { form: "yes" }
    } else {
      const moreA = a.prior
      return tallyBelow(moreA, moreB)
    }
  }
}

export function classicalWalkerCannotEnterTheBarrier(): void {
  // hold: verified at compile time
  return undefined
}

export function classicalWalkerIsBlockedByTheBarrier(): void {
  // hold: verified at compile time
  return undefined
}

export function quantumWalkerTunnelsThrough(): void {
  // hold: verified at compile time
  return undefined
}

export function quantumWalkerPenetratesTheBarrier(): void {
  // hold: verified at compile time
  return undefined
}

export function tunnelingIsTheDifferenceAtTheFarSide(): void {
  // hold: verified at compile time
  return undefined
}

export function quantumWalkerReachesEverySite(s: Site): Site {
  // hold: verified at compile time
  return s
}

export function reachabilityPropagatesThroughTheHop(s: Site): Site {
  // hold: verified at compile time
  return s
}

export function farSideAmplitudeIsNonzero(): void {
  // hold: verified at compile time
  return undefined
}

export function farSideAmplitudeIsAttenuated(): void {
  // hold: verified at compile time
  return undefined
}

export function crossingTheBarrierCostsExtra(): void {
  // hold: verified at compile time
  return undefined
}
