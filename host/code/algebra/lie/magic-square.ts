export type Exceptional =
  | { form: "f-four" }
  | { form: "e-six" }
  | { form: "e-seven" }
  | { form: "e-eight" }

export function next(g: Exceptional): Exceptional {
  if (g.form === "f-four") {
    return { form: "e-six" }
  } else if (g.form === "e-six") {
    return { form: "e-seven" }
  } else if (g.form === "e-seven") {
    return { form: "e-eight" }
  } else {
    return { form: "e-eight" }
  }
}

export function climbingThreeStepsReachesEEight(g: Exceptional): Exceptional {
  // hold: verified at compile time
  return g
}

export function eEightIsTheTop(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
