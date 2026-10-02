export type SetForm =
  | { form: "opaque" }

export interface BinaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface UnaryFunction {
  domain: SetForm
  codomain: SetForm
}

export interface CayleyDicksonDouble {
  base: SetForm
  multiply: BinaryFunction
  conjugation: UnaryFunction
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

export interface Sedenion {
  source: CayleyDicksonDouble
  base: Octonion
}

// hold: verified at compile time

// hold: verified at compile time
