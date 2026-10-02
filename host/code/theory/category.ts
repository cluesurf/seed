export type SetForm =
  | { form: "opaque" }

export interface Category {
  objects: SetForm
  morphisms: SetForm
}
