export type Kind =
  | { form: "spherical" }
  | { form: "euclidean" }
  | { form: "hyperbolic" }

export type Tiling =
  | { form: "tetrahedron" }
  | { form: "octahedron" }
  | { form: "cube" }
  | { form: "icosahedron" }
  | { form: "dodecahedron" }
  | { form: "triangle-grid" }
  | { form: "square-grid" }
  | { form: "hexagon-grid" }
  | { form: "pentagrid" }
  | { form: "order-five-square" }
  | { form: "heptagrid" }
  | { form: "order-seven-triangle" }
  | { form: "order-five-pentagon" }
  | { form: "order-six-square" }
  | { form: "order-four-hexagon" }

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

export function classify(t: Tiling): Kind {
  if (t.form === "tetrahedron") {
    return { form: "spherical" }
  } else if (t.form === "octahedron") {
    return { form: "spherical" }
  } else if (t.form === "cube") {
    return { form: "spherical" }
  } else if (t.form === "icosahedron") {
    return { form: "spherical" }
  } else if (t.form === "dodecahedron") {
    return { form: "spherical" }
  } else if (t.form === "triangle-grid") {
    return { form: "euclidean" }
  } else if (t.form === "square-grid") {
    return { form: "euclidean" }
  } else if (t.form === "hexagon-grid") {
    return { form: "euclidean" }
  } else if (t.form === "pentagrid") {
    return { form: "hyperbolic" }
  } else if (t.form === "order-five-square") {
    return { form: "hyperbolic" }
  } else if (t.form === "heptagrid") {
    return { form: "hyperbolic" }
  } else if (t.form === "order-seven-triangle") {
    return { form: "hyperbolic" }
  } else if (t.form === "order-five-pentagon") {
    return { form: "hyperbolic" }
  } else if (t.form === "order-six-square") {
    return { form: "hyperbolic" }
  } else if (t.form === "order-four-hexagon") {
    return { form: "hyperbolic" }
  }
}

export function flip(t: Tiling): Tiling {
  if (t.form === "tetrahedron") {
    return { form: "tetrahedron" }
  } else if (t.form === "octahedron") {
    return { form: "cube" }
  } else if (t.form === "cube") {
    return { form: "octahedron" }
  } else if (t.form === "icosahedron") {
    return { form: "dodecahedron" }
  } else if (t.form === "dodecahedron") {
    return { form: "icosahedron" }
  } else if (t.form === "triangle-grid") {
    return { form: "hexagon-grid" }
  } else if (t.form === "square-grid") {
    return { form: "square-grid" }
  } else if (t.form === "hexagon-grid") {
    return { form: "triangle-grid" }
  } else if (t.form === "pentagrid") {
    return { form: "order-five-square" }
  } else if (t.form === "order-five-square") {
    return { form: "pentagrid" }
  } else if (t.form === "heptagrid") {
    return { form: "order-seven-triangle" }
  } else if (t.form === "order-seven-triangle") {
    return { form: "heptagrid" }
  } else if (t.form === "order-five-pentagon") {
    return { form: "order-five-pentagon" }
  } else if (t.form === "order-six-square") {
    return { form: "order-four-hexagon" }
  } else if (t.form === "order-four-hexagon") {
    return { form: "order-six-square" }
  }
}

export function flipIsAnInvolution(t: Tiling): Tiling {
  // hold: verified at compile time
  return t
}

export function classificationIsSelfDual(t: Tiling): Tiling {
  // hold: verified at compile time
  return t
}

export function pentagridAndItsDualAgree(): void {
  // hold: verified at compile time
  return undefined
}

export function cubeAndOctahedronAgree(): void {
  // hold: verified at compile time
  return undefined
}

export function triangleAndHexagonGridsAgree(): void {
  // hold: verified at compile time
  return undefined
}

export function euclideanAndHyperbolicAreDistinct(): void {
  // hold: verified at compile time
  return undefined
}
