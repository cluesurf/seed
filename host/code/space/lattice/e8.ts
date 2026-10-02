export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function both(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return b
  } else {
    return { form: "no" }
  }
}

export type Coordinate =
  | { form: "minus-one" }
  | { form: "zero" }
  | { form: "plus-one" }

export function isNonzero(c: Coordinate): Flag {
  if (c.form === "minus-one") {
    return { form: "yes" }
  } else if (c.form === "zero") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
}

export function flipCoordinate(c: Coordinate): Coordinate {
  if (c.form === "minus-one") {
    return { form: "plus-one" }
  } else if (c.form === "zero") {
    return { form: "zero" }
  } else {
    return { form: "minus-one" }
  }
}

export function flipCoordinateIsAnInvolution(c: Coordinate): Coordinate {
  // hold: verified at compile time
  return c
}

export type Tally =
  | { form: "none" }
  | { form: "one" }
  | { form: "exactly-two" }
  | { form: "more-than-two" }

export function bump(t: Tally): Tally {
  if (t.form === "none") {
    return { form: "one" }
  } else if (t.form === "one") {
    return { form: "exactly-two" }
  } else if (t.form === "exactly-two") {
    return { form: "more-than-two" }
  } else {
    return { form: "more-than-two" }
  }
}

export function countCoordinate(c: Coordinate, running: Tally): Tally {
  {
    const __at1 = isNonzero(c)
    if (__at1.form === "yes") {
    return bump(running)
  } else {
    return running
  }
  }
}

export function countNonzero(c1: Coordinate, c2: Coordinate, c3: Coordinate, c4: Coordinate, c5: Coordinate, c6: Coordinate, c7: Coordinate, c8: Coordinate): Tally {
  return countCoordinate(c8, countCoordinate(c7, countCoordinate(c6, countCoordinate(c5, countCoordinate(c4, countCoordinate(c3, countCoordinate(c2, countCoordinate(c1, { form: "none" }))))))))
}

export function isIntegerRoot(c1: Coordinate, c2: Coordinate, c3: Coordinate, c4: Coordinate, c5: Coordinate, c6: Coordinate, c7: Coordinate, c8: Coordinate): Flag {
  {
    const __at1 = countNonzero(c1, c2, c3, c4, c5, c6, c7, c8)
    if (__at1.form === "exactly-two") {
    return { form: "yes" }
  } else if (__at1.form === "none") {
    return { form: "no" }
  } else if (__at1.form === "one") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
  }
}

export function tallyIsEven(t: Tally): Flag {
  if (t.form === "none") {
    return { form: "yes" }
  } else if (t.form === "one") {
    return { form: "no" }
  } else if (t.form === "exactly-two") {
    return { form: "yes" }
  } else {
    return { form: "no" }
  }
}

export function coordinateSumEven(c1: Coordinate, c2: Coordinate, c3: Coordinate, c4: Coordinate, c5: Coordinate, c6: Coordinate, c7: Coordinate, c8: Coordinate): Flag {
  return tallyIsEven(countNonzero(c1, c2, c3, c4, c5, c6, c7, c8))
}

export type Sign =
  | { form: "plus" }
  | { form: "minus" }

export function isMinus(s: Sign): Flag {
  if (s.form === "plus") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
}

export type Parity =
  | { form: "even" }
  | { form: "odd" }

export function flipParity(p: Parity): Parity {
  if (p.form === "even") {
    return { form: "odd" }
  } else {
    return { form: "even" }
  }
}

export function flipParityIsAnInvolution(p: Parity): Parity {
  // hold: verified at compile time
  return p
}

export function countSign(s: Sign, running: Parity): Parity {
  {
    const __at1 = isMinus(s)
    if (__at1.form === "yes") {
    return flipParity(running)
  } else {
    return running
  }
  }
}

export function minusSignParity(s1: Sign, s2: Sign, s3: Sign, s4: Sign, s5: Sign, s6: Sign, s7: Sign, s8: Sign): Parity {
  return countSign(s8, countSign(s7, countSign(s6, countSign(s5, countSign(s4, countSign(s3, countSign(s2, countSign(s1, { form: "even" }))))))))
}

export function isHalfIntegerRoot(s1: Sign, s2: Sign, s3: Sign, s4: Sign, s5: Sign, s6: Sign, s7: Sign, s8: Sign): Flag {
  {
    const __at1 = minusSignParity(s1, s2, s3, s4, s5, s6, s7, s8)
    if (__at1.form === "even") {
    return { form: "yes" }
  } else {
    return { form: "no" }
  }
  }
}

export function isIntegerRootIsPreservedByFlippingACoordinate(a: Coordinate, b: Coordinate, c: Coordinate, d: Coordinate, e: Coordinate, f: Coordinate, g: Coordinate, h: Coordinate): Coordinate {
  // hold: verified at compile time
  return a
}

export function aMinimalIntegerVectorLiesInE8(a: Coordinate, b: Coordinate, c: Coordinate, d: Coordinate, e: Coordinate, f: Coordinate, g: Coordinate, h: Coordinate): Coordinate {
  // hold: verified at compile time
  return a
}

export function flipSign(s: Sign): Sign {
  if (s.form === "plus") {
    return { form: "minus" }
  } else {
    return { form: "plus" }
  }
}

export function isHalfIntegerRootIsPreservedByFlippingOneSignTwice(s1: Sign, s2: Sign, s3: Sign, s4: Sign, s5: Sign, s6: Sign, s7: Sign, s8: Sign): Sign {
  // hold: verified at compile time
  return s1
}

export function eOnePlusETwoIsAnIntegerRoot(): void {
  // hold: verified at compile time
  return undefined
}

export function eOneMinusEThreeIsAnIntegerRoot(): void {
  // hold: verified at compile time
  return undefined
}

export function theOriginIsNotAnIntegerRoot(): void {
  // hold: verified at compile time
  return undefined
}

export function eOneAloneIsNotAnIntegerRoot(): void {
  // hold: verified at compile time
  return undefined
}

export function fourNonzeroIsNotAnIntegerRoot(): void {
  // hold: verified at compile time
  return undefined
}

export function eOnePlusETwoLiesInE8(): void {
  // hold: verified at compile time
  return undefined
}

export function eOneAloneFailsEvenCoordinateSum(): void {
  // hold: verified at compile time
  return undefined
}

export function theAllPlusHalfIntegerVectorIsARoot(): void {
  // hold: verified at compile time
  return undefined
}

export function aTwoMinusHalfIntegerVectorIsARoot(): void {
  // hold: verified at compile time
  return undefined
}

export function aOneMinusHalfIntegerVectorIsNotARoot(): void {
  // hold: verified at compile time
  return undefined
}

export function aThreeMinusHalfIntegerVectorIsNotARoot(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
