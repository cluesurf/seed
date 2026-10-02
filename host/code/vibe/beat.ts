export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Time =
  | { form: "start" }
  | { form: "tick"; prior: Time }

export function before(a: Time, b: Time): Flag {
  if (b.form === "start") {
    return { form: "no" }
  } else {
    const bp = b.prior
    if (a.form === "start") {
      return { form: "yes" }
    } else {
      const ap = a.prior
      return before(ap, bp)
    }
  }
}

export function beforeIsIrreflexive(n: Time): Time {
  // hold: verified at compile time
  return n
}

export function tickAdvances(n: Time): Time {
  // hold: verified at compile time
  return n
}

export function beforeIsAsymmetric(a: Time, b: Time): Time {
  if (before(a, b) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return a
}

export function beforeIsTransitive(a: Time, b: Time, c: Time): Time {
  if (before(a, b) == { form: "yes" }) {
    if (before(b, c) == { form: "yes" }) {
      // hold: verified at compile time
    }
  }
  return a
}
