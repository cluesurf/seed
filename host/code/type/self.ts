export interface Term {
  shape: any
}

export interface SelfType {
  body: Term
}

export interface SelfIntroduction {
  value: Term
}

export interface SelfElimination {
  value: Term
}

export interface InductiveEncoding {
  type: SelfType
}
