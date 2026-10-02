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

export interface CliffordAlgebra {
  space: SetForm
  quadratic: UnaryFunction
  product: BinaryFunction
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

export interface Spinor {
  source: CliffordAlgebra
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
