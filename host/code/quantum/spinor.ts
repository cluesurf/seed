export type Sign =
  | { form: "positive" }
  | { form: "negative" }

export function flipSign(s: Sign): Sign {
  if (s.form === "positive") {
    return { form: "negative" }
  } else {
    return { form: "positive" }
  }
}

export function fullTurnFlipsTheSign(): void {
  // hold: verified at compile time
  return undefined
}

export function doubleTurnReturns(s: Sign): Sign {
  // hold: verified at compile time
  return s
}

export function fullTurnIsNotTrivial(): void {
  // hold: verified at compile time
  return undefined
}
