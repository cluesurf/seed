export type SetForm =
  | { form: "opaque" }

export interface FiniteAutomaton {
  states: SetForm
  alphabet: SetForm
}

export interface InputOutputAutomaton {
  control: FiniteAutomaton
}
