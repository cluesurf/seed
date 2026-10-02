export type SetForm =
  | { form: "opaque" }

export interface SitdacMachine {
  cells: SetForm
}

export interface ResponderSet {
  cells: SetForm
}

export interface SomeOrNoneSignal {
  machine: SitdacMachine
}

export interface BestMatchIndex {
  responders: ResponderSet
}
