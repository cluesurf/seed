export type SetForm =
  | { form: "opaque" }

export interface SitdacMachine {
  cells: SetForm
}

export interface SprCycle {
  machine: SitdacMachine
}

export interface ContentAddressableMemory {
  cycle: SprCycle
}

export interface Association {
  fields: SetForm
}

export interface StructureCode {
  records: SetForm
}
