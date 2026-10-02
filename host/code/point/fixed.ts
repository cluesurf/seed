export type SetForm =
  | { form: "opaque" }

export interface UnaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface FixedPoint {
  map: UnaryFunction
}
