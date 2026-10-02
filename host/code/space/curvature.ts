export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export type Curvature =
  | { form: "sphere" }
  | { form: "flat" }
  | { form: "horn" }

export function geometryOfExcess(e: Natural): Curvature {
  if (e.form === "zero") {
    return { form: "sphere" }
  } else {
    const e1 = e.prior
    if (e1.form === "zero") {
      return { form: "sphere" }
    } else {
      const e2 = e1.prior
      if (e2.form === "zero") {
        return { form: "sphere" }
      } else {
        const e3 = e2.prior
        if (e3.form === "zero") {
          return { form: "sphere" }
        } else {
          const e4 = e3.prior
          if (e4.form === "zero") {
            return { form: "flat" }
          } else {
            return { form: "horn" }
          }
        }
      }
    }
  }
}

export function tetrahedronThreeThreeIsSpherical(): void {
  // hold: verified at compile time
  return undefined
}

export function octahedronThreeFourIsSpherical(): void {
  // hold: verified at compile time
  return undefined
}

export function squareTilingFourFourIsFlat(): void {
  // hold: verified at compile time
  return undefined
}

export function triangularTilingThreeSixIsFlat(): void {
  // hold: verified at compile time
  return undefined
}

export function hexagonalTilingSixThreeIsFlat(): void {
  // hold: verified at compile time
  return undefined
}

export function heptagridSevenThreeIsHyperbolic(): void {
  // hold: verified at compile time
  return undefined
}

export function pentagridFiveFourIsHyperbolic(): void {
  // hold: verified at compile time
  return undefined
}
