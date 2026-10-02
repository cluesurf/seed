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

export interface Group {
  set: SetForm
  operation: BinaryFunction
  inverse: UnaryFunction
}

export interface AbelianGroup {
  group: Group
}

export interface VectorSpace {
  field: Field
  vectors: AbelianGroup
  action: BinaryFunction
}

export interface ExteriorAlgebra {
  space: VectorSpace
}

export interface Bivector {
  algebra: ExteriorAlgebra
}
