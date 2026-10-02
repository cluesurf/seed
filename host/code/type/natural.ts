export interface Term {
  shape: any
}

export interface SelfType {
  body: Term
}

export interface NaturalType {
  encoding: SelfType
}
