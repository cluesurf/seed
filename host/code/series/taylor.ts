export type SetForm =
  | { form: "opaque" }

export interface TopologicalSpace {
  set: SetForm
}

export interface Manifold {
  space: TopologicalSpace
}

export interface AnalyticManifold {
  manifold: Manifold
}

export interface TaylorSeries {
  domain: AnalyticManifold
}
