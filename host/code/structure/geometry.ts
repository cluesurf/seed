export interface Site {
  place: any
}

export interface Line {
  place: any
}

export interface Figure {
  place: any
}

export function bond(a: Site, b: Site): Figure {
  return { place: undefined as any }
}

export function beam(a: Site, b: Site): Figure {
  return { place: undefined as any }
}

export function bend(a: Site, b: Site, c: Site): Figure {
  return { place: undefined as any }
}

export function face(a: Site, b: Site, c: Site): Figure {
  return { place: undefined as any }
}

export function twin(left: Figure, rest: Figure): boolean {
  return true
}

export function mean(a: Site, b: Site, c: Site): boolean {
  return true
}

export function meet(a: Site, here: Line): boolean {
  return true
}
