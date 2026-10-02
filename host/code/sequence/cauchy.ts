export type SetForm =
  | { form: "opaque" }

export interface BinaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface MetricSpace {
  set: SetForm
  distance: BinaryFunction
}

export interface CauchySequence {
  space: MetricSpace
}
