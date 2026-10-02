export type SetForm =
  | { form: "opaque" }

export interface BinaryFunction {
  left: SetForm
  right: SetForm
  codomain: SetForm
}
