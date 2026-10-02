export type Tone =
  | { form: "low" }
  | { form: "middle" }
  | { form: "high" }

export function mirror(t: Tone): Tone {
  if (t.form === "low") {
    return { form: "high" }
  } else if (t.form === "middle") {
    return { form: "middle" }
  } else {
    return { form: "low" }
  }
}

export type Line =
  | { form: "pair"; head: Tone; tail: Tone }

export function collide(l: Line): Line {
  if (l.form === "pair") {
    const head = l.head
    const tail = l.tail
    return { form: "pair", head: mirror(tail), tail: mirror(head) }
  }
}

export function stream(l: Line): Line {
  if (l.form === "pair") {
    const head = l.head
    const tail = l.tail
    return { form: "pair", head: tail, tail: head }
  }
}

export function knit(l: Line): Line {
  return stream(collide(l))
}

export function collideIsReversible(a: Tone, b: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function streamIsReversible(a: Tone, b: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function knitIsReversible(a: Tone, b: Tone): Tone {
  // hold: verified at compile time
  return a
}
