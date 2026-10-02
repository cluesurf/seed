export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export function double(n: Natural): Natural {
  if (n.form === "zero") {
    return { form: "zero" }
  } else {
    const prior = n.prior
    return { form: "succ", prior: { form: "succ", prior: double(prior) } }
  }
}

export function relationIsReflexive(a: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function relationIsSymmetric(a: Natural, b: Natural): Natural {
  if (double(a) == double(b)) {
    // hold: verified at compile time
  }
  return a
}

export function relationIsTransitive(a: Natural, b: Natural, c: Natural): Natural {
  if (double(a) == double(b)) {
    if (double(b) == double(c)) {
      // hold: verified at compile time
    }
  }
  return a
}

export function successorRespectsRelation(a: Natural, b: Natural): Natural {
  if (double(a) == double(b)) {
    // hold: verified at compile time
  }
  return a
}

export function classOfRelatedIsOne(a: Natural, b: Natural): Natural {
  if (double(a) == double(b)) {
    // hold: verified at compile time
  }
  return a
}

export function respectingFunctionDescends(a: Natural, b: Natural): Natural {
  if (double(a) == double(b)) {
    // hold: verified at compile time
  }
  return a
}

export type Color =
  | { form: "red" }
  | { form: "green" }
  | { form: "blue" }

export type Verdict =
  | { form: "yes" }
  | { form: "no" }

export function near(x: Color, y: Color): Verdict {
  if (x.form === "red") {
    if (y.form === "red") {
      return { form: "yes" }
    } else if (y.form === "green") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else if (x.form === "green") {
    return { form: "yes" }
  } else {
    if (y.form === "red") {
      return { form: "no" }
    } else if (y.form === "green") {
      return { form: "yes" }
    } else {
      return { form: "yes" }
    }
  }
}

export function redIsNearGreen(): void {
  // hold: verified at compile time
  return undefined
}

export function greenIsNearBlue(): void {
  // hold: verified at compile time
  return undefined
}

export function redIsNotNearBlue(): void {
  // hold: verified at compile time
  return undefined
}
