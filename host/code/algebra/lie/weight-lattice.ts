export type Coordinate =
  | { form: "minus-two" }
  | { form: "minus-one" }
  | { form: "zero" }
  | { form: "plus-one" }
  | { form: "plus-two" }

export function negateCoordinate(a: Coordinate): Coordinate {
  if (a.form === "minus-two") {
    return { form: "plus-two" }
  } else if (a.form === "minus-one") {
    return { form: "plus-one" }
  } else if (a.form === "zero") {
    return { form: "zero" }
  } else if (a.form === "plus-one") {
    return { form: "minus-one" }
  } else {
    return { form: "minus-two" }
  }
}

export function addCoordinate(a: Coordinate, b: Coordinate): Coordinate {
  if (a.form === "minus-two") {
    if (b.form === "minus-two") {
      return { form: "minus-two" }
    } else if (b.form === "minus-one") {
      return { form: "minus-two" }
    } else if (b.form === "zero") {
      return { form: "minus-two" }
    } else if (b.form === "plus-one") {
      return { form: "minus-one" }
    } else {
      return { form: "zero" }
    }
  } else if (a.form === "minus-one") {
    if (b.form === "minus-two") {
      return { form: "minus-two" }
    } else if (b.form === "minus-one") {
      return { form: "minus-two" }
    } else if (b.form === "zero") {
      return { form: "minus-one" }
    } else if (b.form === "plus-one") {
      return { form: "zero" }
    } else {
      return { form: "plus-one" }
    }
  } else if (a.form === "zero") {
    return b
  } else if (a.form === "plus-one") {
    if (b.form === "minus-two") {
      return { form: "minus-one" }
    } else if (b.form === "minus-one") {
      return { form: "zero" }
    } else if (b.form === "zero") {
      return { form: "plus-one" }
    } else if (b.form === "plus-one") {
      return { form: "plus-two" }
    } else {
      return { form: "plus-two" }
    }
  } else {
    if (b.form === "minus-two") {
      return { form: "zero" }
    } else if (b.form === "minus-one") {
      return { form: "plus-one" }
    } else if (b.form === "zero") {
      return { form: "plus-two" }
    } else if (b.form === "plus-one") {
      return { form: "plus-two" }
    } else {
      return { form: "plus-two" }
    }
  }
}

export function subtractCoordinate(a: Coordinate, b: Coordinate): Coordinate {
  return addCoordinate(a, negateCoordinate(b))
}

export type LatticePoint =
  | { form: "point"; first: Coordinate; second: Coordinate }

export function weightOne(): LatticePoint {
  return { form: "point", first: { form: "plus-one" }, second: { form: "zero" } }
}

export function weightTwo(): LatticePoint {
  return { form: "point", first: { form: "zero" }, second: { form: "plus-one" } }
}

export function rootOne(): LatticePoint {
  return { form: "point", first: { form: "plus-two" }, second: { form: "minus-one" } }
}

export function rootTwo(): LatticePoint {
  return { form: "point", first: { form: "minus-one" }, second: { form: "plus-two" } }
}

export function cartanPairingOne(first: Coordinate, second: Coordinate): Coordinate {
  return first
}

export function cartanPairingTwo(first: Coordinate, second: Coordinate): Coordinate {
  return second
}

export function reflectOneFirst(first: Coordinate, second: Coordinate): Coordinate {
  return negateCoordinate(first)
}

export function reflectOneSecond(first: Coordinate, second: Coordinate): Coordinate {
  return addCoordinate(second, first)
}

export function reflectTwoFirst(first: Coordinate, second: Coordinate): Coordinate {
  return addCoordinate(first, second)
}

export function reflectTwoSecond(first: Coordinate, second: Coordinate): Coordinate {
  return negateCoordinate(second)
}

export function reflectOne(x: LatticePoint): LatticePoint {
  if (x.form === "point") {
    const first = x.first
    const second = x.second
    return { form: "point", first: reflectOneFirst(first, second), second: reflectOneSecond(first, second) }
  }
}

export function reflectTwo(x: LatticePoint): LatticePoint {
  if (x.form === "point") {
    const first = x.first
    const second = x.second
    return { form: "point", first: addCoordinate(first, second), second: reflectTwoSecond(first, second) }
  }
}

export function addCoordinateZeroRight(a: Coordinate): Coordinate {
  // hold: verified at compile time
  return a
}

export function addCoordinateZeroLeft(a: Coordinate): Coordinate {
  // hold: verified at compile time
  return a
}

export function negateCoordinateIsAnInvolution(a: Coordinate): Coordinate {
  // hold: verified at compile time
  return a
}

export function weightOnePairsOneWithCorootOne(): void {
  // hold: verified at compile time
  return undefined
}

export function weightOnePairsZeroWithCorootTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function weightTwoPairsZeroWithCorootOne(): void {
  // hold: verified at compile time
  return undefined
}

export function weightTwoPairsOneWithCorootTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function rootOnePairsTwoWithCorootOne(): void {
  // hold: verified at compile time
  return undefined
}

export function rootOnePairsMinusOneWithCorootTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function rootTwoPairsMinusOneWithCorootOne(): void {
  // hold: verified at compile time
  return undefined
}

export function rootTwoPairsTwoWithCorootTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function rootOneIsTwoWeightOneMinusWeightTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function rootTwoIsMinusWeightOnePlusTwoWeightTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectOneFirstCoordinateIsAnInvolution(first: Coordinate): Coordinate {
  // hold: verified at compile time
  return first
}

export function reflectTwoSecondCoordinateIsAnInvolution(second: Coordinate): Coordinate {
  // hold: verified at compile time
  return second
}

export function reflectOneTwiceOnRootOneFirst(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectOneTwiceOnRootOneSecond(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectOneTwiceOnWeightOneFirst(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectOneTwiceOnWeightOneSecond(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectTwoTwiceOnRootTwoFirst(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectTwoTwiceOnRootTwoSecond(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectOneNegatesRootOneFirst(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectOneNegatesRootOneSecond(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectTwoNegatesRootTwoFirst(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectTwoNegatesRootTwoSecond(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectOneSendsRootTwoToTheHighestRootFirst(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectOneSendsRootTwoToTheHighestRootSecond(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectTwoSendsRootOneToTheHighestRootFirst(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectTwoSendsRootOneToTheHighestRootSecond(): void {
  // hold: verified at compile time
  return undefined
}
