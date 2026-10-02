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

export function isVibe(a: Tone): Flag {
  if (a.form === "fear") {
    return { form: "yes" }
  } else if (a.form === "calm") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
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

export function roleScale(t: Tone, u: Role): Role {
  return roleOf(toneProduct(t, roleShift(u)), toneProduct(t, roleClock(u)))
}

export function roleIsZero(u: Role): Flag {
  return both(sameTone(roleShift(u), { form: "calm" }), sameTone(roleClock(u), { form: "calm" }))
}

export function sameRole(u: Role, v: Role): Flag {
  return both(sameTone(roleShift(u), roleShift(v)), sameTone(roleClock(u), roleClock(v)))
}

export function wedge(u: Role, v: Role): Tone {
  return toneDifference(toneProduct(roleShift(u), roleClock(v)), toneProduct(roleClock(u), roleShift(v)))
}

export function perp(u: Role): Role {
  return roleOf(toneConjugate(roleClock(u)), roleShift(u))
}

export function roleSumIsAssociative(a: Role, b: Role, c: Role): Role {
  // hold: verified at compile time
  return a
}

export function roleSumIsCommutative(a: Role, b: Role): Role {
  // hold: verified at compile time
  return a
}

export function roleSumHasALeftIdentity(a: Role): Role {
  // hold: verified at compile time
  return a
}

export function roleSumHasARightIdentity(a: Role): Role {
  // hold: verified at compile time
  return a
}

export function roleSumHasALeftInverse(a: Role): Role {
  // hold: verified at compile time
  return a
}

export function roleSumHasARightInverse(a: Role): Role {
  // hold: verified at compile time
  return a
}

export function theWedgeIsAlternating(u: Role): Role {
  // hold: verified at compile time
  return u
}

export function theWedgeIsAntisymmetric(u: Role, v: Role): Role {
  // hold: verified at compile time
  return u
}

export function theWedgeIsAdditive(u: Role, v: Role, w: Role): Role {
  // hold: verified at compile time
  return u
}

export function theWedgeIsHomogeneous(t: Tone, u: Role, v: Role): Tone {
  // hold: verified at compile time
  return t
}

export function theWedgeIsNondegenerate(u: Role): Role {
  if (roleIsZero(u) == { form: "no" }) {
    // hold: verified at compile time
  }
  return u
}

export type Direction =
  | { form: "horizontal" }
  | { form: "vertical" }
  | { form: "diagonal" }
  | { form: "antidiagonal" }

export function directionVector(d: Direction): Role {
  if (d.form === "horizontal") {
    return { form: "grid-point", shift: { form: "love" }, clock: { form: "calm" } }
  } else if (d.form === "vertical") {
    return { form: "grid-point", shift: { form: "calm" }, clock: { form: "love" } }
  } else if (d.form === "diagonal") {
    return { form: "grid-point", shift: { form: "love" }, clock: { form: "love" } }
  } else {
    return { form: "grid-point", shift: { form: "love" }, clock: { form: "fear" } }
  }
}

export function sameDirection(d: Direction, e: Direction): Flag {
  return sameRole(directionVector(d), directionVector(e))
}

export function directionOf(u: Role): Direction {
  if (u.form === "grid-point") {
    const shift = u.shift
    const clock = u.clock
    if (shift.form === "calm") {
      return { form: "vertical" }
    } else if (shift.form === "love") {
      if (clock.form === "fear") {
        return { form: "antidiagonal" }
      } else if (clock.form === "calm") {
        return { form: "horizontal" }
      } else {
        return { form: "diagonal" }
      }
    } else {
      if (clock.form === "fear") {
        return { form: "diagonal" }
      } else if (clock.form === "calm") {
        return { form: "horizontal" }
      } else {
        return { form: "antidiagonal" }
      }
    }
  }
}

export function coefficientOf(u: Role): Tone {
  if (u.form === "grid-point") {
    const shift = u.shift
    const clock = u.clock
    if (shift.form === "calm") {
      return clock
    } else if (shift.form === "love") {
      return { form: "love" }
    } else {
      return { form: "fear" }
    }
  }
}

export function everyNonzeroPointIsAMultipleOfItsDirection(u: Role): Role {
  if (roleIsZero(u) == { form: "no" }) {
    // hold: verified at compile time
  }
  return u
}

export function aPointHasOnlyOneDirection(s: Tone, t: Tone, d: Direction, e: Direction): Tone {
  if (isVibe(s) == { form: "yes" }) {
    if (isVibe(t) == { form: "yes" }) {
      if (roleScale(s, directionVector(d)) == roleScale(t, directionVector(e))) {
        // hold: verified at compile time
      }
    }
  }
  return s
}

export function distinctDirectionsAreTransverse(d: Direction, e: Direction): Direction {
  if (sameDirection(d, e) == { form: "no" }) {
    // hold: verified at compile time
  }
  return d
}

export type StabilizerLine =
  | { form: "through"; direction: Direction; offset: Tone }

export function onLine(l: StabilizerLine, u: Role): Flag {
  if (l.form === "through") {
    const direction = l.direction
    const offset = l.offset
    return sameTone(wedge(directionVector(direction), u), offset)
  }
}

export function aPointLiesOnItsLineOfEachDirection(d: Direction, u: Role): Direction {
  // hold: verified at compile time
  return d
}

export function aPointLiesOnNoOtherParallelLine(d: Direction, c: Tone, u: Role): Direction {
  if (onLine({ form: "through", direction: d, offset: c }, u) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return d
}

export function meetingPoint(d: Direction, c: Tone, e: Direction, k: Tone): Role {
  return roleScale(wedge(directionVector(d), directionVector(e)), roleSum(roleScale(c, directionVector(e)), roleNegate(roleScale(k, directionVector(d)))))
}

export function transverseLinesMeet(d: Direction, c: Tone, e: Direction, k: Tone): Direction {
  if (sameDirection(d, e) == { form: "no" }) {
    // hold: verified at compile time
  }
  return d
}

export function transverseLinesMeetOnce(d: Direction, c: Tone, e: Direction, k: Tone, u: Role): Direction {
  if (sameDirection(d, e) == { form: "no" }) {
    if (onLine({ form: "through", direction: d, offset: c }, u) == { form: "yes" }) {
      if (onLine({ form: "through", direction: e, offset: k }, u) == { form: "yes" }) {
        // hold: verified at compile time
      }
    }
  }
  return d
}

export function linePoint(d: Direction, c: Tone, t: Tone): Role {
  return roleSum(roleScale(toneProduct(c, wedge(directionVector(d), perp(directionVector(d)))), perp(directionVector(d))), roleScale(t, directionVector(d)))
}

export function lineParameter(d: Direction, c: Tone, u: Role): Tone {
  return toneProduct(wedge(directionVector(d), perp(directionVector(d))), wedge(roleSum(u, roleNegate(roleSum(roleScale(toneProduct(c, wedge(directionVector(d), perp(directionVector(d)))), perp(directionVector(d))), roleScale({ form: "calm" }, directionVector(d))))), perp(directionVector(d))))
}

export function everyLinePointIsOnItsLine(d: Direction, c: Tone, t: Tone): Direction {
  // hold: verified at compile time
  return d
}

export function theLineParameterReadsALinePointBack(d: Direction, c: Tone, t: Tone): Direction {
  // hold: verified at compile time
  return d
}

export function everyPointOnALineIsALinePoint(d: Direction, c: Tone, u: Role): Direction {
  if (onLine({ form: "through", direction: d, offset: c }, u) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return d
}

export function twoDistinctPointsSpanALine(u: Role, v: Role): Role {
  if (sameRole(u, v) == { form: "no" }) {
    // hold: verified at compile time
  }
  return u
}
