export type SetForm =
  | { form: "opaque" }

export interface TuringMachine {
  states: SetForm
  alphabet: SetForm
}
