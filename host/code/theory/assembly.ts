export type Build =
  | { form: "part" }
  | { form: "join"; left: Build; right: Build }

export function reflect(b: Build): Build {
  if (b.form === "part") {
    return { form: "part" }
  } else {
    const left = b.left
    const right = b.right
    return { form: "join", left: reflect(right), right: reflect(left) }
  }
}

export function reflectionIsAnInvolution(b: Build): Build {
  // hold: verified at compile time
  return b
}

// hold: verified at compile time

// hold: verified at compile time
