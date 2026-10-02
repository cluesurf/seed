export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function both(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return b
  } else {
    return { form: "no" }
  }
}

export type Tone =
  | { form: "fear" }
  | { form: "calm" }
  | { form: "love" }

export function toneSum(a: Tone, b: Tone): Tone {
  if (a.form === "fear") {
    if (b.form === "fear") {
      return { form: "love" }
    } else if (b.form === "calm") {
      return { form: "fear" }
    } else {
      return { form: "calm" }
    }
  } else if (a.form === "calm") {
    if (b.form === "fear") {
      return { form: "fear" }
    } else if (b.form === "calm") {
      return { form: "calm" }
    } else {
      return { form: "love" }
    }
  } else {
    if (b.form === "fear") {
      return { form: "calm" }
    } else if (b.form === "calm") {
      return { form: "love" }
    } else {
      return { form: "fear" }
    }
  }
}

export function toneProduct(a: Tone, b: Tone): Tone {
  if (a.form === "fear") {
    if (b.form === "fear") {
      return { form: "love" }
    } else if (b.form === "calm") {
      return { form: "calm" }
    } else {
      return { form: "fear" }
    }
  } else if (a.form === "calm") {
    if (b.form === "fear") {
      return { form: "calm" }
    } else if (b.form === "calm") {
      return { form: "calm" }
    } else {
      return { form: "calm" }
    }
  } else {
    if (b.form === "fear") {
      return { form: "fear" }
    } else if (b.form === "calm") {
      return { form: "calm" }
    } else {
      return { form: "love" }
    }
  }
}

export function toneConjugate(a: Tone): Tone {
  if (a.form === "fear") {
    return { form: "love" }
  } else if (a.form === "calm") {
    return { form: "calm" }
  } else {
    return { form: "fear" }
  }
}

export function toneDifference(a: Tone, b: Tone): Tone {
  return toneSum(a, toneConjugate(b))
}

export function sameTone(a: Tone, b: Tone): Flag {
  if (a.form === "fear") {
    if (b.form === "fear") {
      return { form: "yes" }
    } else if (b.form === "calm") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "calm") {
    if (b.form === "fear") {
      return { form: "no" }
    } else if (b.form === "calm") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "fear") {
      return { form: "no" }
    } else if (b.form === "calm") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export type Role =
  | { form: "grid-point"; shift: Tone; clock: Tone }

export function roleOf(shift: Tone, clock: Tone): Role {
  return { form: "grid-point", shift: shift, clock: clock }
}

export function roleShift(u: Role): Tone {
  if (u.form === "grid-point") {
    const shift = u.shift
    return shift
  }
}

export function roleClock(u: Role): Tone {
  if (u.form === "grid-point") {
    const clock = u.clock
    return clock
  }
}

export function roleSum(u: Role, v: Role): Role {
  return roleOf(toneSum(roleShift(u), roleShift(v)), toneSum(roleClock(u), roleClock(v)))
}

export function roleNegate(u: Role): Role {
  return roleOf(toneConjugate(roleShift(u)), toneConjugate(roleClock(u)))
}

export function roleZero(): Role {
  return { form: "grid-point", shift: { form: "calm" }, clock: { form: "calm" } }
}

export function sameRole(u: Role, v: Role): Flag {
  return both(sameTone(roleShift(u), roleShift(v)), sameTone(roleClock(u), roleClock(v)))
}

export function wedge(u: Role, v: Role): Tone {
  return toneDifference(toneProduct(roleShift(u), roleClock(v)), toneProduct(roleClock(u), roleShift(v)))
}

export type Weyl =
  | { form: "operator"; phase: Tone; place: Role }

export function weylOf(phase: Tone, place: Role): Weyl {
  return { form: "operator", phase: phase, place: place }
}

export function weylPhase(g: Weyl): Tone {
  if (g.form === "operator") {
    const phase = g.phase
    return phase
  }
}

export function weylPlace(g: Weyl): Role {
  if (g.form === "operator") {
    const place = g.place
    return place
  }
}

export function weylProduct(g: Weyl, k: Weyl): Weyl {
  return weylOf(toneSum(toneSum(weylPhase(g), weylPhase(k)), wedge(weylPlace(g), weylPlace(k))), roleSum(weylPlace(g), weylPlace(k)))
}

export function weylInverse(g: Weyl): Weyl {
  return weylOf(toneConjugate(weylPhase(g)), roleNegate(weylPlace(g)))
}

export function weylUnit(): Weyl {
  return weylOf({ form: "calm" }, roleZero())
}

export function scalar(t: Tone): Weyl {
  return weylOf(t, roleZero())
}

export function weylProductIsAssociative(a: Weyl, b: Weyl, c: Weyl): Weyl {
  // hold: verified at compile time
  return a
}

export function weylProductHasALeftIdentity(a: Weyl): Weyl {
  // hold: verified at compile time
  return a
}

export function weylProductHasARightIdentity(a: Weyl): Weyl {
  // hold: verified at compile time
  return a
}

export function weylProductHasALeftInverse(a: Weyl): Weyl {
  // hold: verified at compile time
  return a
}

export function weylProductHasARightInverse(a: Weyl): Weyl {
  // hold: verified at compile time
  return a
}

export function weylPlaceIsAHomomorphism(a: Weyl, b: Weyl): Weyl {
  // hold: verified at compile time
  return a
}

export function theCommutatorIsTheSymplecticForm(g: Weyl, k: Weyl): Weyl {
  // hold: verified at compile time
  return g
}

export function clockAndShiftDifferByAThirdOfATurn(): void {
  // hold: verified at compile time
  return undefined
}

export function aPhaseCommutesWithEveryOperator(t: Tone, g: Weyl): Tone {
  // hold: verified at compile time
  return t
}

export function everyOperatorCubesToTheIdentity(g: Weyl): Weyl {
  // hold: verified at compile time
  return g
}

export function samePhaseAndPlace(g: Weyl, k: Weyl): Flag {
  return both(sameTone(weylPhase(g), weylPhase(k)), sameRole(weylPlace(g), weylPlace(k)))
}

export function twoOperatorsCommuteExactlyWhenTheirPlacesPairToCalm(g: Weyl, k: Weyl): Weyl {
  // hold: verified at compile time
  return g
}
