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

export interface OsculatingPlane {
  manifold: RiemannianManifold
}
