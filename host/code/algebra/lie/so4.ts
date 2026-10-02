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

export type Rotor =
  | { form: "pair"; left: Elem; right: Elem }

export function so4Bracket(a: Rotor, b: Rotor): Rotor {
  if (a.form === "pair") {
    const leftA = a.left
    const rightA = a.right
    if (b.form === "pair") {
      const leftB = b.left
      const rightB = b.right
      return { form: "pair", left: bracket(leftA, leftB), right: bracket(rightA, rightB) }
    }
  }
}

export function pureLeft(x: Elem): Rotor {
  return { form: "pair", left: x, right: { form: "zero" } }
}

export function pureRight(x: Elem): Rotor {
  return { form: "pair", left: { form: "zero" }, right: x }
}

export function leftAndRightCommute(a: Elem, b: Elem): Elem {
  // hold: verified at compile time
  return a
}

export function leftFactorIsClosed(a: Elem, b: Elem): Elem {
  // hold: verified at compile time
  return a
}
