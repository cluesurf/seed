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

export interface AbelianGroup {
  group: Group
}

export interface AbelianGroupStack {
  group: AbelianGroup
}
