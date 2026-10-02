export type SetForm =
  | { form: "opaque" }

export interface SitdacMachine {
  cells: SetForm
}

export interface SprCycle {
  machine: SitdacMachine
}

export interface SearchPhase {
  machine: SitdacMachine
}

export interface ProcessPhase {
  machine: SitdacMachine
}

export interface RetrievePhase {
  machine: SitdacMachine
}
