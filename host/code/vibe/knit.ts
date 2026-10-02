export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Sign =
  | { form: "positive" }
  | { form: "negative" }

export type Tone =
  | { form: "fear" }
  | { form: "calm" }
  | { form: "love" }

export function toneConjugate(a: Tone): Tone {
  if (a.form === "fear") {
    return { form: "love" }
  } else if (a.form === "calm") {
    return { form: "calm" }
  } else {
    return { form: "fear" }
  }
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

export type Balance =
  | { form: "minus-four" }
  | { form: "minus-three" }
  | { form: "minus-two" }
  | { form: "minus-one" }
  | { form: "even" }
  | { form: "plus-one" }
  | { form: "plus-two" }
  | { form: "plus-three" }
  | { form: "plus-four" }

export function balanceShift(n: Balance, t: Tone): Balance {
  if (n.form === "minus-four") {
    if (t.form === "fear") {
      return { form: "minus-four" }
    } else if (t.form === "calm") {
      return { form: "minus-four" }
    } else {
      return { form: "minus-three" }
    }
  } else if (n.form === "minus-three") {
    if (t.form === "fear") {
      return { form: "minus-four" }
    } else if (t.form === "calm") {
      return { form: "minus-three" }
    } else {
      return { form: "minus-two" }
    }
  } else if (n.form === "minus-two") {
    if (t.form === "fear") {
      return { form: "minus-three" }
    } else if (t.form === "calm") {
      return { form: "minus-two" }
    } else {
      return { form: "minus-one" }
    }
  } else if (n.form === "minus-one") {
    if (t.form === "fear") {
      return { form: "minus-two" }
    } else if (t.form === "calm") {
      return { form: "minus-one" }
    } else {
      return { form: "even" }
    }
  } else if (n.form === "even") {
    if (t.form === "fear") {
      return { form: "minus-one" }
    } else if (t.form === "calm") {
      return { form: "even" }
    } else {
      return { form: "plus-one" }
    }
  } else if (n.form === "plus-one") {
    if (t.form === "fear") {
      return { form: "even" }
    } else if (t.form === "calm") {
      return { form: "plus-one" }
    } else {
      return { form: "plus-two" }
    }
  } else if (n.form === "plus-two") {
    if (t.form === "fear") {
      return { form: "plus-one" }
    } else if (t.form === "calm") {
      return { form: "plus-two" }
    } else {
      return { form: "plus-three" }
    }
  } else if (n.form === "plus-three") {
    if (t.form === "fear") {
      return { form: "plus-two" }
    } else if (t.form === "calm") {
      return { form: "plus-three" }
    } else {
      return { form: "plus-four" }
    }
  } else {
    if (t.form === "fear") {
      return { form: "plus-three" }
    } else if (t.form === "calm") {
      return { form: "plus-four" }
    } else {
      return { form: "plus-four" }
    }
  }
}

export function totalOfThree(a: Tone, b: Tone, c: Tone): Balance {
  return balanceShift(balanceShift(balanceShift({ form: "even" }, a), b), c)
}

export type DockLine =
  | { form: "slots"; first: Tone; second: Tone; store: Tone }

export function dockLineOf(first: Tone, second: Tone, store: Tone): DockLine {
  return { form: "slots", first: first, second: second, store: store }
}

export function lineFirst(l: DockLine): Tone {
  if (l.form === "slots") {
    const first = l.first
    return first
  }
}

export function lineSecond(l: DockLine): Tone {
  if (l.form === "slots") {
    const second = l.second
    return second
  }
}

export function lineStore(l: DockLine): Tone {
  if (l.form === "slots") {
    const store = l.store
    return store
  }
}

export function conjugateLine(l: DockLine): DockLine {
  return dockLineOf(toneConjugate(lineFirst(l)), toneConjugate(lineSecond(l)), toneConjugate(lineStore(l)))
}

export function lineCharge(l: DockLine): Balance {
  return balanceShift(balanceShift({ form: "even" }, lineFirst(l)), lineSecond(l))
}

export function occupancy(t: Tone): Tone {
  {
    const __at1 = isVibe(t)
    if (__at1.form === "yes") {
    return { form: "love" }
  } else {
    return { form: "calm" }
  }
  }
}

export function lineContent(l: DockLine): Balance {
  return balanceShift(balanceShift({ form: "even" }, occupancy(lineFirst(l))), occupancy(lineSecond(l)))
}

export function lineMomentum(l: DockLine): Balance {
  return balanceShift(balanceShift({ form: "even" }, occupancy(lineFirst(l))), toneConjugate(occupancy(lineSecond(l))))
}

export function lineEnergy(l: DockLine): Balance {
  return balanceShift(totalOfThree(occupancy(lineFirst(l)), occupancy(lineSecond(l)), occupancy(lineStore(l))), occupancy(lineStore(l)))
}

export function isFull(l: DockLine): Flag {
  {
    const __at1 = isVibe(lineFirst(l))
    if (__at1.form === "yes") {
    return isVibe(lineSecond(l))
  } else {
    return { form: "no" }
  }
  }
}

export function contact(l: DockLine): DockLine {
  {
    const __at1 = isFull(l)
    if (__at1.form === "yes") {
    return dockLineOf(lineSecond(l), lineFirst(l), lineStore(l))
  } else {
    return l
  }
  }
}

export function signOfFlag(a: Flag): Sign {
  if (a.form === "yes") {
    return { form: "positive" }
  } else {
    return { form: "negative" }
  }
}

export type ContactKind =
  | { form: "bounce" }
  | { form: "pass" }

export function contactPhase(k: ContactKind, l: DockLine): Sign {
  {
    const __at1 = isFull(l)
    if (__at1.form === "no") {
    return { form: "positive" }
  } else {
    if (k.form === "bounce") {
      return { form: "negative" }
    } else {
      return signOfFlag(sameTone(lineFirst(l), lineSecond(l)))
    }
  }
  }
}

export function contactIsAnInvolution(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function contactConservesLineCharge(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function contactConservesLineContent(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function contactConservesLineEnergy(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function contactConservesLineStore(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function contactAndConjugationCommutes(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function twoLikeVibesKeepTheirTonesUnderTheContact(t: Tone, s: Tone): Tone {
  // hold: verified at compile time
  return t
}

export function thePassGivesTwoLikeVibesPhasePlusOne(t: Tone, s: Tone): Tone {
  if (isVibe(t) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return t
}

export function theBounceGivesTwoLikeVibesPhaseMinusOne(t: Tone, s: Tone): Tone {
  if (isVibe(t) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return t
}

export function aLoneVibeIsUntouchedByTheContact(t: Tone, s: Tone): Tone {
  // hold: verified at compile time
  return t
}

export function holdsAPair(l: DockLine): Flag {
  {
    const __at1 = isVibe(lineFirst(l))
    if (__at1.form === "yes") {
    return sameTone(lineSecond(l), toneConjugate(lineFirst(l)))
  } else {
    return { form: "no" }
  }
  }
}

export function slotsAreCalm(l: DockLine): Flag {
  {
    const __at1 = isVibe(lineFirst(l))
    if (__at1.form === "yes") {
    return { form: "no" }
  } else {
    {
      const __at2 = isVibe(lineSecond(l))
      if (__at2.form === "yes") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
    }
  }
  }
}

export function unmakePair(here: Flag, l: DockLine): DockLine {
  if (here.form === "yes") {
    return dockLineOf({ form: "calm" }, { form: "calm" }, lineFirst(l))
  } else {
    return l
  }
}

export function makePair(here: Flag, l: DockLine): DockLine {
  if (here.form === "yes") {
    return dockLineOf(lineStore(l), toneConjugate(lineStore(l)), { form: "calm" })
  } else {
    return l
  }
}

export function storeMove(l: DockLine): DockLine {
  {
    const __at1 = lineStore(l)
    if (__at1.form === "calm") {
    return unmakePair(holdsAPair(l), l)
  } else if (__at1.form === "love") {
    return makePair(slotsAreCalm(l), l)
  } else {
    return makePair(slotsAreCalm(l), l)
  }
  }
}

export function storeMoveIsAnInvolution(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function storeMoveConservesLineCharge(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function storeMoveConservesLineMomentum(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function storeMoveConservesLineEnergy(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function storeAndConjugationCommutes(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function contactConservesLineMomentum(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function pairCollide(l: DockLine): DockLine {
  if (l.form === "slots") {
    const first = l.first
    const second = l.second
    const store = l.store
    if (first.form === "calm") {
      if (second.form === "calm") {
        return { form: "slots", first: { form: "love" }, second: { form: "fear" }, store: store }
      } else if (second.form === "love") {
        return { form: "slots", first: { form: "love" }, second: { form: "calm" }, store: store }
      } else {
        return { form: "slots", first: { form: "fear" }, second: { form: "calm" }, store: store }
      }
    } else if (first.form === "love") {
      if (second.form === "calm") {
        return { form: "slots", first: { form: "calm" }, second: { form: "love" }, store: store }
      } else if (second.form === "love") {
        return l
      } else {
        return { form: "slots", first: { form: "fear" }, second: { form: "love" }, store: store }
      }
    } else {
      if (second.form === "calm") {
        return { form: "slots", first: { form: "calm" }, second: { form: "fear" }, store: store }
      } else if (second.form === "love") {
        return { form: "slots", first: { form: "calm" }, second: { form: "calm" }, store: store }
      } else {
        return l
      }
    }
  }
}

export function pairUncollide(l: DockLine): DockLine {
  if (l.form === "slots") {
    const first = l.first
    const second = l.second
    const store = l.store
    if (first.form === "calm") {
      if (second.form === "calm") {
        return { form: "slots", first: { form: "fear" }, second: { form: "love" }, store: store }
      } else if (second.form === "love") {
        return { form: "slots", first: { form: "love" }, second: { form: "calm" }, store: store }
      } else {
        return { form: "slots", first: { form: "fear" }, second: { form: "calm" }, store: store }
      }
    } else if (first.form === "love") {
      if (second.form === "calm") {
        return { form: "slots", first: { form: "calm" }, second: { form: "love" }, store: store }
      } else if (second.form === "love") {
        return l
      } else {
        return { form: "slots", first: { form: "calm" }, second: { form: "calm" }, store: store }
      }
    } else {
      if (second.form === "calm") {
        return { form: "slots", first: { form: "calm" }, second: { form: "fear" }, store: store }
      } else if (second.form === "love") {
        return { form: "slots", first: { form: "love" }, second: { form: "fear" }, store: store }
      } else {
        return l
      }
    }
  }
}

export function pairCollideBackwardUndoesForward(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function pairCollideForwardUndoesBackward(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function pairCollideConservesLineCharge(a: DockLine): DockLine {
  // hold: verified at compile time
  return a
}

export function conjugationReversesThePairCollision(l: DockLine): DockLine {
  // hold: verified at compile time
  return l
}

export function thePairCollisionIsNotAnInvolution(): void {
  // hold: verified at compile time
  return undefined
}
