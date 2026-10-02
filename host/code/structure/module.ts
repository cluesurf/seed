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

export interface Group {
  set: SetForm
  operation: BinaryFunction
  inverse: UnaryFunction
}

export interface AbelianGroup {
  group: Group
}

export interface Module {
  ring: Ring
  group: AbelianGroup
  action: BinaryFunction
}
