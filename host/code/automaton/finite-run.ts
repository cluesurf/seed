export type Glyph =
  | { form: "o" }
  | { form: "i" }

export type Word =
  | { form: "nil" }
  | { form: "cons"; head: Glyph; tail: Word }

export type Phase =
  | { form: "even" }
  | { form: "odd" }

export function step(s: Phase, g: Glyph): Phase {
  if (g.form === "o") {
    return s
  } else {
    if (s.form === "even") {
      return { form: "odd" }
    } else {
      return { form: "even" }
    }
  }
}

export function run(s: Phase, w: Word): Phase {
  if (w.form === "nil") {
    return s
  } else {
    const head = w.head
    const tail = w.tail
    return run(step(s, head), tail)
  }
}

export function append(u: Word, v: Word): Word {
  if (u.form === "nil") {
    return v
  } else {
    const head = u.head
    const tail = u.tail
    return { form: "cons", head: head, tail: append(tail, v) }
  }
}

export function runConsSteps(s: Phase, g: Glyph, w: Word): Phase {
  // hold: verified at compile time
  return s
}

export function appendConsSteps(g: Glyph, u: Word, v: Word): Glyph {
  // hold: verified at compile time
  return g
}

export function readingOneTwiceReturns(s: Phase): Phase {
  // hold: verified at compile time
  return s
}

export function readingZeroKeepsState(s: Phase): Phase {
  // hold: verified at compile time
  return s
}

export function runEmptyIsIdentity(s: Phase): Phase {
  // hold: verified at compile time
  return s
}

export function evenThenTwoOnesIsEven(): void {
  // hold: verified at compile time
  return undefined
}

export function evenThenOneOneIsOdd(): void {
  // hold: verified at compile time
  return undefined
}

export function runDistributesOverAppend(s: Phase, u: Word, v: Word): Phase {
  // hold: verified at compile time
  return s
}
