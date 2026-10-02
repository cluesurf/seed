export type SetForm =
  | { form: "opaque" }

export interface TopologicalSpace {
  set: SetForm
}

export interface TopologicalManifold {
  space: TopologicalSpace
}
