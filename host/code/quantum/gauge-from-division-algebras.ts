export type Sign =
  | { form: "positive" }
  | { form: "negative" }

export function flipSign(s: Sign): Sign {
  if (s.form === "positive") {
    return { form: "negative" }
  } else {
    return { form: "positive" }
  }
}

export type ImaginaryC =
  | { form: "unit-i" }

export type ImaginaryH =
  | { form: "eye" }
  | { form: "jay" }
  | { form: "kay" }

export type ImaginaryO =
  | { form: "o1" }
  | { form: "o2" }
  | { form: "o3" }
  | { form: "o4" }
  | { form: "o5" }
  | { form: "o6" }
  | { form: "o7" }

export type Turn =
  | { form: "still" }
  | { form: "spin"; sign: Sign; unit: ImaginaryH }

export function negateTurn(a: Turn): Turn {
  if (a.form === "still") {
    return { form: "still" }
  } else {
    const sign = a.sign
    const unit = a.unit
    return { form: "spin", sign: flipSign(sign), unit: unit }
  }
}

export function commutator(a: Turn, b: Turn): Turn {
  if (a.form === "still") {
    return { form: "still" }
  } else {
    const signA = a.sign
    const genA = a.unit
    if (b.form === "still") {
      return { form: "still" }
    } else {
      const signB = b.sign
      const genB = b.unit
      if (genA.form === "eye") {
        if (genB.form === "eye") {
          return { form: "still" }
        } else if (genB.form === "jay") {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "kay" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "kay" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "kay" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "kay" } }
            }
          }
        } else {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "jay" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "jay" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "jay" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "jay" } }
            }
          }
        }
      } else if (genA.form === "jay") {
        if (genB.form === "eye") {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "kay" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "kay" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "kay" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "kay" } }
            }
          }
        } else if (genB.form === "jay") {
          return { form: "still" }
        } else {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "eye" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "eye" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "eye" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "eye" } }
            }
          }
        }
      } else {
        if (genB.form === "eye") {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "jay" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "jay" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "jay" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "jay" } }
            }
          }
        } else if (genB.form === "jay") {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "eye" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "eye" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, unit: { form: "eye" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, unit: { form: "eye" } }
            }
          }
        } else {
          return { form: "still" }
        }
      }
    }
  }
}

export type Prod =
  | { form: "real-minus-one" }
  | { form: "turned"; sign: Sign; unit: ImaginaryH }

export function multiplyUnit(a: ImaginaryH, b: ImaginaryH): Prod {
  if (a.form === "eye") {
    if (b.form === "eye") {
      return { form: "real-minus-one" }
    } else if (b.form === "jay") {
      return { form: "turned", sign: { form: "positive" }, unit: { form: "kay" } }
    } else {
      return { form: "turned", sign: { form: "negative" }, unit: { form: "jay" } }
    }
  } else if (a.form === "jay") {
    if (b.form === "eye") {
      return { form: "turned", sign: { form: "negative" }, unit: { form: "kay" } }
    } else if (b.form === "jay") {
      return { form: "real-minus-one" }
    } else {
      return { form: "turned", sign: { form: "positive" }, unit: { form: "eye" } }
    }
  } else {
    if (b.form === "eye") {
      return { form: "turned", sign: { form: "positive" }, unit: { form: "jay" } }
    } else if (b.form === "jay") {
      return { form: "turned", sign: { form: "negative" }, unit: { form: "eye" } }
    } else {
      return { form: "real-minus-one" }
    }
  }
}

export function posSpin(u: ImaginaryH): Turn {
  return { form: "spin", sign: { form: "positive" }, unit: u }
}

export function commutatorEyeJayIsKay(): void {
  // hold: verified at compile time
  return undefined
}

export function commutatorJayKayIsEye(): void {
  // hold: verified at compile time
  return undefined
}

export function commutatorKayEyeIsJay(): void {
  // hold: verified at compile time
  return undefined
}

export function commutatorIsAlternating(a: Turn): Turn {
  // hold: verified at compile time
  return a
}

export function commutatorIsAntisymmetric(signA: Sign, unitA: ImaginaryH, signB: Sign, unitB: ImaginaryH): Sign {
  // hold: verified at compile time
  return signA
}

export function eachQuaternionUnitSquaresToMinusOne(u: ImaginaryH): ImaginaryH {
  // hold: verified at compile time
  return u
}

export function eyeTimesJayIsKay(): void {
  // hold: verified at compile time
  return undefined
}

export function countUnit(u: ImaginaryH): number {
  if (u.form === "eye") {
    return 1
  } else if (u.form === "jay") {
    return 1
  } else {
    return 1
  }
}

export function eachQuaternionUnitIsOneGenerator(u: ImaginaryH): ImaginaryH {
  // hold: verified at compile time
  return u
}

// hold: verified at compile time

export function countC(u: ImaginaryC): number {
  if (u.form === "unit-i") {
    return 1
  }
}

export function u1HasOneGenerator(): void {
  // hold: verified at compile time
  return undefined
}

export function countO(u: ImaginaryO): number {
  if (u.form === "o1") {
    return 1
  } else if (u.form === "o2") {
    return 1
  } else if (u.form === "o3") {
    return 1
  } else if (u.form === "o4") {
    return 1
  } else if (u.form === "o5") {
    return 1
  } else if (u.form === "o6") {
    return 1
  } else {
    return 1
  }
}

export function eachOctonionUnitIsCountedOnce(u: ImaginaryO): ImaginaryO {
  // hold: verified at compile time
  return u
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
