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
  | { form: "node-one" }
  | { form: "node-two" }
  | { form: "node-three" }

export type BondOrder =
  | { form: "order-one" }
  | { form: "order-two" }
  | { form: "order-three" }
  | { form: "order-four" }
  | { form: "order-six" }

export function sameNode(a: Node, b: Node): Flag {
  if (a.form === "node-one") {
    if (b.form === "node-one") {
      return { form: "yes" }
    } else if (b.form === "node-two") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "node-two") {
    if (b.form === "node-one") {
      return { form: "no" }
    } else if (b.form === "node-two") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "node-one") {
      return { form: "no" }
    } else if (b.form === "node-two") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function sameBondOrder(a: BondOrder, b: BondOrder): Flag {
  if (a.form === "order-one") {
    if (b.form === "order-one") {
      return { form: "yes" }
    } else if (b.form === "order-two") {
      return { form: "no" }
    } else if (b.form === "order-three") {
      return { form: "no" }
    } else if (b.form === "order-four") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "order-two") {
    if (b.form === "order-one") {
      return { form: "no" }
    } else if (b.form === "order-two") {
      return { form: "yes" }
    } else if (b.form === "order-three") {
      return { form: "no" }
    } else if (b.form === "order-four") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "order-three") {
    if (b.form === "order-one") {
      return { form: "no" }
    } else if (b.form === "order-two") {
      return { form: "no" }
    } else if (b.form === "order-three") {
      return { form: "yes" }
    } else if (b.form === "order-four") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "order-four") {
    if (b.form === "order-one") {
      return { form: "no" }
    } else if (b.form === "order-two") {
      return { form: "no" }
    } else if (b.form === "order-three") {
      return { form: "no" }
    } else if (b.form === "order-four") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "order-one") {
      return { form: "no" }
    } else if (b.form === "order-two") {
      return { form: "no" }
    } else if (b.form === "order-three") {
      return { form: "no" }
    } else if (b.form === "order-four") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function coxeterEntry(a: Node, b: Node): BondOrder {
  if (a.form === "node-one") {
    if (b.form === "node-one") {
      return { form: "order-one" }
    } else if (b.form === "node-two") {
      return { form: "order-three" }
    } else {
      return { form: "order-two" }
    }
  } else if (a.form === "node-two") {
    if (b.form === "node-one") {
      return { form: "order-three" }
    } else if (b.form === "node-two") {
      return { form: "order-one" }
    } else {
      return { form: "order-three" }
    }
  } else {
    if (b.form === "node-one") {
      return { form: "order-two" }
    } else if (b.form === "node-two") {
      return { form: "order-three" }
    } else {
      return { form: "order-one" }
    }
  }
}

export function bond(a: Node, b: Node): Flag {
  {
    const __at1 = coxeterEntry(a, b)
    if (__at1.form === "order-one") {
    return { form: "no" }
  } else if (__at1.form === "order-two") {
    return { form: "no" }
  } else if (__at1.form === "order-three") {
    return { form: "yes" }
  } else if (__at1.form === "order-four") {
    return { form: "yes" }
  } else {
    return { form: "yes" }
  }
  }
}

export function commute(a: Node, b: Node): Flag {
  {
    const __at1 = coxeterEntry(a, b)
    if (__at1.form === "order-two") {
    return { form: "yes" }
  } else if (__at1.form === "order-one") {
    return { form: "no" }
  } else if (__at1.form === "order-three") {
    return { form: "no" }
  } else if (__at1.form === "order-four") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
  }
}

export function isAtLeastTwo(m: BondOrder): Flag {
  if (m.form === "order-one") {
    return { form: "no" }
  } else if (m.form === "order-two") {
    return { form: "yes" }
  } else if (m.form === "order-three") {
    return { form: "yes" }
  } else if (m.form === "order-four") {
    return { form: "yes" }
  } else {
    return { form: "yes" }
  }
}

export function coxeterIsSymmetric(a: Node, b: Node): Node {
  // hold: verified at compile time
  return a
}

export function coxeterDiagonalIsOne(a: Node): Node {
  // hold: verified at compile time
  return a
}

export function offDiagonalIsAtLeastTwo(a: Node, b: Node): Node {
  // hold: verified at compile time
  return a
}

export function pickCommuteOrBond(commuting: Flag): BondOrder {
  if (commuting.form === "yes") {
    return { form: "order-two" }
  } else {
    return { form: "order-three" }
  }
}

export function commuteIffNoBond(a: Node, b: Node): Node {
  // hold: verified at compile time
  return a
}

export function a3IsSimplyLaced(): void {
  // hold: verified at compile time
  return undefined
}

export function a3EndsCommute(): void {
  // hold: verified at compile time
  return undefined
}

export function a3HasTwoBondsAndNoCycle(): void {
  // hold: verified at compile time
  return undefined
}

export function bondIsSymmetric(a: Node, b: Node): Node {
  // hold: verified at compile time
  return a
}

// hold: verified at compile time

// hold: verified at compile time
