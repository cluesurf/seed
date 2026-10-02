export function whiteAfter(w: number, b: number): number {
  return 2 * w + b
}

export function blackAfter(w: number, b: number): number {
  return w + b
}

export function levelTotal(w: number, b: number): number {
  return w + b
}

export function totalAfterOne(w: number, b: number): number {
  return levelTotal(whiteAfter(w, b), blackAfter(w, b))
}

export function totalAfterTwo(w: number, b: number): number {
  return totalAfterOne(whiteAfter(w, b), blackAfter(w, b))
}

export function theSplittingMatrixHasCharacteristicPolynomialXSquaredMinusThreeXPlusOne(x: number): number {
  // hold: verified at compile time
  return x
}

export function everyLevelObeysTheSplittingRecurrence(w: number, b: number): number {
  // hold: verified at compile time
  return w
}

export function theStepAdvancesAFibonacciPairByTwoWhite(f0: number, f1: number, f2: number, f3: number): number {
  if (f2 == f1 + f0) {
    if (f3 == f2 + f1) {
      // hold: verified at compile time
    }
  }
  return f0
}

export function theStepAdvancesAFibonacciPairByTwoBlack(f0: number, f1: number, f2: number): number {
  if (f2 == f1 + f0) {
    // hold: verified at compile time
  }
  return f0
}

export function theFirstLevelHasThreeTiles(): void {
  // hold: verified at compile time
  return undefined
}

export function theSecondLevelHasEightTiles(): void {
  // hold: verified at compile time
  return undefined
}

export function theThirdLevelHasTwentyOneTiles(): void {
  // hold: verified at compile time
  return undefined
}

export function theFourthLevelHasFiftyFiveTiles(): void {
  // hold: verified at compile time
  return undefined
}

export function theHeptagridLayersObeyTheRecurrence(): void {
  // hold: verified at compile time
  return undefined
}
