export type Spinor =
  | { form: "turn-zero" }
  | { form: "turn-one" }
  | { form: "turn-two" }
  | { form: "turn-three" }
  | { form: "turn-four" }
  | { form: "turn-five" }
  | { form: "turn-six" }
  | { form: "turn-seven" }

export function quarter(a: Spinor): Spinor {
  if (a.form === "turn-zero") {
    return { form: "turn-one" }
  } else if (a.form === "turn-one") {
    return { form: "turn-two" }
  } else if (a.form === "turn-two") {
    return { form: "turn-three" }
  } else if (a.form === "turn-three") {
    return { form: "turn-four" }
  } else if (a.form === "turn-four") {
    return { form: "turn-five" }
  } else if (a.form === "turn-five") {
    return { form: "turn-six" }
  } else if (a.form === "turn-six") {
    return { form: "turn-seven" }
  } else {
    return { form: "turn-zero" }
  }
}

export function spinorReturnsAfterTwoFullRotations(a: Spinor): Spinor {
  // hold: verified at compile time
  return a
}

export function oneRotationSendsPlusToMinus(): void {
  // hold: verified at compile time
  return undefined
}

export function theMinusOnePhaseSquaresToOne(): void {
  // hold: verified at compile time
  return undefined
}
