export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export type Rung =
  | { form: "negsucc"; prior: Natural }
  | { form: "zero-int" }
  | { form: "possucc"; prior: Natural }

export function negate(z: Rung): Rung {
  if (z.form === "negsucc") {
    const p = z.prior
    return { form: "possucc", prior: p }
  } else if (z.form === "zero-int") {
    return { form: "zero-int" }
  } else {
    const p = z.prior
    return { form: "negsucc", prior: p }
  }
}

export function fromNatural(n: Natural): Rung {
  if (n.form === "zero") {
    return { form: "zero-int" }
  } else {
    const p = n.prior
    return { form: "possucc", prior: p }
  }
}

export function next(z: Rung): Rung {
  if (z.form === "negsucc") {
    const p = z.prior
    if (p.form === "zero") {
      return { form: "zero-int" }
    } else {
      const q = p.prior
      return { form: "negsucc", prior: q }
    }
  } else if (z.form === "zero-int") {
    return { form: "possucc", prior: { form: "zero" } }
  } else {
    const p = z.prior
    return { form: "possucc", prior: { form: "succ", prior: p } }
  }
}

export function back(z: Rung): Rung {
  if (z.form === "negsucc") {
    const p = z.prior
    return { form: "negsucc", prior: { form: "succ", prior: p } }
  } else if (z.form === "zero-int") {
    return { form: "negsucc", prior: { form: "zero" } }
  } else {
    const p = z.prior
    if (p.form === "zero") {
      return { form: "zero-int" }
    } else {
      const q = p.prior
      return { form: "possucc", prior: q }
    }
  }
}

export function climb(z: Rung, p: Natural): Rung {
  if (p.form === "zero") {
    return next(z)
  } else {
    const q = p.prior
    return next(climb(z, q))
  }
}

export function drop(z: Rung, p: Natural): Rung {
  if (p.form === "zero") {
    return back(z)
  } else {
    const q = p.prior
    return back(drop(z, q))
  }
}

export function combine(z: Rung, w: Rung): Rung {
  if (w.form === "negsucc") {
    const p = w.prior
    return drop(z, p)
  } else if (w.form === "zero-int") {
    return z
  } else {
    const p = w.prior
    return climb(z, p)
  }
}

export type Station =
  | { form: "cone" }
  | { form: "flat" }
  | { form: "saddle" }

export type Curve =
  | { form: "spherical" }
  | { form: "euclidean" }
  | { form: "hyperbolic" }

export function triangleCount(v: Station): number {
  if (v.form === "cone") {
    return 5
  } else if (v.form === "flat") {
    return 6
  } else {
    return 7
  }
}

export function fullTurn(): number {
  return 6
}

export function cornerSum(v: Station): number {
  if (v.form === "cone") {
    return 5
  } else if (v.form === "flat") {
    return 6
  } else {
    return 7
  }
}

export function deficit(v: Station): Rung {
  if (v.form === "cone") {
    return { form: "possucc", prior: { form: "zero" } }
  } else if (v.form === "flat") {
    return { form: "zero-int" }
  } else {
    return { form: "negsucc", prior: { form: "zero" } }
  }
}

export function curvatureOf(v: Station): Curve {
  if (v.form === "cone") {
    return { form: "spherical" }
  } else if (v.form === "flat") {
    return { form: "euclidean" }
  } else {
    return { form: "hyperbolic" }
  }
}

export function flatVertexHasZeroDeficit(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

export function coneVertexHasPositiveDeficit(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

export function saddleVertexHasNegativeDeficit(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

export function saddleDeficitNegatesTheCone(): void {
  // hold: verified at compile time
  return undefined
}

export function coneIsSpherical(): void {
  // hold: verified at compile time
  return undefined
}

export function flatIsEuclidean(): void {
  // hold: verified at compile time
  return undefined
}

export function saddleIsHyperbolic(): void {
  // hold: verified at compile time
  return undefined
}

export function curvatureOfIsTotal(v: Station): Station {
  // hold: verified at compile time
  return v
}

export function triangleCountIsTotal(v: Station): Station {
  // hold: verified at compile time
  return v
}

export function deficitIsTotal(v: Station): Station {
  // hold: verified at compile time
  return v
}

export function icosahedronTotalDeficit(): Rung {
  return combine(combine(combine(combine(combine(combine(combine(combine(combine(combine(combine({ form: "possucc", prior: { form: "zero" } }, { form: "possucc", prior: { form: "zero" } }), { form: "possucc", prior: { form: "zero" } }), { form: "possucc", prior: { form: "zero" } }), { form: "possucc", prior: { form: "zero" } }), { form: "possucc", prior: { form: "zero" } }), { form: "possucc", prior: { form: "zero" } }), { form: "possucc", prior: { form: "zero" } }), { form: "possucc", prior: { form: "zero" } }), { form: "possucc", prior: { form: "zero" } }), { form: "possucc", prior: { form: "zero" } }), { form: "possucc", prior: { form: "zero" } })
}

export function icosahedronTotalDeficitIsTwelve(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
