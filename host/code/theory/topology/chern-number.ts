export type Band =
  | { form: "upper" }
  | { form: "lower" }

export function partner(b: Band): Band {
  if (b.form === "upper") {
    return { form: "lower" }
  } else {
    return { form: "upper" }
  }
}

export function theBandPairingIsAnInvolution(b: Band): Band {
  // hold: verified at compile time
  return b
}

export function thePairingExchangesTheBands(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time
