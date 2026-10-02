export type SetForm =
  | { form: "opaque" }

export interface BinaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface Magma {
  set: SetForm
  operation: BinaryFunction
}
