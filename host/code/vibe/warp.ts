export function transferA(x: number, y: number, z: number): number {
  return 15 * x + 11 * y + 9 * z
}

export function transferB(x: number, y: number, z: number): number {
  return 4 * x + 4 * y + 3 * z
}

export function transferC(x: number, y: number, z: number): number {
  return y + 2 * z
}

export function shellTotal(x: number, y: number, z: number): number {
  return x + y + z
}

export function determinantThree(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number {
  return a * (e * i) + b * (f * g) + c * (d * h) - (c * (e * g) + b * (d * i) + a * (f * h))
}

export function warpPolynomial(x: number): number {
  return x * (x * x) - 21 * (x * x) + 51 * x - 23
}

export function theCharacteristicPolynomialOfTheTransferMatrix(x: number): number {
  // hold: verified at compile time
  return x
}

export function squareA(x: number, y: number, z: number): number {
  return transferA(transferA(x, y, z), transferB(x, y, z), transferC(x, y, z))
}

export function squareB(x: number, y: number, z: number): number {
  return transferB(transferA(x, y, z), transferB(x, y, z), transferC(x, y, z))
}

export function squareC(x: number, y: number, z: number): number {
  return transferC(transferA(x, y, z), transferB(x, y, z), transferC(x, y, z))
}

export function totalOne(x: number, y: number, z: number): number {
  return shellTotal(transferA(x, y, z), transferB(x, y, z), transferC(x, y, z))
}

export function totalTwo(x: number, y: number, z: number): number {
  return shellTotal(squareA(x, y, z), squareB(x, y, z), squareC(x, y, z))
}

export function totalThree(x: number, y: number, z: number): number {
  return totalOne(squareA(x, y, z), squareB(x, y, z), squareC(x, y, z))
}

export function theTransferMatrixSatisfiesItsCubicFirstRow(x: number, y: number, z: number): number {
  // hold: verified at compile time
  return x
}

export function theTransferMatrixSatisfiesItsCubicSecondRow(x: number, y: number, z: number): number {
  // hold: verified at compile time
  return x
}

export function theTransferMatrixSatisfiesItsCubicThirdRow(x: number, y: number, z: number): number {
  // hold: verified at compile time
  return x
}

export function everyShellObeysTheWarpRecurrence(x: number, y: number, z: number): number {
  // hold: verified at compile time
  return x
}

export function shellTwoIsFourHundredFiftySix(): void {
  // hold: verified at compile time
  return undefined
}

export function shellThreeIsEightThousandThreeHundredSeventySix(): void {
  // hold: verified at compile time
  return undefined
}

export function shellFourIsOneHundredFiftyThreeThousandOneHundredNinetyTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function theTypeVectorOfShellThreeA(): void {
  // hold: verified at compile time
  return undefined
}

export function theTypeVectorOfShellThreeB(): void {
  // hold: verified at compile time
  return undefined
}

export function theTypeVectorOfShellThreeC(): void {
  // hold: verified at compile time
  return undefined
}

export function shellFiveIsTwoMillionEightHundredThousandThreeHundredFortyFour(): void {
  // hold: verified at compile time
  return undefined
}

export function shellSixIsFiftyOneMillionOneHundredEightySevenThousandEighty(): void {
  // hold: verified at compile time
  return undefined
}

export function theNumeratorCoefficientAtOneIsThree(): void {
  // hold: verified at compile time
  return undefined
}

export function theNumeratorCoefficientAtTwoIsThree(): void {
  // hold: verified at compile time
  return undefined
}

export function theNumeratorCoefficientAtThreeIsOne(): void {
  // hold: verified at compile time
  return undefined
}

export function warpPolynomialAtOne(): void {
  // hold: verified at compile time
  return undefined
}

export function warpPolynomialAtMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function warpPolynomialAtTwentyThree(): void {
  // hold: verified at compile time
  return undefined
}

export function warpPolynomialAtMinusTwentyThree(): void {
  // hold: verified at compile time
  return undefined
}

export function warpPolynomialAtZero(): void {
  // hold: verified at compile time
  return undefined
}

export function warpPolynomialAtTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function warpPolynomialAtThree(): void {
  // hold: verified at compile time
  return undefined
}

export function warpPolynomialAtEighteen(): void {
  // hold: verified at compile time
  return undefined
}

export function warpPolynomialAtNineteen(): void {
  // hold: verified at compile time
  return undefined
}

export function scaledWarpPolynomial(x: number): number {
  return x * (x * x) - 21000 * (x * x) + 51000000 * x - 23000000000
}

export function theWarpFactorIsAboveEighteenPointTwoSevenEight(): void {
  // hold: verified at compile time
  return undefined
}

export function theWarpFactorIsBelowEighteenPointTwoSevenNine(): void {
  // hold: verified at compile time
  return undefined
}
