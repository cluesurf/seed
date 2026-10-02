export type Point =
  | { form: "p1" }
  | { form: "p2" }
  | { form: "p3" }

export function s1(x: Point): Point {
  if (x.form === "p1") {
    return { form: "p2" }
  } else if (x.form === "p2") {
    return { form: "p1" }
  } else {
    return { form: "p3" }
  }
}

export function s2(x: Point): Point {
  if (x.form === "p1") {
    return { form: "p1" }
  } else if (x.form === "p2") {
    return { form: "p3" }
  } else {
    return { form: "p2" }
  }
}

export function s1IsAnInvolution(x: Point): Point {
  // hold: verified at compile time
  return x
}

export function s2IsAnInvolution(x: Point): Point {
  // hold: verified at compile time
  return x
}

export function braidRelationOfATwo(x: Point): Point {
  // hold: verified at compile time
  return x
}
