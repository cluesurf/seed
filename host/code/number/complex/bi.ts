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

export interface Field {
  set: SetForm
  add: BinaryFunction
  multiply: BinaryFunction
}

export interface CompositionAlgebra {
  field: Field
  set: SetForm
  multiply: BinaryFunction
  conjugation: UnaryFunction
  norm: UnaryFunction
}

export interface DivisionAlgebra {
  field: Field
  set: SetForm
  multiply: BinaryFunction
  invert: UnaryFunction
}

export interface NormedDivisionAlgebra {
  composition: CompositionAlgebra
  division: DivisionAlgebra
}

export interface Complex {
  source: CayleyDicksonDouble
  algebra: NormedDivisionAlgebra
}

// hold: verified at compile time

export interface Bicomplex {
  source: Complex
}
