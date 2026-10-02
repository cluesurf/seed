export interface Term {
  shape: any
}

export type SetForm =
  | { form: "opaque" }

export interface Multiplicity {
  zero: SetForm
  one: SetForm
  many: SetForm
}

export interface FunctionType {
  domain: Term
  usage: Multiplicity
  codomain: Term
}

export interface LambdaAbstraction {
  body: Term
}

export interface FunctionApplication {
  target: Term
  input: Term
}

export interface BetaReduction {
  redex: FunctionApplication
}

export interface EtaLaw {
  function: Term
}
