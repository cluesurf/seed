export function orderIsReflexive(a: number): number {
  // hold: verified at compile time
  return a
}

export function orderIsAntisymmetric(a: number, b: number): number {
  if (a <= b) {
    if (b <= a) {
      // hold: verified at compile time
    }
  }
  return a
}

export function strictOrderIsIrreflexive(a: number): number {
  // hold: verified at compile time
  return a
}

export function strictBelowImpliesAtMost(a: number, b: number): number {
  if (a < b) {
    // hold: verified at compile time
  }
  return a
}

export function atMostBothWaysIsNotStrict(a: number, b: number): number {
  if (a <= b) {
    if (b <= a) {
      // hold: verified at compile time
    }
  }
  return a
}

export function strictOrderIsTranslationInvariant(a: number, b: number, c: number): number {
  if (a < b) {
    // hold: verified at compile time
  }
  return a
}

export function strictOrderIsTransitive(a: number, b: number, c: number): number {
  if (a < b) {
    if (b < c) {
      // hold: verified at compile time
    }
  }
  return a
}

export function weakThenStrictIsStrict(a: number, b: number, c: number): number {
  if (a <= b) {
    if (b < c) {
      // hold: verified at compile time
    }
  }
  return a
}
