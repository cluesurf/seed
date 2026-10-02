export type SetForm =
  | { form: "opaque" }

export interface BinaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface UnaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface Ring {
  set: SetForm
  addition: BinaryFunction
  multiplication: BinaryFunction
  negation: UnaryFunction
}

export interface ClusterAlgebra {
  ring: Ring
}
