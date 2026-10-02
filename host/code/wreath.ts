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

export interface Group {
  set: SetForm
  operation: BinaryFunction
  inverse: UnaryFunction
}

export interface WreathProduct {
  group: Group
}
