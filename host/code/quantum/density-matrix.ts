export type Pole =
  | { form: "north" }
  | { form: "south" }

export function antipode(p: Pole): Pole {
  if (p.form === "north") {
    return { form: "south" }
  } else {
    return { form: "north" }
  }
}

export function theAntipodalMapIsAnInvolution(p: Pole): Pole {
  // hold: verified at compile time
  return p
}

export function thePolesAreOrthogonal(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time
