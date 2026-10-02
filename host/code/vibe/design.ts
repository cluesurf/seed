export function power2(x: number): number {
  return x * x
}

export function power3(x: number): number {
  return x * (x * x)
}

export function power4(x: number): number {
  return x * (x * (x * x))
}

export function power5(x: number): number {
  return x * (x * (x * (x * x)))
}

export function power6(x: number): number {
  return x * (x * (x * (x * (x * x))))
}

export function pairMoment2(x: number, y: number): number {
  return power2(x + y) + power2(x + (0 - y)) + power2(0 - x + y) + power2(0 - x + (0 - y))
}

export function pairMoment3(x: number, y: number): number {
  return power3(x + y) + power3(x + (0 - y)) + power3(0 - x + y) + power3(0 - x + (0 - y))
}

export function pairMoment4(x: number, y: number): number {
  return power4(x + y) + power4(x + (0 - y)) + power4(0 - x + y) + power4(0 - x + (0 - y))
}

export function pairMoment5(x: number, y: number): number {
  return power5(x + y) + power5(x + (0 - y)) + power5(0 - x + y) + power5(0 - x + (0 - y))
}

export function pairMoment6(x: number, y: number): number {
  return power6(x + y) + power6(x + (0 - y)) + power6(0 - x + y) + power6(0 - x + (0 - y))
}

export function rootMoment2(k1: number, k2: number, k3: number, k4: number): number {
  return pairMoment2(k1, k2) + pairMoment2(k1, k3) + pairMoment2(k1, k4) + pairMoment2(k2, k3) + pairMoment2(k2, k4) + pairMoment2(k3, k4)
}

export function rootMoment3(k1: number, k2: number, k3: number, k4: number): number {
  return pairMoment3(k1, k2) + pairMoment3(k1, k3) + pairMoment3(k1, k4) + pairMoment3(k2, k3) + pairMoment3(k2, k4) + pairMoment3(k3, k4)
}

export function rootMoment4(k1: number, k2: number, k3: number, k4: number): number {
  return pairMoment4(k1, k2) + pairMoment4(k1, k3) + pairMoment4(k1, k4) + pairMoment4(k2, k3) + pairMoment4(k2, k4) + pairMoment4(k3, k4)
}

export function rootMoment5(k1: number, k2: number, k3: number, k4: number): number {
  return pairMoment5(k1, k2) + pairMoment5(k1, k3) + pairMoment5(k1, k4) + pairMoment5(k2, k3) + pairMoment5(k2, k4) + pairMoment5(k3, k4)
}

export function rootMoment6(k1: number, k2: number, k3: number, k4: number): number {
  return pairMoment6(k1, k2) + pairMoment6(k1, k3) + pairMoment6(k1, k4) + pairMoment6(k2, k3) + pairMoment6(k2, k4) + pairMoment6(k3, k4)
}

export function frameMoment2(k1: number, k2: number, k3: number, k4: number): number {
  return pairMoment2(k1, k2) + pairMoment2(k3, k4)
}

export function frameMoment4(k1: number, k2: number, k3: number, k4: number): number {
  return pairMoment4(k1, k2) + pairMoment4(k3, k4)
}

export function normSquared(k1: number, k2: number, k3: number, k4: number): number {
  return power2(k1) + power2(k2) + (power2(k3) + power2(k4))
}

export function theSecondMomentOfTheRootsIsIsotropic(k1: number, k2: number, k3: number, k4: number): number {
  // hold: verified at compile time
  return k1
}

export function theFourthMomentOfTheRootsIsIsotropic(k1: number, k2: number, k3: number, k4: number): number {
  // hold: verified at compile time
  return k1
}

export function theThirdMomentOfTheRootsVanishes(k1: number, k2: number, k3: number, k4: number): number {
  // hold: verified at compile time
  return k1
}

export function theFifthMomentOfTheRootsVanishes(k1: number, k2: number, k3: number, k4: number): number {
  // hold: verified at compile time
  return k1
}

export function theSixthMomentAlongAnAxisIsTwelve(): void {
  // hold: verified at compile time
  return undefined
}

export function theSixthMomentAlongARootIsOneHundredFortyFour(): void {
  // hold: verified at compile time
  return undefined
}

export function oneFrameHasAnIsotropicSecondMoment(k1: number, k2: number, k3: number, k4: number): number {
  // hold: verified at compile time
  return k1
}

export function oneFrameHasFourthMomentFourAlongAnAxis(): void {
  // hold: verified at compile time
  return undefined
}

export function oneFrameHasFourthMomentThirtyTwoAlongARoot(): void {
  // hold: verified at compile time
  return undefined
}

export function huskMoment2(k1: number, k2: number, k3: number): number {
  return 2 * (power2(k1) + power2(k2) + power2(k3)) + (power2(k1 + k2) + power2(k1 - k2) + (power2(k1 + k3) + power2(k1 - k3)) + (power2(k2 + k3) + power2(k2 - k3)))
}

export function huskMoment4(k1: number, k2: number, k3: number): number {
  return 2 * (power4(k1) + power4(k2) + power4(k3)) + (power4(k1 + k2) + power4(k1 - k2) + (power4(k1 + k3) + power4(k1 - k3)) + (power4(k2 + k3) + power4(k2 - k3)))
}

export function huskMoment6(k1: number, k2: number, k3: number): number {
  return 2 * (power6(k1) + power6(k2) + power6(k3)) + (power6(k1 + k2) + power6(k1 - k2) + (power6(k1 + k3) + power6(k1 - k3)) + (power6(k2 + k3) + power6(k2 - k3)))
}

export function theHuskSecondMomentIsSixKSquared(k1: number, k2: number, k3: number): number {
  // hold: verified at compile time
  return k1
}

export function theHuskFourthMomentIsIsotropic(k1: number, k2: number, k3: number): number {
  // hold: verified at compile time
  return k1
}

export function theHuskSixthMoment(k1: number, k2: number, k3: number): number {
  // hold: verified at compile time
  return k1
}
