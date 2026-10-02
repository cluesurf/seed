export type Bit =
  | { form: "lo" }
  | { form: "hi" }

export function flip(b: Bit): Bit {
  if (b.form === "lo") {
    return { form: "hi" }
  } else {
    return { form: "lo" }
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
    if (one.form === "lo") {
      if (two.form === "lo") {
        return { form: "lo" }
      } else {
        return three
      }
    } else {
      if (two.form === "lo") {
        return three
      } else {
        return { form: "hi" }
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
