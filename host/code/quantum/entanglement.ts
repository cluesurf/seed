export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Bit =
  | { form: "off" }
  | { form: "on" }

export type Bell =
  | { form: "phi-plus" }
  | { form: "phi-minus" }
  | { form: "psi-plus" }
  | { form: "psi-minus" }

export function flip(b: Bit): Bit {
  if (b.form === "off") {
    return { form: "on" }
  } else {
    return { form: "off" }
  }
}

export function isCorrelated(s: Bell): Flag {
  if (s.form === "phi-plus") {
    return { form: "yes" }
  } else if (s.form === "phi-minus") {
    return { form: "yes" }
  } else if (s.form === "psi-plus") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
}

export function partner(s: Bell, b: Bit): Bit {
  {
    const __at1 = isCorrelated(s)
    if (__at1.form === "yes") {
    return b
  } else {
    return flip(b)
  }
  }
}

export function phase(s: Bell): Bit {
  if (s.form === "phi-plus") {
    return { form: "off" }
  } else if (s.form === "phi-minus") {
    return { form: "on" }
  } else if (s.form === "psi-plus") {
    return { form: "off" }
  } else {
    return { form: "on" }
  }
}

export function phiPlusIsPerfectlyCorrelated(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function psiMinusIsPerfectlyAnticorrelated(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function correlatedPartnerIsAnInvolution(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function anticorrelatedPartnerIsAnInvolution(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function phiPlusIsCorrelated(): void {
  // hold: verified at compile time
  return undefined
}

export function psiMinusIsAnticorrelated(): void {
  // hold: verified at compile time
  return undefined
}

export function phiPlusHasPlusPhase(): void {
  // hold: verified at compile time
  return undefined
}

export function phiMinusHasMinusPhase(): void {
  // hold: verified at compile time
  return undefined
}

export function psiPlusIsAnticorrelatedPlusPhase(): void {
  // hold: verified at compile time
  return undefined
}
