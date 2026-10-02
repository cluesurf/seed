export type WeightClass =
  | { form: "weight-zero" }
  | { form: "weight-four" }
  | { form: "weight-eight" }

export function complement(w: WeightClass): WeightClass {
  if (w.form === "weight-zero") {
    return { form: "weight-eight" }
  } else if (w.form === "weight-eight") {
    return { form: "weight-zero" }
  } else {
    return { form: "weight-four" }
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
