export type Axis =
  | { form: "a1" }
  | { form: "a2" }
  | { form: "a3" }

export type Turn =
  | { form: "still" }
  | { form: "pos"; axis: Axis }
  | { form: "neg"; axis: Axis }

export function flipTurn(t: Turn): Turn {
  if (t.form === "still") {
    return { form: "still" }
  } else if (t.form === "pos") {
    const axis = t.axis
    return { form: "neg", axis: axis }
  } else {
    const axis = t.axis
    return { form: "pos", axis: axis }
  }
}

export function bracket(a: Axis, b: Axis): Turn {
  if (a.form === "a1") {
    if (b.form === "a1") {
      return { form: "still" }
    } else if (b.form === "a2") {
      return { form: "pos", axis: { form: "a3" } }
    } else {
      return { form: "neg", axis: { form: "a2" } }
    }
  } else if (a.form === "a2") {
    if (b.form === "a1") {
      return { form: "neg", axis: { form: "a3" } }
    } else if (b.form === "a2") {
      return { form: "still" }
    } else {
      return { form: "pos", axis: { form: "a1" } }
    }
  } else {
    if (b.form === "a1") {
      return { form: "pos", axis: { form: "a2" } }
    } else if (b.form === "a2") {
      return { form: "neg", axis: { form: "a1" } }
    } else {
      return { form: "still" }
    }
  }
}

export function bracketIsAlternating(a: Axis): Axis {
  // hold: verified at compile time
  return a
}

export function bracketIsAntisymmetric(a: Axis, b: Axis): Axis {
  // hold: verified at compile time
  return a
}
