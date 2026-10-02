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

export interface UnaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface CompositionAlgebra {
  field: Field
  set: SetForm
  multiply: BinaryFunction
  conjugation: UnaryFunction
  norm: UnaryFunction
}

export interface DivisionAlgebra {
  field: Field
  set: SetForm
  multiply: BinaryFunction
  invert: UnaryFunction
}

export interface NormedDivisionAlgebra {
  composition: CompositionAlgebra
  division: DivisionAlgebra
}
