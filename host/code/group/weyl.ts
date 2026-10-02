export type SetForm =
  | { form: "opaque" }

export interface CoxeterGroup {
  generators: SetForm
}

export interface WeylGroup {
  reflections: CoxeterGroup
  roots: SetForm
}
