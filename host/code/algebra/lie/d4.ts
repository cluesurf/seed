export type SetForm =
  | { form: "opaque" }

export interface RootSystem {
  space: SetForm
  roots: SetForm[]
}

export interface D4 {
  roots: RootSystem
}

// hold: verified at compile time

// hold: verified at compile time
