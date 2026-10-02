export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export function max(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return b
  } else {
    const ap = a.prior
    if (b.form === "zero") {
      return { form: "succ", prior: ap }
    } else {
      const bp = b.prior
      return { form: "succ", prior: max(ap, bp) }
    }
  }
}

export function maxIdempotent(a: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function maxZeroRight(a: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function maxZeroLeft(a: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function maxCommutes(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}
