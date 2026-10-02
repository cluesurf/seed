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

export function beam(a: Site, b: Site): Line {
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

export function betweennessIsSymmetricInItsEnds(a: Site, b: Site, c: Site): Site {
  const h: boolean = mean(a, b, c)
  const claim: boolean = mean(c, b, a)
  return a
}

export function segmentCongruenceIsTransitive(a: Site, b: Site, c: Site, d: Site, e: Site, f: Site): Site {
  const h1: boolean = twin(bond(a, b), bond(e, f))
  const h2: boolean = twin(bond(c, d), bond(e, f))
  const claim: boolean = twin(bond(a, b), bond(c, d))
  return a
}

export function sideAngleSide(a: Site, b: Site, c: Site, p: Site, q: Site, r: Site): Site {
  const s1: boolean = twin(bond(a, b), bond(p, q))
  const s2: boolean = twin(bond(a, c), bond(p, r))
  const g1: boolean = twin(bend(b, a, c), bend(q, p, r))
  const claim: boolean = twin(face(a, b, c), face(p, q, r))
  return a
}

export function hyperbolicParallelAxiom(p: Site, a: Site, b: Site): Site {
  const off: boolean = meet(p, beam(a, b))
  const claim: boolean = meet(p, beam(a, b))
  return p
}
