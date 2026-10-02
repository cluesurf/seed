export interface Term {
  shape: any
}

export interface Couple {
  first: Term
  second: Term
}

export type SetForm =
  | { form: "opaque" }

export interface Multiplicity {
  zero: SetForm
  one: SetForm
  many: SetForm
}

export interface PairType {
  first: Term
  usage: Multiplicity
  second: Term
}

export interface PairIntroduction {
  first: Term
  second: Term
}

export interface FirstProjection {
  couple: Term
}

export interface SecondProjection {
  couple: Term
}

export interface PairLaws {
  couple: Term
}
