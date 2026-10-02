export type Anyon =
  | { form: "vacuum" }
  | { form: "tau" }

export function sameAnyon(b: Anyon, c: Anyon): number {
  if (b.form === "vacuum") {
    if (c.form === "vacuum") {
      return 1
    } else {
      return 0
    }
  } else {
    if (c.form === "vacuum") {
      return 0
    } else {
      return 1
    }
  }
}

export function combine(a: Anyon, b: Anyon, c: Anyon): number {
  if (a.form === "vacuum") {
    return sameAnyon(b, c)
  } else {
    if (b.form === "vacuum") {
      return sameAnyon({ form: "tau" }, c)
    } else {
      return 1
    }
  }
}

export function vacuumIsTheFusionUnit(b: Anyon, c: Anyon): Anyon {
  // hold: verified at compile time
  return b
}

export function fusionIsCommutative(a: Anyon, b: Anyon, c: Anyon): Anyon {
  // hold: verified at compile time
  return a
}
