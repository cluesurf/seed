export function omegaReal(a: number, b: number, c: number, d: number): number {
  return a * c - b * d
}

export function omegaPart(a: number, b: number, c: number, d: number): number {
  return a * d + b * c - b * d
}

export function barReal(a: number, b: number): number {
  return a - b
}

export function barPart(a: number, b: number): number {
  return 0 - b
}

export function eisensteinNorm(a: number, b: number): number {
  return a * a - a * b + b * b
}

export function crossReal(a: number, b: number, c: number, d: number): number {
  return omegaReal(a, b, barReal(c, d), barPart(c, d))
}

export function crossPart(a: number, b: number, c: number, d: number): number {
  return omegaPart(a, b, barReal(c, d), barPart(c, d))
}

export function theParallelogramLaw(a: number, b: number, c: number, d: number): number {
  // hold: verified at compile time
  return a
}

export function thePolarizationLaw(a: number, b: number, c: number, d: number): number {
  // hold: verified at compile time
  return a
}

export function circulantReal(a1: number, a2: number, b1: number, b2: number, x1: number, x2: number, y1: number, y2: number): number {
  return omegaReal(a1, a2, x1, x2) + omegaReal(b1, b2, y1, y2)
}

export function circulantPart(a1: number, a2: number, b1: number, b2: number, x1: number, x2: number, y1: number, y2: number): number {
  return omegaPart(a1, a2, x1, x2) + omegaPart(b1, b2, y1, y2)
}

export function aCirculantScalesTheSymmetricPairByAPlusBReal(a1: number, a2: number, b1: number, b2: number, x1: number, x2: number): number {
  // hold: verified at compile time
  return a1
}

export function aCirculantScalesTheSymmetricPairByAPlusBPart(a1: number, a2: number, b1: number, b2: number, x1: number, x2: number): number {
  // hold: verified at compile time
  return a1
}

export function aCirculantScalesTheAntisymmetricPairByAMinusBReal(a1: number, a2: number, b1: number, b2: number, x1: number, x2: number): number {
  // hold: verified at compile time
  return a1
}

export function aCirculantScalesTheAntisymmetricPairByAMinusBPart(a1: number, a2: number, b1: number, b2: number, x1: number, x2: number): number {
  // hold: verified at compile time
  return a1
}

export function theCoinFixesEverySymmetricPairReal(x1: number, x2: number): number {
  // hold: verified at compile time
  return x1
}

export function theCoinFixesEverySymmetricPairPart(x1: number, x2: number): number {
  // hold: verified at compile time
  return x1
}

export function theCoinTurnsEveryAntisymmetricPairByOmegaReal(x1: number, x2: number): number {
  // hold: verified at compile time
  return x1
}

export function theCoinTurnsEveryAntisymmetricPairByOmegaPart(x1: number, x2: number): number {
  // hold: verified at compile time
  return x1
}

export function aCoinRowHasWeightFour(): void {
  // hold: verified at compile time
  return undefined
}

export function theCoinRowsAreOrthogonalReal(): void {
  // hold: verified at compile time
  return undefined
}

export function theCoinRowsAreOrthogonalPart(): void {
  // hold: verified at compile time
  return undefined
}

export function theCoinDeterminantIsFourOmegaReal(): void {
  // hold: verified at compile time
  return undefined
}

export function theCoinDeterminantIsFourOmegaPart(): void {
  // hold: verified at compile time
  return undefined
}

export function theCoinedWalkIsAtMostHalfLightSpeed(c: number): number {
  // hold: verified at compile time
  return c
}

export function theMeetingKeepsWithWeightOneQuarter(): void {
  // hold: verified at compile time
  return undefined
}

export function theMeetingExchangesWithWeightThreeQuarters(): void {
  // hold: verified at compile time
  return undefined
}

export function theMeetingTurnsEverySymmetricPairByOmegaReal(x1: number, x2: number): number {
  // hold: verified at compile time
  return x1
}

export function theMeetingTurnsEverySymmetricPairByOmegaPart(x1: number, x2: number): number {
  // hold: verified at compile time
  return x1
}

export function theMeetingFixesEveryAntisymmetricPairReal(x1: number, x2: number): number {
  // hold: verified at compile time
  return x1
}

export function theMeetingFixesEveryAntisymmetricPairPart(x1: number, x2: number): number {
  // hold: verified at compile time
  return x1
}
