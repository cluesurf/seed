export type SetForm =
  | { form: "opaque" }

export interface Category {
  objects: SetForm
  morphisms: SetForm
}

export interface Functor {
  source: Category
  target: Category
}

export interface Monad {
  endofunctor: Functor
}
