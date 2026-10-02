export type Flag =
  | { form: "yes" }
  | { form: "no" }

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

export type LineRing =
  | { form: "docks"; f0: Tone; f1: Tone; f2: Tone; f3: Tone; b0: Tone; b1: Tone; b2: Tone; b3: Tone }

export function ringOf(f0: Tone, f1: Tone, f2: Tone, f3: Tone, b0: Tone, b1: Tone, b2: Tone, b3: Tone): LineRing {
  return { form: "docks", f0: f0, f1: f1, f2: f2, f3: f3, b0: b0, b1: b1, b2: b2, b3: b3 }
}

export function fullDock(f: Tone, b: Tone): Flag {
  {
    const __at1 = isVibe(f)
    if (__at1.form === "yes") {
    return isVibe(b)
  } else {
    return { form: "no" }
  }
  }
}

export function pickAfterContact(full: Flag, keep: Tone, other: Tone): Tone {
  if (full.form === "yes") {
    return other
  } else {
    return keep
  }
}

export function afterContact(keep: Tone, other: Tone): Tone {
  return pickAfterContact(fullDock(keep, other), keep, other)
}

export function contactRing(w: LineRing): LineRing {
  if (w.form === "docks") {
    const f0 = w.f0
    const f1 = w.f1
    const f2 = w.f2
    const f3 = w.f3
    const b0 = w.b0
    const b1 = w.b1
    const b2 = w.b2
    const b3 = w.b3
    return ringOf(afterContact(f0, b0), afterContact(f1, b1), afterContact(f2, b2), afterContact(f3, b3), afterContact(b0, f0), afterContact(b1, f1), afterContact(b2, f2), afterContact(b3, f3))
  }
}

export function streamRing(w: LineRing): LineRing {
  if (w.form === "docks") {
    const f0 = w.f0
    const f1 = w.f1
    const f2 = w.f2
    const f3 = w.f3
    const b0 = w.b0
    const b1 = w.b1
    const b2 = w.b2
    const b3 = w.b3
    return ringOf(f3, f0, f1, f2, b1, b2, b3, b0)
  }
}

export function unstreamRing(w: LineRing): LineRing {
  if (w.form === "docks") {
    const f0 = w.f0
    const f1 = w.f1
    const f2 = w.f2
    const f3 = w.f3
    const b0 = w.b0
    const b1 = w.b1
    const b2 = w.b2
    const b3 = w.b3
    return ringOf(f1, f2, f3, f0, b3, b0, b1, b2)
  }
}

export function beatRing(w: LineRing): LineRing {
  return streamRing(contactRing(w))
}

export function unbeatRing(w: LineRing): LineRing {
  return contactRing(unstreamRing(w))
}

export function theUnbeatUndoesTheBeat(w: LineRing): LineRing {
  // hold: verified at compile time
  return w
}

export function theBeatUndoesTheUnbeat(w: LineRing): LineRing {
  // hold: verified at compile time
  return w
}

export type Heap =
  | { form: "empty-heap" }
  | { form: "one-more"; prior: Heap }

export function countIfSame(same: Flag, n: Heap): Heap {
  if (same.form === "yes") {
    return { form: "one-more", prior: n }
  } else {
    return n
  }
}

export function sameAs(wanted: Tone, t: Tone): Flag {
  if (wanted.form === "love") {
    if (t.form === "love") {
      return { form: "yes" }
    } else if (t.form === "calm") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (wanted.form === "calm") {
    if (t.form === "love") {
      return { form: "no" }
    } else if (t.form === "calm") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (t.form === "love") {
      return { form: "no" }
    } else if (t.form === "calm") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function countTone(wanted: Tone, t: Tone, n: Heap): Heap {
  return countIfSame(sameAs(wanted, t), n)
}

export function ringCount(wanted: Tone, w: LineRing): Heap {
  if (w.form === "docks") {
    const f0 = w.f0
    const f1 = w.f1
    const f2 = w.f2
    const f3 = w.f3
    const b0 = w.b0
    const b1 = w.b1
    const b2 = w.b2
    const b3 = w.b3
    return countTone(wanted, f0, countTone(wanted, f1, countTone(wanted, f2, countTone(wanted, f3, countTone(wanted, b0, countTone(wanted, b1, countTone(wanted, b2, countIfSame(sameAs(wanted, b3), { form: "empty-heap" }))))))))
  }
}

export function theBeatKeepsTheLovesOnTheLine(w: LineRing): LineRing {
  // hold: verified at compile time
  return w
}

export function theBeatKeepsTheFearsOnTheLine(w: LineRing): LineRing {
  // hold: verified at compile time
  return w
}

export function conjugateRing(w: LineRing): LineRing {
  if (w.form === "docks") {
    const f0 = w.f0
    const f1 = w.f1
    const f2 = w.f2
    const f3 = w.f3
    const b0 = w.b0
    const b1 = w.b1
    const b2 = w.b2
    const b3 = w.b3
    return ringOf(toneConjugate(f0), toneConjugate(f1), toneConjugate(f2), toneConjugate(f3), toneConjugate(b0), toneConjugate(b1), toneConjugate(b2), toneConjugate(b3))
  }
}

export function theBeatCommutesWithChargeConjugation(w: LineRing): LineRing {
  // hold: verified at compile time
  return w
}

export function flipVelocities(w: LineRing): LineRing {
  if (w.form === "docks") {
    const f0 = w.f0
    const f1 = w.f1
    const f2 = w.f2
    const f3 = w.f3
    const b0 = w.b0
    const b1 = w.b1
    const b2 = w.b2
    const b3 = w.b3
    return ringOf(b0, b1, b2, b3, f0, f1, f2, f3)
  }
}

export function theVelocityFlipTurnsTheStreamAround(w: LineRing): LineRing {
  // hold: verified at compile time
  return w
}

export function theVelocityFlipCommutesWithTheContact(w: LineRing): LineRing {
  // hold: verified at compile time
  return w
}

export function reverseTime(w: LineRing): LineRing {
  return contactRing(flipVelocities(w))
}

export function unreverseTime(w: LineRing): LineRing {
  return flipVelocities(contactRing(w))
}

export function timeReversalTurnsTheBeatIntoTheUnbeat(w: LineRing): LineRing {
  // hold: verified at compile time
  return w
}

export function mirrorRing(w: LineRing): LineRing {
  if (w.form === "docks") {
    const f0 = w.f0
    const f1 = w.f1
    const f2 = w.f2
    const f3 = w.f3
    const b0 = w.b0
    const b1 = w.b1
    const b2 = w.b2
    const b3 = w.b3
    return ringOf(b0, b3, b2, b1, f0, f3, f2, f1)
  }
}

export function theMirrorIsASymmetryOfTheBeat(w: LineRing): LineRing {
  // hold: verified at compile time
  return w
}

export function aLoneLoveMovesOneDockPerBeat(): void {
  // hold: verified at compile time
  return undefined
}

export function aLoneLoveComesRoundInFourBeats(): void {
  // hold: verified at compile time
  return undefined
}

export function aLoveAndAFearMeetAndTurnBack(): void {
  // hold: verified at compile time
  return undefined
}
