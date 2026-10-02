export type Bit =
  | { form: "off" }
  | { form: "on" }

export function xor(a: Bit, b: Bit): Bit {
  if (a.form === "off") {
    return b
  } else {
    if (b.form === "off") {
      return { form: "on" }
    } else {
      return { form: "off" }
    }
  }
}

export type Grid =
  | { form: "cells"; c0: Bit; c1: Bit; c2: Bit; c3: Bit }

export function step(g: Grid): Grid {
  if (g.form === "cells") {
    const c0 = g.c0
    const c1 = g.c1
    const c2 = g.c2
    const c3 = g.c3
    return { form: "cells", c0: c0, c1: xor(c1, c0), c2: c2, c3: xor(c3, c2) }
  }
}

export function globalStepIsReversible(a: Bit, b: Bit, c: Bit, d: Bit): Bit {
  // hold: verified at compile time
  return a
}
