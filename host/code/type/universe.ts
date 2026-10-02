export type SetForm =
  | { form: "opaque" }

export interface Level {
  floor: SetForm
  variables: SetForm
}

export interface Universe {
  level: Level
}

export interface Cumulativity {
  level: Level
}

export interface UniversePolymorphism {
  level: Level
}

export interface ImpredicativeBottom {
  level: Level
}
