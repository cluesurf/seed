export type SetForm =
  | { form: "opaque" }

export interface Multiplicity {
  zero: SetForm
  one: SetForm
  many: SetForm
}

export interface MultiplicityAddition {
  carrier: Multiplicity
}

export interface MultiplicityMultiplication {
  carrier: Multiplicity
}

export interface MultiplicityFit {
  carrier: Multiplicity
}
