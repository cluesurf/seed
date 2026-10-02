export type SetForm =
  | { form: "opaque" }

export interface BinaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface JordanAlgebra {
  set: SetForm
  product: BinaryFunction
}
