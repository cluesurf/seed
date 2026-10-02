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

export interface TopologicalSpace {
  set: SetForm
}

export interface Manifold {
  space: TopologicalSpace
}

export interface LieGroup {
  group: Group
  manifold: Manifold
}
