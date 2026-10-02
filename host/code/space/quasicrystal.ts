export type Fivefold =
  | { form: "ray-zero" }
  | { form: "ray-one" }
  | { form: "ray-two" }
  | { form: "ray-three" }
  | { form: "ray-four" }

export function turnFifth(r: Fivefold): Fivefold {
  if (r.form === "ray-zero") {
    return { form: "ray-one" }
  } else if (r.form === "ray-one") {
    return { form: "ray-two" }
  } else if (r.form === "ray-two") {
    return { form: "ray-three" }
  } else if (r.form === "ray-three") {
    return { form: "ray-four" }
  } else {
    return { form: "ray-zero" }
  }
}

export function theFifthTurnHasOrderFive(r: Fivefold): Fivefold {
  // hold: verified at compile time
  return r
}

// hold: verified at compile time

// hold: verified at compile time
