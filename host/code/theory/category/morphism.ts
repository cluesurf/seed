export type SetForm =
  | { form: "opaque" }

export interface Category {
  objects: SetForm
  morphisms: SetForm
}

export interface Morphism {
  category: Category
}
