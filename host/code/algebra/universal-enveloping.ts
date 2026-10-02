export type SetForm =
  | { form: "opaque" }

export interface BinaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface Field {
  set: SetForm
  add: BinaryFunction
  multiply: BinaryFunction
}

export interface LieAlgebra {
  field: Field
  set: SetForm
  bracket: BinaryFunction
}

export interface UniversalEnvelopingAlgebra {
  algebra: LieAlgebra
}
