export type SetForm =
  | { form: "opaque" }

export interface TemporalLogic {
  symbols: SetForm
}

export interface LinearTemporalLogic {
  logic: TemporalLogic
}
