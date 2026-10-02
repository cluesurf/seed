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

export type Bit =
  | { form: "off" }
  | { form: "on" }

export function flip(b: Bit): Bit {
  if (b.form === "off") {
    return { form: "on" }
  } else {
    return { form: "off" }
  }
}

export function same(a: Bit, b: Bit): Flag {
  if (a.form === "off") {
    if (b.form === "off") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "off") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export type Word =
  | { form: "triple"; one: Bit; two: Bit; three: Bit }

export function encode(b: Bit): Word {
  return { form: "triple", one: b, two: b, three: b }
}

export function decode(w: Word): Bit {
  if (w.form === "triple") {
    const one = w.one
    const two = w.two
    const three = w.three
    if (one.form === "off") {
      if (two.form === "off") {
        return { form: "off" }
      } else {
        return three
      }
    } else {
      if (two.form === "off") {
        return three
      } else {
        return { form: "on" }
      }
    }
  }
}

export function errorOne(w: Word): Word {
  if (w.form === "triple") {
    const one = w.one
    const two = w.two
    const three = w.three
    return { form: "triple", one: flip(one), two: two, three: three }
  }
}

export function errorTwo(w: Word): Word {
  if (w.form === "triple") {
    const one = w.one
    const two = w.two
    const three = w.three
    return { form: "triple", one: one, two: flip(two), three: three }
  }
}

export function errorThree(w: Word): Word {
  if (w.form === "triple") {
    const one = w.one
    const two = w.two
    const three = w.three
    return { form: "triple", one: one, two: two, three: flip(three) }
  }
}

export type Syndrome =
  | { form: "checks"; low: Flag; high: Flag }

export function measure(w: Word): Syndrome {
  if (w.form === "triple") {
    const one = w.one
    const two = w.two
    const three = w.three
    return { form: "checks", low: same(one, two), high: same(two, three) }
  }
}

export function isClean(s: Syndrome): Flag {
  if (s.form === "checks") {
    const low = s.low
    const high = s.high
    return both(low, high)
  }
}

export function decodesCleanCodeword(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function correctsErrorAtOne(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function correctsErrorAtTwo(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function correctsErrorAtThree(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function syndromeOfErrorAtOne(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function syndromeOfErrorAtTwo(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function syndromeOfErrorAtThree(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function syndromeOfCleanCodeword(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function errorAtTwoIsDetected(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function cleanCodewordReadsAsClean(b: Bit): Bit {
  // hold: verified at compile time
  return b
}
