export interface Term {
  shape: any
}

export interface IdentityType {
  space: Term
  left: Term
  right: Term
}

export interface Reflexivity {
  value: Term
}

export interface PathInduction {
  proof: Term
  motive: Term
}

export interface FunctionExtensionality {
  space: Term
}

export interface PairExtensionality {
  space: Term
}

export interface Transport {
  proof: Term
  family: Term
}
