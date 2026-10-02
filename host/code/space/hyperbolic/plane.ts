export type SetForm =
  | { form: "opaque" }

export interface TopologicalSpace {
  set: SetForm
}

export interface Manifold {
  space: TopologicalSpace
}

export interface HyperbolicPlane {
  manifold: Manifold
}

export interface ThinTriangle {
  plane: HyperbolicPlane
}

export interface ExponentialMeasure {
  plane: HyperbolicPlane
}

export interface HyperbolicIsometryGroup {
  plane: HyperbolicPlane
}
