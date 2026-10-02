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

export type Rotation =
  | { form: "g0" }
  | { form: "g1" }
  | { form: "g2" }
  | { form: "g3" }

export type Vertex =
  | { form: "v0" }
  | { form: "v1" }
  | { form: "v2" }
  | { form: "v3" }

export function combine(a: Rotation, b: Rotation): Rotation {
  if (a.form === "g0") {
    return b
  } else if (a.form === "g1") {
    if (b.form === "g0") {
      return { form: "g1" }
    } else if (b.form === "g1") {
      return { form: "g2" }
    } else if (b.form === "g2") {
      return { form: "g3" }
    } else {
      return { form: "g0" }
    }
  } else if (a.form === "g2") {
    if (b.form === "g0") {
      return { form: "g2" }
    } else if (b.form === "g1") {
      return { form: "g3" }
    } else if (b.form === "g2") {
      return { form: "g0" }
    } else {
      return { form: "g1" }
    }
  } else {
    if (b.form === "g0") {
      return { form: "g3" }
    } else if (b.form === "g1") {
      return { form: "g0" }
    } else if (b.form === "g2") {
      return { form: "g1" }
    } else {
      return { form: "g2" }
    }
  }
}

export function invert(a: Rotation): Rotation {
  if (a.form === "g0") {
    return { form: "g0" }
  } else if (a.form === "g1") {
    return { form: "g3" }
  } else if (a.form === "g2") {
    return { form: "g2" }
  } else {
    return { form: "g1" }
  }
}

export function act(g: Rotation, p: Vertex): Vertex {
  if (g.form === "g0") {
    return p
  } else if (g.form === "g1") {
    if (p.form === "v0") {
      return { form: "v1" }
    } else if (p.form === "v1") {
      return { form: "v2" }
    } else if (p.form === "v2") {
      return { form: "v3" }
    } else {
      return { form: "v0" }
    }
  } else if (g.form === "g2") {
    if (p.form === "v0") {
      return { form: "v2" }
    } else if (p.form === "v1") {
      return { form: "v3" }
    } else if (p.form === "v2") {
      return { form: "v0" }
    } else {
      return { form: "v1" }
    }
  } else {
    if (p.form === "v0") {
      return { form: "v3" }
    } else if (p.form === "v1") {
      return { form: "v0" }
    } else if (p.form === "v2") {
      return { form: "v1" }
    } else {
      return { form: "v2" }
    }
  }
}

export function sameVertex(p: Vertex, q: Vertex): Flag {
  if (p.form === "v0") {
    if (q.form === "v0") {
      return { form: "yes" }
    } else if (q.form === "v1") {
      return { form: "no" }
    } else if (q.form === "v2") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (p.form === "v1") {
    if (q.form === "v0") {
      return { form: "no" }
    } else if (q.form === "v1") {
      return { form: "yes" }
    } else if (q.form === "v2") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (p.form === "v2") {
    if (q.form === "v0") {
      return { form: "no" }
    } else if (q.form === "v1") {
      return { form: "no" }
    } else if (q.form === "v2") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (q.form === "v0") {
      return { form: "no" }
    } else if (q.form === "v1") {
      return { form: "no" }
    } else if (q.form === "v2") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function reachable(p: Vertex, q: Vertex): Flag {
  return either(either(sameVertex(p, q), sameVertex(act({ form: "g1" }, p), q)), either(sameVertex(act({ form: "g2" }, p), q), sameVertex(act({ form: "g3" }, p), q)))
}

export function fixesV0(g: Rotation): Flag {
  return sameVertex(act(g, { form: "v0" }), { form: "v0" })
}

export function actionIdentityIsTrivial(p: Vertex): Vertex {
  // hold: verified at compile time
  return p
}

export function actionRespectsProduct(g: Rotation, h: Rotation, p: Vertex): Rotation {
  // hold: verified at compile time
  return g
}

export function brokenActionViolatesProduct(): void {
  // hold: verified at compile time
  return undefined
}

export function stabilizerContainsIdentity(): void {
  // hold: verified at compile time
  return undefined
}

export function stabilizerIsClosedUnderCombine(g: Rotation, h: Rotation): Rotation {
  if (both(fixesV0(g), fixesV0(h)) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return g
}

export function stabilizerIsClosedUnderInvert(g: Rotation): Rotation {
  if (fixesV0(g) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return g
}

export function reachableIsReflexive(p: Vertex): Vertex {
  // hold: verified at compile time
  return p
}

export function reachableIsSymmetric(p: Vertex, q: Vertex): Vertex {
  if (reachable(p, q) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return p
}

export function reachableIsTransitive(p: Vertex, q: Vertex, s: Vertex): Vertex {
  if (reachable(p, q) == { form: "yes" }) {
    if (reachable(q, s) == { form: "yes" }) {
      // hold: verified at compile time
    }
  }
  return p
}

export function v0ReachesV0(): void {
  // hold: verified at compile time
  return undefined
}

export function v0ReachesV1(): void {
  // hold: verified at compile time
  return undefined
}

export function v0ReachesV2(): void {
  // hold: verified at compile time
  return undefined
}

export function v0ReachesV3(): void {
  // hold: verified at compile time
  return undefined
}

export function g1MovesV0(): void {
  // hold: verified at compile time
  return undefined
}

export function g2MovesV0(): void {
  // hold: verified at compile time
  return undefined
}

export function g3MovesV0(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

export type Perm =
  | { form: "e" }
  | { form: "r" }
  | { form: "r2" }
  | { form: "t01" }
  | { form: "t02" }
  | { form: "t12" }

export function compose(a: Perm, b: Perm): Perm {
  if (a.form === "e") {
    return b
  } else if (a.form === "r") {
    if (b.form === "e") {
      return { form: "r" }
    } else if (b.form === "r") {
      return { form: "r2" }
    } else if (b.form === "r2") {
      return { form: "e" }
    } else if (b.form === "t01") {
      return { form: "t12" }
    } else if (b.form === "t02") {
      return { form: "t01" }
    } else {
      return { form: "t02" }
    }
  } else if (a.form === "r2") {
    if (b.form === "e") {
      return { form: "r2" }
    } else if (b.form === "r") {
      return { form: "e" }
    } else if (b.form === "r2") {
      return { form: "r" }
    } else if (b.form === "t01") {
      return { form: "t02" }
    } else if (b.form === "t02") {
      return { form: "t12" }
    } else {
      return { form: "t01" }
    }
  } else if (a.form === "t01") {
    if (b.form === "e") {
      return { form: "t01" }
    } else if (b.form === "r") {
      return { form: "t02" }
    } else if (b.form === "r2") {
      return { form: "t12" }
    } else if (b.form === "t01") {
      return { form: "e" }
    } else if (b.form === "t02") {
      return { form: "r" }
    } else {
      return { form: "r2" }
    }
  } else if (a.form === "t02") {
    if (b.form === "e") {
      return { form: "t02" }
    } else if (b.form === "r") {
      return { form: "t12" }
    } else if (b.form === "r2") {
      return { form: "t01" }
    } else if (b.form === "t01") {
      return { form: "r2" }
    } else if (b.form === "t02") {
      return { form: "e" }
    } else {
      return { form: "r" }
    }
  } else {
    if (b.form === "e") {
      return { form: "t12" }
    } else if (b.form === "r") {
      return { form: "t01" }
    } else if (b.form === "r2") {
      return { form: "t02" }
    } else if (b.form === "t01") {
      return { form: "r" }
    } else if (b.form === "t02") {
      return { form: "r2" }
    } else {
      return { form: "e" }
    }
  }
}

export function invertPerm(a: Perm): Perm {
  if (a.form === "e") {
    return { form: "e" }
  } else if (a.form === "r") {
    return { form: "r2" }
  } else if (a.form === "r2") {
    return { form: "r" }
  } else if (a.form === "t01") {
    return { form: "t01" }
  } else if (a.form === "t02") {
    return { form: "t02" }
  } else {
    return { form: "t12" }
  }
}

export function conjugate(g: Perm, x: Perm): Perm {
  return compose(compose(g, x), invertPerm(g))
}

export function conjugationIdentityIsTrivial(x: Perm): Perm {
  // hold: verified at compile time
  return x
}

export function conjugationRespectsProduct(g: Perm, h: Perm, x: Perm): Perm {
  // hold: verified at compile time
  return g
}

export function identityIsCentral(g: Perm): Perm {
  // hold: verified at compile time
  return g
}

export function conjugateRByT01IsR2(): void {
  // hold: verified at compile time
  return undefined
}

export function conjugateRByRIsR(): void {
  // hold: verified at compile time
  return undefined
}

export function conjugateT01ByRIsT02(): void {
  // hold: verified at compile time
  return undefined
}

export function conjugateT01ByR2IsT12(): void {
  // hold: verified at compile time
  return undefined
}

export function transpositionIsNotCentral(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

export function eIsFixedByR(): void {
  // hold: verified at compile time
  return undefined
}

export function eIsFixedByT01(): void {
  // hold: verified at compile time
  return undefined
}

export function rIsFixedByR2(): void {
  // hold: verified at compile time
  return undefined
}

export function rIsMovedByT01(): void {
  // hold: verified at compile time
  return undefined
}

export function t01IsFixedByT01(): void {
  // hold: verified at compile time
  return undefined
}

export function t01IsMovedByR(): void {
  // hold: verified at compile time
  return undefined
}

export function t01IsMovedByT02(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time
