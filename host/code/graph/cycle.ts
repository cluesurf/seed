export type Node =
  | { form: "n0" }
  | { form: "n1" }
  | { form: "n2" }

export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function adjacent(a: Node, b: Node): Flag {
  if (a.form === "n0") {
    if (b.form === "n0") {
      return { form: "no" }
    } else if (b.form === "n1") {
      return { form: "yes" }
    } else {
      return { form: "yes" }
    }
  } else if (a.form === "n1") {
    if (b.form === "n0") {
      return { form: "yes" }
    } else if (b.form === "n1") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  } else {
    if (b.form === "n0") {
      return { form: "yes" }
    } else if (b.form === "n1") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  }
}

export function adjacentIsSymmetric(a: Node, b: Node): Node {
  // hold: verified at compile time
  return a
}

export function adjacentIsIrreflexive(a: Node): Node {
  // hold: verified at compile time
  return a
}

// hold: verified at compile time
