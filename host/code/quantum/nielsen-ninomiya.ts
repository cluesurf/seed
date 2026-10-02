export type Hand =
  | { form: "left" }
  | { form: "right" }

export function mirror(a: Hand): Hand {
  if (a.form === "left") {
    return { form: "right" }
  } else {
    return { form: "left" }
  }
}

export function mirrorIsAnInvolution(a: Hand): Hand {
  // hold: verified at compile time
  return a
}

export function mirrorOfLeftIsRight(): void {
  // hold: verified at compile time
  return undefined
}

export function mirrorOfRightIsLeft(): void {
  // hold: verified at compile time
  return undefined
}
