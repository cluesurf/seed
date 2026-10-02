export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type RingState =
  | { form: "ringed" }
  | { form: "plain" }

export type Node =
  | { form: "node-a" }
  | { form: "node-b" }

export function sameRing(a: RingState, b: RingState): Flag {
  if (a.form === "ringed") {
    if (b.form === "ringed") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "ringed") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export type Marking =
  | { form: "pair"; markA: RingState; markB: RingState }

export function ringAt(m: Marking, n: Node): RingState {
  if (m.form === "pair") {
    const markA = m.markA
    const markB = m.markB
    if (n.form === "node-a") {
      return markA
    } else {
      return markB
    }
  }
}

export function isActive(m: Marking, n: Node): Flag {
  {
    const __at1 = ringAt(m, n)
    if (__at1.form === "ringed") {
    return { form: "yes" }
  } else {
    return { form: "no" }
  }
  }
}

export function markingRegularA(): Marking {
  return { form: "pair", markA: { form: "ringed" }, markB: { form: "plain" } }
}

export function markingRegularB(): Marking {
  return { form: "pair", markA: { form: "plain" }, markB: { form: "ringed" } }
}

export function markingTruncated(): Marking {
  return { form: "pair", markA: { form: "ringed" }, markB: { form: "ringed" } }
}

export function markingDegenerate(): Marking {
  return { form: "pair", markA: { form: "plain" }, markB: { form: "plain" } }
}

export type Seed =
  | { form: "home" }
  | { form: "moved-a" }
  | { form: "moved-b" }

export function reflectIfActive(m: Marking, n: Node, s: Seed): Seed {
  {
    const __at1 = isActive(m, n)
    if (__at1.form === "no") {
    return s
  } else {
    if (n.form === "node-a") {
      return { form: "moved-a" }
    } else {
      return { form: "moved-b" }
    }
  }
  }
}

export function sameSeed(a: Seed, b: Seed): Flag {
  if (a.form === "home") {
    if (b.form === "home") {
      return { form: "yes" }
    } else if (b.form === "moved-a") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "moved-a") {
    if (b.form === "home") {
      return { form: "no" }
    } else if (b.form === "moved-a") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "home") {
      return { form: "no" }
    } else if (b.form === "moved-a") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export type Scale =
  | { form: "p-three" }
  | { form: "p-four" }
  | { form: "p-five" }
  | { form: "p-six" }

export function valueOfScale(p: Scale): number {
  if (p.form === "p-three") {
    return 3
  } else if (p.form === "p-four") {
    return 4
  } else if (p.form === "p-five") {
    return 5
  } else {
    return 6
  }
}

export function doubleValueOfScale(p: Scale): number {
  if (p.form === "p-three") {
    return 6
  } else if (p.form === "p-four") {
    return 8
  } else if (p.form === "p-five") {
    return 10
  } else {
    return 12
  }
}

export type Tally =
  | { form: "none" }
  | { form: "one" }
  | { form: "both" }

export function activeTally(m: Marking): Tally {
  {
    const __at1 = isActive(m, { form: "node-a" })
    if (__at1.form === "no") {
    {
      const __at2 = isActive(m, { form: "node-b" })
      if (__at2.form === "no") {
      return { form: "none" }
    } else {
      return { form: "one" }
    }
    }
  } else {
    {
      const __at2 = isActive(m, { form: "node-b" })
      if (__at2.form === "no") {
      return { form: "one" }
    } else {
      return { form: "both" }
    }
    }
  }
  }
}

export function activeCount(m: Marking): number {
  {
    const __at1 = activeTally(m)
    if (__at1.form === "none") {
    return 0
  } else if (__at1.form === "one") {
    return 1
  } else {
    return 2
  }
  }
}

export function vertexCount(m: Marking, p: Scale): number {
  {
    const __at1 = activeTally(m)
    if (__at1.form === "none") {
    return 1
  } else if (__at1.form === "one") {
    return valueOfScale(p)
  } else {
    return doubleValueOfScale(p)
  }
  }
}

export function inactiveReflectionFixesTheSeed(s: Seed): Seed {
  // hold: verified at compile time
  return s
}

export function inactiveReflectionFixesTheSeedOnB(s: Seed): Seed {
  // hold: verified at compile time
  return s
}

export function activeReflectionMovesTheSeed(): void {
  // hold: verified at compile time
  return undefined
}

export function activeReflectionLandsOnMovedA(): void {
  // hold: verified at compile time
  return undefined
}

export function triangleGroupOneRingIsATriangle(): void {
  // hold: verified at compile time
  return undefined
}

export function triangleGroupBothRingsIsAHexagon(): void {
  // hold: verified at compile time
  return undefined
}

export function oneGroupTwoRingsGiveDifferentFigures(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

export function squareGroupOneRingIsASquare(): void {
  // hold: verified at compile time
  return undefined
}

export function squareGroupBothRingsIsAnOctagon(): void {
  // hold: verified at compile time
  return undefined
}

export function theTwoRegularMarkingsAgree(): void {
  // hold: verified at compile time
  return undefined
}

export function allUnringedIsASinglePoint(p: Scale): Scale {
  // hold: verified at compile time
  return p
}

export function degenerateHasNoActiveMirror(): void {
  // hold: verified at compile time
  return undefined
}

export function regularMarkingHasOneActiveMirror(): void {
  // hold: verified at compile time
  return undefined
}

export function truncatedMarkingHasTwoActiveMirrors(): void {
  // hold: verified at compile time
  return undefined
}

export function truncationHasALargerTallyThanTheRegularFigure(): void {
  // hold: verified at compile time
  return undefined
}
