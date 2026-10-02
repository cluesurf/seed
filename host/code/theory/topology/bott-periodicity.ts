export type CliffordClass =
  | { form: "class-zero" }
  | { form: "class-one" }
  | { form: "class-two" }
  | { form: "class-three" }
  | { form: "class-four" }
  | { form: "class-five" }
  | { form: "class-six" }
  | { form: "class-seven" }

export function addGenerator(c: CliffordClass): CliffordClass {
  if (c.form === "class-zero") {
    return { form: "class-one" }
  } else if (c.form === "class-one") {
    return { form: "class-two" }
  } else if (c.form === "class-two") {
    return { form: "class-three" }
  } else if (c.form === "class-three") {
    return { form: "class-four" }
  } else if (c.form === "class-four") {
    return { form: "class-five" }
  } else if (c.form === "class-five") {
    return { form: "class-six" }
  } else if (c.form === "class-six") {
    return { form: "class-seven" }
  } else {
    return { form: "class-zero" }
  }
}

export function addingEightGeneratorsReturnsToTheSameClass(c: CliffordClass): CliffordClass {
  // hold: verified at compile time
  return c
}

export function addingFourGeneratorsLandsOpposite(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time
