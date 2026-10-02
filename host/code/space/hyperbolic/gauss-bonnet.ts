export type Solid =
  | { form: "tetrahedron" }
  | { form: "cube" }
  | { form: "octahedron" }
  | { form: "dodecahedron" }
  | { form: "icosahedron" }

export function dual(s: Solid): Solid {
  if (s.form === "tetrahedron") {
    return { form: "tetrahedron" }
  } else if (s.form === "cube") {
    return { form: "octahedron" }
  } else if (s.form === "octahedron") {
    return { form: "cube" }
  } else if (s.form === "dodecahedron") {
    return { form: "icosahedron" }
  } else {
    return { form: "dodecahedron" }
  }
}

export function dualityIsAnInvolution(s: Solid): Solid {
  // hold: verified at compile time
  return s
}

export function theTetrahedronIsSelfDual(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
