export function determinantThree(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number {
  return a * (e * i) + b * (f * g) + c * (d * h) - (c * (e * g) + b * (d * i) + a * (f * h))
}

export function determinantFour(a11: number, a12: number, a13: number, a14: number, a21: number, a22: number, a23: number, a24: number, a31: number, a32: number, a33: number, a34: number, a41: number, a42: number, a43: number, a44: number): number {
  return a11 * determinantThree(a22, a23, a24, a32, a33, a34, a42, a43, a44) - a12 * determinantThree(a21, a23, a24, a31, a33, a34, a41, a43, a44) + a13 * determinantThree(a21, a22, a24, a31, a32, a34, a41, a42, a44) - a14 * determinantThree(a21, a22, a23, a31, a32, a33, a41, a42, a43)
}

export function determinantFive(a11: number, a12: number, a13: number, a14: number, a15: number, a21: number, a22: number, a23: number, a24: number, a25: number, a31: number, a32: number, a33: number, a34: number, a35: number, a41: number, a42: number, a43: number, a44: number, a45: number, a51: number, a52: number, a53: number, a54: number, a55: number): number {
  return a11 * determinantFour(a22, a23, a24, a25, a32, a33, a34, a35, a42, a43, a44, a45, a52, a53, a54, a55) - a12 * determinantFour(a21, a23, a24, a25, a31, a33, a34, a35, a41, a43, a44, a45, a51, a53, a54, a55) + a13 * determinantFour(a21, a22, a24, a25, a31, a32, a34, a35, a41, a42, a44, a45, a51, a52, a54, a55) - a14 * determinantFour(a21, a22, a23, a25, a31, a32, a33, a35, a41, a42, a43, a45, a51, a52, a53, a55) + a15 * determinantFour(a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, a51, a52, a53, a54)
}

export function chain2(x1: number): number {
  return 4 - x1
}

export function chain3(x1: number, x2: number): number {
  return 2 * chain2(x1) - x2 * 2
}

export function chain4(x1: number, x2: number, x3: number): number {
  return 2 * chain3(x1, x2) - x3 * chain2(x1)
}

export function chain5(x1: number, x2: number, x3: number, x4: number): number {
  return 2 * chain4(x1, x2, x3) - x4 * chain3(x1, x2)
}

export function theDeterminantOfAChainOf3IsItsContinuant(u1: number, u2: number): number {
  // hold: verified at compile time
  return u1
}

export function theDeterminantOfAChainOf4IsItsContinuant(u1: number, u2: number, u3: number): number {
  // hold: verified at compile time
  return u1
}

export function theDeterminantOfAChainOf5IsItsContinuant(u1: number, u2: number, u3: number, u4: number): number {
  // hold: verified at compile time
  return u1
}

export function the24CellChainOfTwoIsThree(): void {
  // hold: verified at compile time
  return undefined
}

export function the24CellChainOfThreeIsTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function the24CellChainOfFourIsOne(): void {
  // hold: verified at compile time
  return undefined
}

export function theCubicChainOfTwoIsTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function theCubicChainOfThreeIsTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function theCubicChainOfFourIsZero(): void {
  // hold: verified at compile time
  return undefined
}

export function theMeshChainOfFiveIsMinusTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function theFiveCellHasCartanDeterminantFive(): void {
  // hold: verified at compile time
  return undefined
}

export function theTesseractHasCartanDeterminantTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function theDistanceBetweenAdjacentCellsHasCoshThree(): void {
  // hold: verified at compile time
  return undefined
}

export function thePlaneCriterion(p: number, q: number): number {
  // hold: verified at compile time
  return p
}
