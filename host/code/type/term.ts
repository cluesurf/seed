export interface Term {
  shape: any
}

export interface Variable {
  index: Natural
}

export interface Hole {
  mark: Natural
}

export interface Constant {
  name: string
}

export interface Sort {
  level: Natural
}

export interface Lambda {
  body: Term
}

export interface Application {
  target: Term
  input: Term
}

export interface Annotation {
  subject: Term
  signature: Term
}

export interface Reflection {
  space: Term
  value: Term
}

export interface Journey {
  proof: Term
  motive: Term
  base: Term
}

export interface Couple {
  first: Term
  second: Term
}

export interface Front {
  couple: Term
}

export interface Back {
  couple: Term
}
