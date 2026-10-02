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

export function either(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return { form: "yes" }
  } else {
    return b
  }
}

export type Node =
  | { form: "n1" }
  | { form: "n2" }
  | { form: "n3" }
  | { form: "n4" }
  | { form: "n5" }
  | { form: "n6" }
  | { form: "n7" }
  | { form: "n8" }

export function sameNode(a: Node, b: Node): Flag {
  if (a.form === "n1") {
    if (b.form === "n1") {
      return { form: "yes" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "n2") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "yes" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "n3") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "yes" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "n4") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "yes" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "n5") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "yes" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "n6") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "yes" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "n7") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function adjacent(a: Node, b: Node): Flag {
  if (a.form === "n1") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "yes" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "n2") {
    if (b.form === "n1") {
      return { form: "yes" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "yes" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "n3") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "yes" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "yes" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "n4") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "yes" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "yes" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "n5") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "yes" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "yes" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  } else if (a.form === "n6") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "yes" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "n7") {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "no" }
    } else if (b.form === "n6") {
      return { form: "yes" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "n1") {
      return { form: "no" }
    } else if (b.form === "n2") {
      return { form: "no" }
    } else if (b.form === "n3") {
      return { form: "no" }
    } else if (b.form === "n4") {
      return { form: "no" }
    } else if (b.form === "n5") {
      return { form: "yes" }
    } else if (b.form === "n6") {
      return { form: "no" }
    } else if (b.form === "n7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  }
}

export type CartanValue =
  | { form: "two-on-diagonal" }
  | { form: "minus-one-off-diagonal" }
  | { form: "zero-apart" }

export function sameCartanValue(a: CartanValue, b: CartanValue): Flag {
  if (a.form === "two-on-diagonal") {
    if (b.form === "two-on-diagonal") {
      return { form: "yes" }
    } else if (b.form === "minus-one-off-diagonal") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "minus-one-off-diagonal") {
    if (b.form === "two-on-diagonal") {
      return { form: "no" }
    } else if (b.form === "minus-one-off-diagonal") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "two-on-diagonal") {
      return { form: "no" }
    } else if (b.form === "minus-one-off-diagonal") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function cartanEntry(a: Node, b: Node): CartanValue {
  {
    const __at1 = sameNode(a, b)
    if (__at1.form === "yes") {
    return { form: "two-on-diagonal" }
  } else {
    {
      const __at2 = adjacent(a, b)
      if (__at2.form === "yes") {
      return { form: "minus-one-off-diagonal" }
    } else {
      return { form: "zero-apart" }
    }
    }
  }
  }
}

export function adjacentIsSymmetric(a: Node, b: Node): Node {
  // hold: verified at compile time
  return a
}

export function noNodeIsAdjacentToItself(a: Node): Node {
  // hold: verified at compile time
  return a
}

export function cartanIsSymmetric(a: Node, b: Node): Node {
  // hold: verified at compile time
  return a
}

export function cartanDiagonalIsTwo(a: Node): Node {
  // hold: verified at compile time
  return a
}

export function offDiagonalCartanTracksAdjacency(a: Node, b: Node): Node {
  // hold: verified at compile time
  return a
}

export function theSevenEdgesArePresent(): void {
  // hold: verified at compile time
  return undefined
}

export function theDiagramHasNoExtraBonds(): void {
  // hold: verified at compile time
  return undefined
}

export type Coord =
  | { form: "zero" }
  | { form: "plus-one" }
  | { form: "minus-one" }

export function isNonzero(c: Coord): Flag {
  if (c.form === "zero") {
    return { form: "no" }
  } else if (c.form === "plus-one") {
    return { form: "yes" }
  } else {
    return { form: "yes" }
  }
}

export type Tally =
  | { form: "none" }
  | { form: "one" }
  | { form: "exactly-two" }
  | { form: "more-than-two" }

export function bump(t: Tally): Tally {
  if (t.form === "none") {
    return { form: "one" }
  } else if (t.form === "one") {
    return { form: "exactly-two" }
  } else if (t.form === "exactly-two") {
    return { form: "more-than-two" }
  } else {
    return { form: "more-than-two" }
  }
}

export function countCoord(c: Coord, running: Tally): Tally {
  {
    const __at1 = isNonzero(c)
    if (__at1.form === "yes") {
    return bump(running)
  } else {
    return running
  }
  }
}

export function countNonzero(c1: Coord, c2: Coord, c3: Coord, c4: Coord, c5: Coord, c6: Coord, c7: Coord, c8: Coord): Tally {
  return countCoord(c8, countCoord(c7, countCoord(c6, countCoord(c5, countCoord(c4, countCoord(c3, countCoord(c2, countCoord(c1, { form: "none" }))))))))
}

export function isIntegerRoot(c1: Coord, c2: Coord, c3: Coord, c4: Coord, c5: Coord, c6: Coord, c7: Coord, c8: Coord): Flag {
  {
    const __at1 = countNonzero(c1, c2, c3, c4, c5, c6, c7, c8)
    if (__at1.form === "exactly-two") {
    return { form: "yes" }
  } else if (__at1.form === "none") {
    return { form: "no" }
  } else if (__at1.form === "one") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
  }
}

export function eOnePlusETwoIsARoot(): void {
  // hold: verified at compile time
  return undefined
}

export function eOneMinusEThreeIsARoot(): void {
  // hold: verified at compile time
  return undefined
}

export function threeNonzeroIsNotARoot(): void {
  // hold: verified at compile time
  return undefined
}

export function theOriginIsNotARoot(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
