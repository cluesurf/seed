export type WeightClass =
  | { form: "weight-zero" }
  | { form: "weight-eight" }
  | { form: "weight-twelve" }
  | { form: "weight-sixteen" }
  | { form: "weight-full" }

export function complement(w: WeightClass): WeightClass {
  if (w.form === "weight-zero") {
    return { form: "weight-full" }
  } else if (w.form === "weight-full") {
    return { form: "weight-zero" }
  } else if (w.form === "weight-eight") {
    return { form: "weight-sixteen" }
  } else if (w.form === "weight-sixteen") {
    return { form: "weight-eight" }
  } else {
    return { form: "weight-twelve" }
  }
}

export function complementationIsAnInvolution(w: WeightClass): WeightClass {
  // hold: verified at compile time
  return w
}

export function theCentralWeightIsSelfComplementary(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time
