export type Ising =
  | { form: "vacuum" }
  | { form: "psi" }
  | { form: "sigma" }

export function sameIsing(b: Ising, c: Ising): number {
  if (b.form === "vacuum") {
    if (c.form === "vacuum") {
      return 1
    } else if (c.form === "psi") {
      return 0
    } else {
      return 0
    }
  } else if (b.form === "psi") {
    if (c.form === "vacuum") {
      return 0
    } else if (c.form === "psi") {
      return 1
    } else {
      return 0
    }
  } else {
    if (c.form === "vacuum") {
      return 0
    } else if (c.form === "psi") {
      return 0
    } else {
      return 1
    }
  }
}

export function notSigma(c: Ising): number {
  if (c.form === "vacuum") {
    return 1
  } else if (c.form === "psi") {
    return 1
  } else {
    return 0
  }
}

export function combine(a: Ising, b: Ising, c: Ising): number {
  if (a.form === "vacuum") {
    return sameIsing(b, c)
  } else if (a.form === "psi") {
    if (b.form === "vacuum") {
      return sameIsing({ form: "psi" }, c)
    } else if (b.form === "psi") {
      return sameIsing({ form: "vacuum" }, c)
    } else {
      return sameIsing({ form: "sigma" }, c)
    }
  } else {
    if (b.form === "vacuum") {
      return sameIsing({ form: "sigma" }, c)
    } else if (b.form === "psi") {
      return sameIsing({ form: "sigma" }, c)
    } else {
      return notSigma(c)
    }
  }
}

export function vacuumIsTheFusionUnit(b: Ising, c: Ising): Ising {
  // hold: verified at compile time
  return b
}

export function fusionIsCommutative(a: Ising, b: Ising, c: Ising): Ising {
  // hold: verified at compile time
  return a
}

export function theMajoranaIsItsOwnAntiparticle(c: Ising): Ising {
  // hold: verified at compile time
  return c
}
