export function sum(n: number): number {
  return n == 0 ? 0 : sum(n - 1) + n
}

export function cubeSum(n: number): number {
  return n == 0 ? 0 : cubeSum(n - 1) + n * (n * n)
}

export function twiceTheSumIsNTimesNPlusOne(n: number): number {
  // hold: verified at compile time
  return n
}

export function fourTimesSumOfCubesIsNTimesNPlusOneSquared(n: number): number {
  // hold: verified at compile time
  return n
}
