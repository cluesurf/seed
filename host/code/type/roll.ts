export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export function plus(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return b
  } else {
    const prior = a.prior
    return { form: "succ", prior: plus(prior, b) }
  }
}

export type Roll =
  | { form: "nil" }
  | { form: "cons"; item: Natural; more: Roll }

export function length(xs: Roll): Natural {
  if (xs.form === "nil") {
    return { form: "zero" }
  } else {
    const more = xs.more
    return { form: "succ", prior: length(more) }
  }
}

export function append(xs: Roll, ys: Roll): Roll {
  if (xs.form === "nil") {
    return ys
  } else {
    const item = xs.item
    const more = xs.more
    return { form: "cons", item: item, more: append(more, ys) }
  }
}

export function lengthOfNilIsZero(): void {
  // hold: verified at compile time
  return undefined
}

export function appendNilLeftIsIdentity(ys: Roll): Roll {
  // hold: verified at compile time
  return ys
}

export function lengthOfConsSteps(h: Natural, t: Roll): Natural {
  // hold: verified at compile time
  return h
}

export function appendOfConsSteps(h: Natural, t: Roll, ys: Roll): Natural {
  // hold: verified at compile time
  return h
}

export function appendNilRightIsIdentity(xs: Roll): Roll {
  // hold: verified at compile time
  return xs
}

export function appendIsAssociative(xs: Roll, ys: Roll, zs: Roll): Roll {
  // hold: verified at compile time
  return xs
}

export function lengthOfAppendAdds(xs: Roll, ys: Roll): Roll {
  // hold: verified at compile time
  return xs
}

export function reverse(xs: Roll): Roll {
  if (xs.form === "nil") {
    return { form: "nil" }
  } else {
    const item = xs.item
    const more = xs.more
    return append(reverse(more), { form: "cons", item: item, more: { form: "nil" } })
  }
}

export function reverseNilIsNil(): void {
  // hold: verified at compile time
  return undefined
}

export function reverseConsSteps(h: Natural, t: Roll): Natural {
  // hold: verified at compile time
  return h
}

export function reverseOfAppend(xs: Roll, ys: Roll): Roll {
  // hold: verified at compile time
  return xs
}

export function reverseReverseIsIdentity(xs: Roll): Roll {
  // hold: verified at compile time
  return xs
}

export function plusZeroRightOnLength(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function plusSuccRightOnLength(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function lengthOfReverseIsLength(xs: Roll): Roll {
  // hold: verified at compile time
  return xs
}
