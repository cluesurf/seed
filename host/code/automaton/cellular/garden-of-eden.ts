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

export type Cell =
  | { form: "off" }
  | { form: "on" }

export type Strip =
  | { form: "row"; one: Cell; two: Cell; three: Cell }

export function localRule(here: Cell, right: Cell): Cell {
  if (here.form === "off") {
    return { form: "off" }
  } else {
    if (right.form === "off") {
      return { form: "off" }
    } else {
      return { form: "on" }
    }
  }
}

export function step(s: Strip): Strip {
  if (s.form === "row") {
    const one = s.one
    const two = s.two
    const three = s.three
    return { form: "row", one: localRule(one, two), two: localRule(two, three), three: localRule(three, one) }
  }
}

export function shift(s: Strip): Strip {
  if (s.form === "row") {
    const one = s.one
    const two = s.two
    const three = s.three
    return { form: "row", one: two, two: three, three: one }
  }
}

export function cellOne(s: Strip): Cell {
  if (s.form === "row") {
    const one = s.one
    return one
  }
}

export function cellTwo(s: Strip): Cell {
  if (s.form === "row") {
    const two = s.two
    return two
  }
}

export function cellThree(s: Strip): Cell {
  if (s.form === "row") {
    const three = s.three
    return three
  }
}

export function isSame(x: Strip, y: Strip): Flag {
  return both(both(cellSame(cellOne(x), cellOne(y)), cellSame(cellTwo(x), cellTwo(y))), cellSame(cellThree(x), cellThree(y)))
}

export function cellSame(p: Cell, q: Cell): Flag {
  if (p.form === "off") {
    if (q.form === "off") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (q.form === "off") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function hasPredecessor(target: Strip): Flag {
  return either(either(either(isSame(step({ form: "row", one: { form: "off" }, two: { form: "off" }, three: { form: "off" } }), target), isSame(step({ form: "row", one: { form: "off" }, two: { form: "off" }, three: { form: "on" } }), target)), either(isSame(step({ form: "row", one: { form: "off" }, two: { form: "on" }, three: { form: "off" } }), target), isSame(step({ form: "row", one: { form: "off" }, two: { form: "on" }, three: { form: "on" } }), target))), either(either(isSame(step({ form: "row", one: { form: "on" }, two: { form: "off" }, three: { form: "off" } }), target), isSame(step({ form: "row", one: { form: "on" }, two: { form: "off" }, three: { form: "on" } }), target)), either(isSame(step({ form: "row", one: { form: "on" }, two: { form: "on" }, three: { form: "off" } }), target), isSame(step({ form: "row", one: { form: "on" }, two: { form: "on" }, three: { form: "on" } }), target))))
}

export function imageHits(candidate: Strip, target: Strip): Flag {
  return isSame(step(candidate), target)
}

export function stepCommutesWithShift(s: Strip): Strip {
  // hold: verified at compile time
  return s
}

export function gardenOfEdenHasNoPredecessor(): void {
  // hold: verified at compile time
  return undefined
}

export function reachableStripHasAPredecessor(): void {
  // hold: verified at compile time
  return undefined
}

export function hasPredecessorByShift(target: Strip): Flag {
  return either(either(either(isSame(shift({ form: "row", one: { form: "off" }, two: { form: "off" }, three: { form: "off" } }), target), isSame(shift({ form: "row", one: { form: "off" }, two: { form: "off" }, three: { form: "on" } }), target)), either(isSame(shift({ form: "row", one: { form: "off" }, two: { form: "on" }, three: { form: "off" } }), target), isSame(shift({ form: "row", one: { form: "off" }, two: { form: "on" }, three: { form: "on" } }), target))), either(either(isSame(shift({ form: "row", one: { form: "on" }, two: { form: "off" }, three: { form: "off" } }), target), isSame(shift({ form: "row", one: { form: "on" }, two: { form: "off" }, three: { form: "on" } }), target)), either(isSame(shift({ form: "row", one: { form: "on" }, two: { form: "on" }, three: { form: "off" } }), target), isSame(shift({ form: "row", one: { form: "on" }, two: { form: "on" }, three: { form: "on" } }), target))))
}

export function shiftHits(candidate: Strip, target: Strip): Flag {
  return isSame(shift(candidate), target)
}

export function reversibleRuleHasNoGardenOfEden(a: Cell, b: Cell, c: Cell): Cell {
  // hold: verified at compile time
  return a
}

export function shiftIsNotIdentity(): void {
  // hold: verified at compile time
  return undefined
}
