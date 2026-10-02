export type SetForm =
  | { form: "opaque" }

export interface CellularAutomaton {
  states: SetForm
}

export interface SubstrateComputer {
  automaton: CellularAutomaton
}
