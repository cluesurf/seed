export type SetForm =
  | { form: "opaque" }

export interface TopologicalSpace {
  set: SetForm
}

export interface Manifold {
  space: TopologicalSpace
}

export interface Horocycle {
  manifold: Manifold
}

export interface Horosphere {
  manifold: Manifold
}

export interface HorosphericalCoordinates {
  manifold: Manifold
}
