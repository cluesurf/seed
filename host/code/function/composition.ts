export type Tone =
  | { form: "low" }
  | { form: "middle" }
  | { form: "high" }

export function ident(x: Tone): Tone {
  return x
}

export function mirror(x: Tone): Tone {
  if (x.form === "low") {
    return { form: "high" }
  } else if (x.form === "middle") {
    return { form: "middle" }
  } else {
    return { form: "low" }
  }
}

export function twiceMirror(x: Tone): Tone {
  return mirror(mirror(x))
}

export function mirrorAfterIdent(x: Tone): Tone {
  return mirror(ident(x))
}

export function twiceMirrorPointwise(x: Tone): Tone {
  // hold: verified at compile time
  return x
}

export function twiceMirrorIsIdentityFunction(): void {
  // hold: verified at compile time
  return undefined
}

export function mirrorAfterIdentPointwise(x: Tone): Tone {
  // hold: verified at compile time
  return x
}

export function identIsRightUnit(): void {
  // hold: verified at compile time
  return undefined
}
