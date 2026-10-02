export type Level =
  | { form: "ground" }
  | { form: "more"; prior: Level }

export function up(n: Level): Level {
  return { form: "more", prior: n }
}

export function plus(n: Level, m: Level): Level {
  if (n.form === "ground") {
    return m
  } else {
    const prior = n.prior
    return { form: "more", prior: plus(prior, m) }
  }
}

export type State =
  | { form: "ket"; fill: Level }

export function vacuum(): State {
  return { form: "ket", fill: { form: "ground" } }
}

export function number(s: State): Level {
  if (s.form === "ket") {
    const fill = s.fill
    return fill
  }
}

export type Lowered =
  | { form: "drop"; state: State; radicand: Level }

export function lower(s: State): Lowered {
  if (s.form === "ket") {
    const fill = s.fill
    if (fill.form === "ground") {
      return { form: "drop", state: { form: "ket", fill: { form: "ground" } }, radicand: { form: "ground" } }
    } else {
      const prior = fill.prior
      return { form: "drop", state: { form: "ket", fill: prior }, radicand: { form: "more", prior: prior } }
    }
  }
}

export type Raised =
  | { form: "lift"; state: State; radicand: Level }

export function raise(s: State): Raised {
  if (s.form === "ket") {
    const fill = s.fill
    return { form: "lift", state: { form: "ket", fill: up(fill) }, radicand: up(fill) }
  }
}

export function loweredState(d: Lowered): State {
  if (d.form === "drop") {
    const state = d.state
    return state
  }
}

export function raisedState(r: Raised): State {
  if (r.form === "lift") {
    const state = r.state
    return state
  }
}

export function numberOperatorEigenvalue(n: Level): Level {
  // hold: verified at compile time
  return n
}

export function radicandOfLower(s: State): Level {
  {
    const __at1 = lower(s)
    if (__at1.form === "drop") {
    const radicand = __at1.radicand
    return radicand
  }
  }
}

export function groundStateAnnihilation(): void {
  // hold: verified at compile time
  return undefined
}

export function loweringRadicandIsTheLevel(n: Level): Level {
  // hold: verified at compile time
  return n
}

export function radicandOfRaise(s: State): Level {
  {
    const __at1 = raise(s)
    if (__at1.form === "lift") {
    const radicand = __at1.radicand
    return radicand
  }
  }
}

export function raisingRadicandIsTheNextLevel(n: Level): Level {
  // hold: verified at compile time
  return n
}

export function raiseThenLowerReturnsLevel(n: Level): Level {
  // hold: verified at compile time
  return n
}

export function aAdaggerLevel(s: State): Level {
  return number(loweredState(lower(raisedState(raise(s)))))
}

export function adaggerALevel(s: State): Level {
  return number(raisedState(raise(loweredState(lower(s)))))
}

export function commutatorIsIdentity(n: Level): Level {
  // hold: verified at compile time
  return n
}

export function commutatorAsymmetryAtVacuum(): void {
  // hold: verified at compile time
  return undefined
}

export function energyDoubled(n: Level): Level {
  if (n.form === "ground") {
    return { form: "more", prior: { form: "ground" } }
  } else {
    const prior = n.prior
    return { form: "more", prior: { form: "more", prior: energyDoubled(prior) } }
  }
}

export function zeroPointEnergyIsOneHalf(): void {
  // hold: verified at compile time
  return undefined
}

export function energyStepsByTheQuantum(n: Level): Level {
  // hold: verified at compile time
  return n
}

export function spectrumIsEvenlySpaced(n: Level): Level {
  // hold: verified at compile time
  return n
}

export function firstLevelEnergyIsThreeHalves(): void {
  // hold: verified at compile time
  return undefined
}

export function secondLevelEnergyIsFiveHalves(): void {
  // hold: verified at compile time
  return undefined
}

export function groundIsLeftIdentity(m: Level): Level {
  // hold: verified at compile time
  return m
}

export function groundIsRightIdentity(n: Level): Level {
  // hold: verified at compile time
  return n
}
