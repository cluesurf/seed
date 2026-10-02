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

export type Vertex =
  | { form: "north" }
  | { form: "east" }
  | { form: "south" }
  | { form: "west" }

export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function adjacent(a: Vertex, b: Vertex): Flag {
  if (a.form === "north") {
    if (b.form === "north") {
      return { form: "no" }
    } else if (b.form === "east") {
      return { form: "yes" }
    } else if (b.form === "south") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  } else if (a.form === "east") {
    if (b.form === "north") {
      return { form: "yes" }
    } else if (b.form === "east") {
      return { form: "no" }
    } else if (b.form === "south") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "south") {
    if (b.form === "north") {
      return { form: "no" }
    } else if (b.form === "east") {
      return { form: "yes" }
    } else if (b.form === "south") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  } else {
    if (b.form === "north") {
      return { form: "yes" }
    } else if (b.form === "east") {
      return { form: "no" }
    } else if (b.form === "south") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  }
}

export function tally(f: Flag, n: Natural): Natural {
  if (f.form === "yes") {
    return { form: "succ", prior: n }
  } else {
    return n
  }
}

export function degree(v: Vertex): Natural {
  return tally(adjacent(v, { form: "north" }), tally(adjacent(v, { form: "east" }), tally(adjacent(v, { form: "south" }), tally(adjacent(v, { form: "west" }), { form: "zero" }))))
}

export function degreeSum(): Natural {
  return plus({ form: "succ", prior: { form: "succ", prior: { form: "zero" } } }, plus({ form: "succ", prior: { form: "succ", prior: { form: "zero" } } }, plus({ form: "succ", prior: { form: "succ", prior: { form: "zero" } } }, { form: "succ", prior: { form: "succ", prior: { form: "zero" } } })))
}

export function isBefore(a: Vertex, b: Vertex): Flag {
  if (a.form === "north") {
    if (b.form === "north") {
      return { form: "no" }
    } else if (b.form === "east") {
      return { form: "yes" }
    } else if (b.form === "south") {
      return { form: "yes" }
    } else {
      return { form: "yes" }
    }
  } else if (a.form === "east") {
    if (b.form === "north") {
      return { form: "no" }
    } else if (b.form === "east") {
      return { form: "no" }
    } else if (b.form === "south") {
      return { form: "yes" }
    } else {
      return { form: "yes" }
    }
  } else if (a.form === "south") {
    if (b.form === "north") {
      return { form: "no" }
    } else if (b.form === "east") {
      return { form: "no" }
    } else if (b.form === "south") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  } else {
    if (b.form === "north") {
      return { form: "no" }
    } else if (b.form === "east") {
      return { form: "no" }
    } else if (b.form === "south") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  }
}

export function both(f: Flag, g: Flag): Flag {
  if (f.form === "yes") {
    return g
  } else {
    return { form: "no" }
  }
}

export function edgesFrom(a: Vertex, n: Natural): Natural {
  return tally(both(adjacent(a, { form: "north" }), isBefore(a, { form: "north" })), tally(both(adjacent(a, { form: "east" }), isBefore(a, { form: "east" })), tally(both(adjacent(a, { form: "south" }), isBefore(a, { form: "south" })), tally(both(adjacent(a, { form: "west" }), isBefore(a, { form: "west" })), n))))
}

export function edgeCount(): Natural {
  return { form: "succ", prior: { form: "succ", prior: { form: "succ", prior: { form: "succ", prior: { form: "zero" } } } } }
}

export function adjacentIsSymmetric(a: Vertex, b: Vertex): Vertex {
  // hold: verified at compile time
  return a
}

export function noSelfLoops(v: Vertex): Vertex {
  // hold: verified at compile time
  return v
}

export function everyDegreeIsTwo(v: Vertex): Vertex {
  // hold: verified at compile time
  return v
}

export function handshakeDegreeSumIsTwiceEdges(): void {
  // hold: verified at compile time
  return undefined
}

export function edgeCountIsFour(): void {
  // hold: verified at compile time
  return undefined
}

export function degreeSumIsEight(): void {
  // hold: verified at compile time
  return undefined
}

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

export function parity(n: Natural): Bit {
  if (n.form === "zero") {
    return { form: "off" }
  } else {
    const p = n.prior
    return flip(parity(p))
  }
}

export function tallyOdd(v: Vertex, n: Natural): Natural {
  {
    const __at1 = parity(degree(v))
    if (__at1.form === "off") {
    return n
  } else {
    return { form: "succ", prior: n }
  }
  }
}

export function oddVertexCount(): Natural {
  return tallyOdd({ form: "north" }, tallyOdd({ form: "east" }, tallyOdd({ form: "south" }, tallyOdd({ form: "west" }, { form: "zero" }))))
}

export function oddVertexCountIsEven(): void {
  // hold: verified at compile time
  return undefined
}

export function oddVertexCountIsZero(): void {
  // hold: verified at compile time
  return undefined
}
