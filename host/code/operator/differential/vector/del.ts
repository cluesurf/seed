export type SetForm =
  | { form: "opaque" }

export interface TopologicalSpace {
  set: SetForm
}

export interface Manifold {
  space: TopologicalSpace
}

export interface RiemannianManifold {
  manifold: Manifold
}

export interface VectorDifferentialOperator {
  manifold: RiemannianManifold
}

export interface DelOperator {
  operator: VectorDifferentialOperator
}
