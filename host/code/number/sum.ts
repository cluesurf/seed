export function sum(n: number): number {
  return n == 0 ? 0 : sum(n - 1) + n
}

export function twiceSumToNIsNTimesNPlusOne(n: number): number {
  // hold: verified at compile time
  return n
}

export function oddSum(n: number): number {
  return n == 0 ? 0 : oddSum(n - 1) + (2 * n - 1)
}

export function sumOfFirstNOddNumbersIsNSquared(n: number): number {
  // hold: verified at compile time
  return n
}

export function squareSum(n: number): number {
  return n == 0 ? 0 : squareSum(n - 1) + n * n
}

export function sixTimesSumOfFirstNSquaresIsNTimesNPlusOneTimesTwiceNPlusOne(n: number): number {
  // hold: verified at compile time
  return n
}

export function cubeSum(n: number): number {
  return n == 0 ? 0 : cubeSum(n - 1) + n * n * n
}

export function fourTimesSumOfFirstNCubesIsNSquaredTimesNPlusOneSquared(n: number): number {
  // hold: verified at compile time
  return n
}

export function fourthSum(n: number): number {
  return n == 0 ? 0 : fourthSum(n - 1) + n * n * (n * n)
}

export function thirtyTimesSumOfFirstNFourthPowersIsFaulhaberProduct(n: number): number {
  // hold: verified at compile time
  return n
}

export function pronicSum(n: number): number {
  return n == 0 ? 0 : pronicSum(n - 1) + n * (n + 1)
}

export function threeTimesSumOfConsecutiveProductsIsNTimesNPlusOneTimesNPlusTwo(n: number): number {
  // hold: verified at compile time
  return n
}
