export type SetForm =
  | { form: "opaque" }

export interface SitdacMachine {
  cells: SetForm
}

export interface AssociativeCell {
  records: SetForm
}

export interface ParallelField {
  cells: SetForm
}
