export type SetForm =
  | { form: "opaque" }

export interface BinaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface TotalOrder {
  set: SetForm
  relation: BinaryFunction
}
