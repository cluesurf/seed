export type SetForm =
  | { form: "opaque" }

export interface TopologicalSpace {
  set: SetForm
}

export interface Manifold {
  space: TopologicalSpace
}

export interface PoincareDisk {
  space: Manifold
  boundary: SetForm
}

export interface UpperHalfSpace {
  space: Manifold
  boundary: SetForm
}

export interface KleinModel {
  space: Manifold
  boundary: SetForm
}

export interface HyperboloidModel {
  ambient: Manifold
}

export interface HyperbolicModels {
  disk: PoincareDisk
  halfSpace: UpperHalfSpace
  klein: KleinModel
  hyperboloid: HyperboloidModel
}
