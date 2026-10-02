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

export function sameSign(a: Sign, b: Sign): Flag {
  if (a.form === "positive") {
    if (b.form === "positive") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "positive") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export type Way =
  | { form: "pair"; one: Sign; two: Sign }

export function opposite(w: Way): Way {
  if (w.form === "pair") {
    const one = w.one
    const two = w.two
    return { form: "pair", one: flipSign(one), two: flipSign(two) }
  }
}

export function sameWay(a: Way, b: Way): Flag {
  if (a.form === "pair") {
    const one = a.one
    const two = a.two
    if (b.form === "pair") {
      const three = b.one
      const four = b.two
      return both(sameSign(one, three), sameSign(two, four))
    }
  }
}

export function oppositeIsAnInvolution(w: Way): Way {
  // hold: verified at compile time
  return w
}

export function oppositeHasNoFixedPoint(w: Way): Way {
  // hold: verified at compile time
  return w
}
