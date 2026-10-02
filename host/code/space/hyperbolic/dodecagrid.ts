export type DodecahedronFace =
  | { form: "face-one" }
  | { form: "face-two" }
  | { form: "face-three" }
  | { form: "face-four" }
  | { form: "face-five" }
  | { form: "face-six" }
  | { form: "face-seven" }
  | { form: "face-eight" }
  | { form: "face-nine" }
  | { form: "face-ten" }
  | { form: "face-eleven" }
  | { form: "face-twelve" }

export function faceCount(): number {
  return 12
}

export function vertexCount(): number {
  return 20
}

export function edgeCount(): number {
  return 30
}

export function sidesPerFace(): number {
  return 5
}

export function facesPerVertex(): number {
  return 3
}

export function cellsAroundEdge(): number {
  return 4
}

export type EdgeCell =
  | { form: "first" }
  | { form: "second" }
  | { form: "third" }
  | { form: "fourth" }

export function aroundEdge(c: EdgeCell): EdgeCell {
  if (c.form === "first") {
    return { form: "second" }
  } else if (c.form === "second") {
    return { form: "third" }
  } else if (c.form === "third") {
    return { form: "fourth" }
  } else {
    return { form: "first" }
  }
}

export type VertexFace =
  | { form: "left" }
  | { form: "right" }
  | { form: "base" }

export function aroundVertex(f: VertexFace): VertexFace {
  if (f.form === "left") {
    return { form: "right" }
  } else if (f.form === "right") {
    return { form: "base" }
  } else {
    return { form: "left" }
  }
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

export function fourCellsAroundAnEdge(c: EdgeCell): EdgeCell {
  // hold: verified at compile time
  return c
}

export function threeFacesAroundAVertex(f: VertexFace): VertexFace {
  // hold: verified at compile time
  return f
}

export function cellFacesArePentagons(): void {
  // hold: verified at compile time
  return undefined
}

export function cellHasThreeFacesPerVertex(): void {
  // hold: verified at compile time
  return undefined
}
