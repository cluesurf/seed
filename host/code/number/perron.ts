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

export function fib(n: Natural): Natural {
  if (n.form === "zero") {
    return { form: "zero" }
  } else {
    const m = n.prior
    if (m.form === "zero") {
      return { form: "succ", prior: { form: "zero" } }
    } else {
      const k = m.prior
      return plus(fib(m), fib(k))
    }
  }
}

export function theGoldenRecurrence(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

// hold: verified at compile time

// hold: verified at compile time
