export type SetForm =
  | { form: "opaque" }

export interface FiniteAutomaton {
  states: SetForm
  alphabet: SetForm
}

export interface TimedAutomaton {
  control: FiniteAutomaton
}
