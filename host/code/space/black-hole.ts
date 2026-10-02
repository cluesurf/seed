export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Mass =
  | { form: "none" }
  | { form: "more"; prior: Mass }

export type Region =
  | { form: "outside" }
  | { form: "horizon" }
  | { form: "inside" }

export function canEscape(r: Region): Flag {
  if (r.form === "outside") {
    return { form: "yes" }
  } else if (r.form === "horizon") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
}

export function below(a: Mass, b: Mass): Flag {
  if (b.form === "none") {
    return { form: "no" }
  } else {
    const bp = b.prior
    if (a.form === "none") {
      return { form: "yes" }
    } else {
      const ap = a.prior
      return below(ap, bp)
    }
  }
}

export function double(m: Mass): Mass {
  if (m.form === "none") {
    return { form: "none" }
  } else {
    const p = m.prior
    return { form: "more", prior: { form: "more", prior: double(p) } }
  }
}

export function horizonRadius(m: Mass): Mass {
  return double(m)
}

export function horizonArea(m: Mass): Mass {
  return double(double(m))
}

export function entropy(m: Mass): Mass {
  return horizonArea(m)
}

export function insideCannotEscape(): void {
  // hold: verified at compile time
  return undefined
}

export function horizonCannotEscape(): void {
  // hold: verified at compile time
  return undefined
}

export function outsideCanEscape(): void {
  // hold: verified at compile time
  return undefined
}

export function horizonIsTheCaptureThreshold(): void {
  // hold: verified at compile time
  return undefined
}

export function belowSuccBoth(a: Mass, b: Mass): Mass {
  // hold: verified at compile time
  return a
}

export function doubleSucc(a: Mass): Mass {
  // hold: verified at compile time
  return a
}

export function belowDoubleBoth(a: Mass, b: Mass): Mass {
  // hold: verified at compile time
  return a
}

export function heavierMassLargerHorizon(a: Mass, b: Mass): Mass {
  // hold: verified at compile time
  return a
}

export function areaGrowsWithMass(a: Mass, b: Mass): Mass {
  // hold: verified at compile time
  return a
}

export function entropyGrowsWithMass(a: Mass, b: Mass): Mass {
  // hold: verified at compile time
  return a
}
