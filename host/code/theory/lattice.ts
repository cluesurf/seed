export type SetForm =
  | { form: "opaque" }

export interface BinaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface Lattice {
  set: SetForm
  join: BinaryFunction
  meet: BinaryFunction
}
