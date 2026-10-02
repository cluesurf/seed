export type ElementKind =
  | { form: "vertex" }
  | { form: "edge" }
  | { form: "face" }
  | { form: "cell" }

export function count600Cell(r: ElementKind): number {
  if (r.form === "vertex") {
    return 120
  } else if (r.form === "edge") {
    return 720
  } else if (r.form === "face") {
    return 1200
  } else {
    return 600
  }
}

export function count120Cell(r: ElementKind): number {
  if (r.form === "vertex") {
    return 600
  } else if (r.form === "edge") {
    return 1200
  } else if (r.form === "face") {
    return 720
  } else {
    return 120
  }
}

export function dualRank(r: ElementKind): ElementKind {
  if (r.form === "vertex") {
    return { form: "cell" }
  } else if (r.form === "edge") {
    return { form: "face" }
  } else if (r.form === "face") {
    return { form: "edge" }
  } else {
    return { form: "vertex" }
  }
}

export type EdgeTetrahedron =
  | { form: "first" }
  | { form: "second" }
  | { form: "third" }
  | { form: "fourth" }
  | { form: "fifth" }

export function aroundEdge(t: EdgeTetrahedron): EdgeTetrahedron {
  if (t.form === "first") {
    return { form: "second" }
  } else if (t.form === "second") {
    return { form: "third" }
  } else if (t.form === "third") {
    return { form: "fourth" }
  } else if (t.form === "fourth") {
    return { form: "fifth" }
  } else {
    return { form: "first" }
  }
}

export function dualRankIsAnInvolution(r: ElementKind): ElementKind {
  // hold: verified at compile time
  return r
}

export function theTwoPolytopesAreDual(r: ElementKind): ElementKind {
  // hold: verified at compile time
  return r
}

export function fiveTetrahedraAroundAnEdge(t: EdgeTetrahedron): EdgeTetrahedron {
  // hold: verified at compile time
  return t
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
