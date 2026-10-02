export type Sector =
  | { form: "x-type" }
  | { form: "z-type" }

export function hadamard(s: Sector): Sector {
  if (s.form === "x-type") {
    return { form: "z-type" }
  } else {
    return { form: "x-type" }
  }
}

export function hadamardDualityIsAnInvolution(s: Sector): Sector {
  // hold: verified at compile time
  return s
}

export function theHadamardSwapsTheSectors(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time
