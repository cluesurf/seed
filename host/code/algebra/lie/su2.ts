export type Sign =
  | { form: "positive" }
  | { form: "negative" }

export type Gen =
  | { form: "x" }
  | { form: "y" }
  | { form: "z" }

export type Elem =
  | { form: "zero" }
  | { form: "spin"; sign: Sign; gen: Gen }

export function negate(a: Elem): Elem {
  if (a.form === "zero") {
    return { form: "zero" }
  } else {
    const sign = a.sign
    const gen = a.gen
    if (sign.form === "positive") {
      return { form: "spin", sign: { form: "negative" }, gen: gen }
    } else {
      return { form: "spin", sign: { form: "positive" }, gen: gen }
    }
  }
}

export function bracket(a: Elem, b: Elem): Elem {
  if (a.form === "zero") {
    return { form: "zero" }
  } else {
    const signA = a.sign
    const genA = a.gen
    if (b.form === "zero") {
      return { form: "zero" }
    } else {
      const signB = b.sign
      const genB = b.gen
      if (genA.form === "x") {
        if (genB.form === "x") {
          return { form: "zero" }
        } else if (genB.form === "y") {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "z" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "z" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "z" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "z" } }
            }
          }
        } else {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "y" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "y" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "y" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "y" } }
            }
          }
        }
      } else if (genA.form === "y") {
        if (genB.form === "x") {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "z" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "z" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "z" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "z" } }
            }
          }
        } else if (genB.form === "y") {
          return { form: "zero" }
        } else {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "x" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "x" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "x" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "x" } }
            }
          }
        }
      } else {
        if (genB.form === "x") {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "y" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "y" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "y" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "y" } }
            }
          }
        } else if (genB.form === "y") {
          if (signA.form === "positive") {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "x" } }
            } else {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "x" } }
            }
          } else {
            if (signB.form === "positive") {
              return { form: "spin", sign: { form: "positive" }, gen: { form: "x" } }
            } else {
              return { form: "spin", sign: { form: "negative" }, gen: { form: "x" } }
            }
          }
        } else {
          return { form: "zero" }
        }
      }
    }
  }
}

export function bracketIsAlternating(a: Elem): Elem {
  // hold: verified at compile time
  return a
}

export function bracketIsAntisymmetric(signA: Sign, genA: Gen, signB: Sign, genB: Gen): Sign {
  // hold: verified at compile time
  return signA
}

export function bracketXYIsZ(): void {
  // hold: verified at compile time
  return undefined
}

export function bracketYZIsX(): void {
  // hold: verified at compile time
  return undefined
}

export function bracketZXIsY(): void {
  // hold: verified at compile time
  return undefined
}

export function combine(a: Elem, b: Elem): Elem {
  if (a.form === "zero") {
    return b
  } else {
    const signA = a.sign
    const genA = a.gen
    if (b.form === "zero") {
      return { form: "spin", sign: signA, gen: genA }
    } else {
      const signB = b.sign
      const genB = b.gen
      return combineSpin(signA, genA, signB, genB)
    }
  }
}

export function combineSpin(signA: Sign, genA: Gen, signB: Sign, genB: Gen): Elem {
  if (signA.form === "positive") {
    if (signB.form === "positive") {
      return { form: "spin", sign: { form: "positive" }, gen: genA }
    } else {
      return { form: "zero" }
    }
  } else {
    if (signB.form === "positive") {
      return { form: "zero" }
    } else {
      return { form: "spin", sign: { form: "negative" }, gen: genA }
    }
  }
}

export function jacobiSum(a: Elem, b: Elem, c: Elem): Elem {
  return combine(combine(bracket(a, bracket(b, c)), bracket(b, bracket(c, a))), bracket(c, bracket(a, b)))
}

export function jacobiIdentityOnTheGenerators(): void {
  // hold: verified at compile time
  return undefined
}
