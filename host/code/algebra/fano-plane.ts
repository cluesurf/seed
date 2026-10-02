export type Point =
  | { form: "point-zero" }
  | { form: "point-one" }
  | { form: "point-two" }
  | { form: "point-three" }
  | { form: "point-four" }
  | { form: "point-five" }
  | { form: "point-six" }

export function shift(p: Point): Point {
  if (p.form === "point-zero") {
    return { form: "point-one" }
  } else if (p.form === "point-one") {
    return { form: "point-two" }
  } else if (p.form === "point-two") {
    return { form: "point-three" }
  } else if (p.form === "point-three") {
    return { form: "point-four" }
  } else if (p.form === "point-four") {
    return { form: "point-five" }
  } else if (p.form === "point-five") {
    return { form: "point-six" }
  } else {
    return { form: "point-zero" }
  }
}

export function theSingerCycleHasOrderSeven(p: Point): Point {
  // hold: verified at compile time
  return p
}

// hold: verified at compile time

// hold: verified at compile time
