export type SetForm =
  | { form: "opaque" }

export interface RootSystem {
  space: SetForm
  roots: SetForm[]
}
