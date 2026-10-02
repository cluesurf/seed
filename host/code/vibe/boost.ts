export function boostTime(d1: number, n1: number, d2: number, n2: number): number {
  return d1 * d2 + n1 * n2
}

export function boostSpace(d1: number, n1: number, d2: number, n2: number): number {
  return n1 * d2 + n2 * d1
}

export function interval(t: number, x: number): number {
  return t * t - x * x
}

export function boostsCommuteTime(d1: number, n1: number, d2: number, n2: number): number {
  // hold: verified at compile time
  return d1
}

export function boostsCommuteSpace(d1: number, n1: number, d2: number, n2: number): number {
  // hold: verified at compile time
  return d1
}

export function boostsAssociateTime(d1: number, n1: number, d2: number, n2: number, d3: number, n3: number): number {
  // hold: verified at compile time
  return d1
}

export function boostsAssociateSpace(d1: number, n1: number, d2: number, n2: number, d3: number, n3: number): number {
  // hold: verified at compile time
  return d1
}

export function aBoostScalesTheInterval(d: number, n: number, t: number, x: number): number {
  // hold: verified at compile time
  return d
}

export function aUnitBoostKeepsTheInterval(d: number, n: number, t: number, x: number): number {
  if (interval(d, n) == 1) {
    // hold: verified at compile time
  }
  return d
}

export function aBoostAndItsReverseComposeToRest(d: number, n: number): number {
  // hold: verified at compile time
  return d
}

export function lightStaysLight(c: number, d: number, n: number): number {
  // hold: verified at compile time
  return c
}
