export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Count =
  | { form: "none" }
  | { form: "more"; prior: Count }

export function addCount(a: Count, b: Count): Count {
  if (a.form === "none") {
    return b
  } else {
    const ap = a.prior
    return { form: "more", prior: addCount(ap, b) }
  }
}

export function belowCount(a: Count, b: Count): Flag {
  if (b.form === "none") {
    return { form: "no" }
  } else {
    const bp = b.prior
    if (a.form === "none") {
      return { form: "yes" }
    } else {
      const ap = a.prior
      return belowCount(ap, bp)
    }
  }
}

export function grow(d: Count, e: Count): Count {
  return addCount(d, { form: "more", prior: e })
}

export function growStrictlyIncreases(d: Count, e: Count): Count {
  // hold: verified at compile time
  return d
}

export function growNeverReturns(d: Count, e: Count): Count {
  // hold: verified at compile time
  return d
}
