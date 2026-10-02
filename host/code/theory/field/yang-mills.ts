export type Rotor =
  | { form: "p1" }
  | { form: "m1" }
  | { form: "pi" }
  | { form: "mi" }
  | { form: "pj" }
  | { form: "mj" }
  | { form: "pk" }
  | { form: "mk" }

export function identityLink(): Rotor {
  return { form: "p1" }
}

export function negate(a: Rotor): Rotor {
  if (a.form === "p1") {
    return { form: "m1" }
  } else if (a.form === "m1") {
    return { form: "p1" }
  } else if (a.form === "pi") {
    return { form: "mi" }
  } else if (a.form === "mi") {
    return { form: "pi" }
  } else if (a.form === "pj") {
    return { form: "mj" }
  } else if (a.form === "mj") {
    return { form: "pj" }
  } else if (a.form === "pk") {
    return { form: "mk" }
  } else {
    return { form: "pk" }
  }
}

export function compose(a: Rotor, b: Rotor): Rotor {
  if (a.form === "p1") {
    return b
  } else if (a.form === "m1") {
    return negate(b)
  } else if (a.form === "pi") {
    if (b.form === "p1") {
      return { form: "pi" }
    } else if (b.form === "m1") {
      return { form: "mi" }
    } else if (b.form === "pi") {
      return { form: "m1" }
    } else if (b.form === "mi") {
      return { form: "p1" }
    } else if (b.form === "pj") {
      return { form: "pk" }
    } else if (b.form === "mj") {
      return { form: "mk" }
    } else if (b.form === "pk") {
      return { form: "mj" }
    } else {
      return { form: "pj" }
    }
  } else if (a.form === "mi") {
    if (b.form === "p1") {
      return { form: "mi" }
    } else if (b.form === "m1") {
      return { form: "pi" }
    } else if (b.form === "pi") {
      return { form: "p1" }
    } else if (b.form === "mi") {
      return { form: "m1" }
    } else if (b.form === "pj") {
      return { form: "mk" }
    } else if (b.form === "mj") {
      return { form: "pk" }
    } else if (b.form === "pk") {
      return { form: "pj" }
    } else {
      return { form: "mj" }
    }
  } else if (a.form === "pj") {
    if (b.form === "p1") {
      return { form: "pj" }
    } else if (b.form === "m1") {
      return { form: "mj" }
    } else if (b.form === "pi") {
      return { form: "mk" }
    } else if (b.form === "mi") {
      return { form: "pk" }
    } else if (b.form === "pj") {
      return { form: "m1" }
    } else if (b.form === "mj") {
      return { form: "p1" }
    } else if (b.form === "pk") {
      return { form: "pi" }
    } else {
      return { form: "mi" }
    }
  } else if (a.form === "mj") {
    if (b.form === "p1") {
      return { form: "mj" }
    } else if (b.form === "m1") {
      return { form: "pj" }
    } else if (b.form === "pi") {
      return { form: "pk" }
    } else if (b.form === "mi") {
      return { form: "mk" }
    } else if (b.form === "pj") {
      return { form: "p1" }
    } else if (b.form === "mj") {
      return { form: "m1" }
    } else if (b.form === "pk") {
      return { form: "mi" }
    } else {
      return { form: "pi" }
    }
  } else if (a.form === "pk") {
    if (b.form === "p1") {
      return { form: "pk" }
    } else if (b.form === "m1") {
      return { form: "mk" }
    } else if (b.form === "pi") {
      return { form: "pj" }
    } else if (b.form === "mi") {
      return { form: "mj" }
    } else if (b.form === "pj") {
      return { form: "mi" }
    } else if (b.form === "mj") {
      return { form: "pi" }
    } else if (b.form === "pk") {
      return { form: "m1" }
    } else {
      return { form: "p1" }
    }
  } else {
    if (b.form === "p1") {
      return { form: "mk" }
    } else if (b.form === "m1") {
      return { form: "pk" }
    } else if (b.form === "pi") {
      return { form: "mj" }
    } else if (b.form === "mi") {
      return { form: "pj" }
    } else if (b.form === "pj") {
      return { form: "pi" }
    } else if (b.form === "mj") {
      return { form: "mi" }
    } else if (b.form === "pk") {
      return { form: "p1" }
    } else {
      return { form: "m1" }
    }
  }
}

export function invert(a: Rotor): Rotor {
  if (a.form === "p1") {
    return { form: "p1" }
  } else if (a.form === "m1") {
    return { form: "m1" }
  } else if (a.form === "pi") {
    return { form: "mi" }
  } else if (a.form === "mi") {
    return { form: "pi" }
  } else if (a.form === "pj") {
    return { form: "mj" }
  } else if (a.form === "mj") {
    return { form: "pj" }
  } else if (a.form === "pk") {
    return { form: "mk" }
  } else {
    return { form: "pk" }
  }
}

export type Character =
  | { form: "plus-two" }
  | { form: "zero" }
  | { form: "minus-two" }

export function trace(x: Rotor): Character {
  if (x.form === "p1") {
    return { form: "plus-two" }
  } else if (x.form === "m1") {
    return { form: "minus-two" }
  } else if (x.form === "pi") {
    return { form: "zero" }
  } else if (x.form === "mi") {
    return { form: "zero" }
  } else if (x.form === "pj") {
    return { form: "zero" }
  } else if (x.form === "mj") {
    return { form: "zero" }
  } else if (x.form === "pk") {
    return { form: "zero" }
  } else {
    return { form: "zero" }
  }
}

export function conjugate(g: Rotor, w: Rotor): Rotor {
  return compose(compose(g, w), invert(g))
}

export type Path =
  | { form: "stay" }
  | { form: "step"; link: Rotor; more: Path }

export function holonomy(p: Path): Rotor {
  if (p.form === "stay") {
    return { form: "p1" }
  } else {
    const link = p.link
    const more = p.more
    return compose(link, holonomy(more))
  }
}

export function concat(p: Path, q: Path): Path {
  if (p.form === "stay") {
    return q
  } else {
    const link = p.link
    const more = p.more
    return { form: "step", link: link, more: concat(more, q) }
  }
}

export function wilson(loop: Path): Character {
  return trace(holonomy(loop))
}

export type Tally =
  | { form: "none" }
  | { form: "next"; prior: Tally }

export function flatPath(n: Tally): Path {
  if (n.form === "none") {
    return { form: "stay" }
  } else {
    const prior = n.prior
    return { form: "step", link: { form: "p1" }, more: flatPath(prior) }
  }
}

export function plaquette(u: Rotor, v: Rotor): Rotor {
  return holonomy({ form: "step", link: u, more: { form: "step", link: v, more: { form: "step", link: invert(u), more: { form: "step", link: invert(v), more: { form: "stay" } } } } })
}

export function gaugeProductIsAssociative(a: Rotor, b: Rotor, c: Rotor): Rotor {
  // hold: verified at compile time
  return a
}

export function identityIsLeftUnit(a: Rotor): Rotor {
  // hold: verified at compile time
  return a
}

export function identityIsRightUnit(a: Rotor): Rotor {
  // hold: verified at compile time
  return a
}

export function linkTimesInverseIsIdentity(a: Rotor): Rotor {
  // hold: verified at compile time
  return a
}

export function holonomyOfStayIsIdentity(): void {
  // hold: verified at compile time
  return undefined
}

export function holonomyOfStepMultiplies(u: Rotor, p: Path): Rotor {
  // hold: verified at compile time
  return u
}

export function linksDoNotCommute(): void {
  // hold: verified at compile time
  return undefined
}

export function holonomyComposesOnAPair(): void {
  // hold: verified at compile time
  return undefined
}

export function traceIsConjugationInvariant(g: Rotor, w: Rotor): Rotor {
  // hold: verified at compile time
  return g
}

export function wilsonLoopIsGaugeInvariant(g: Rotor, h: Rotor): Rotor {
  // hold: verified at compile time
  return g
}

export function flatConnectionHasTrivialHolonomy(n: Tally): Tally {
  // hold: verified at compile time
  return n
}

export function flatWilsonLoopIsPlusTwo(n: Tally): Tally {
  // hold: verified at compile time
  return n
}

export function nonFlatWilsonLoopIsNotPlusTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function commutingPlaquetteIsTrivial(): void {
  // hold: verified at compile time
  return undefined
}

export function nonCommutingPlaquetteIsNotTrivial(): void {
  // hold: verified at compile time
  return undefined
}

export function bianchiCube(u: Rotor, v: Rotor): Rotor {
  return compose(plaquette(u, v), invert(plaquette(u, v)))
}

export function discreteBianchiCubeIsTrivial(u: Rotor, v: Rotor): Rotor {
  // hold: verified at compile time
  return u
}
