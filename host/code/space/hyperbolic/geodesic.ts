export type SetForm =
  | { form: "opaque" }

export interface TopologicalSpace {
  set: SetForm
}

export interface Manifold {
  space: TopologicalSpace
}

export interface Geodesic {
  manifold: Manifold
}

export interface LimitingParallel {
  manifold: Manifold
}

export interface Ultraparallel {
  manifold: Manifold
}

export interface GeodesicDivergence {
  manifold: Manifold
}
