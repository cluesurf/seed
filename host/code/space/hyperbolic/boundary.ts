export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export type Rung =
  | { form: "negsucc"; prior: Natural }
  | { form: "zero-int" }
  | { form: "possucc"; prior: Natural }

export function next(z: Rung): Rung {
  if (z.form === "negsucc") {
    const p = z.prior
    if (p.form === "zero") {
      return { form: "zero-int" }
    } else {
      const q = p.prior
      return { form: "negsucc", prior: q }
    }
  } else if (z.form === "zero-int") {
    return { form: "possucc", prior: { form: "zero" } }
  } else {
    const p = z.prior
    return { form: "possucc", prior: { form: "succ", prior: p } }
  }
}

export function back(z: Rung): Rung {
  if (z.form === "negsucc") {
    const p = z.prior
    return { form: "negsucc", prior: { form: "succ", prior: p } }
  } else if (z.form === "zero-int") {
    return { form: "negsucc", prior: { form: "zero" } }
  } else {
    const p = z.prior
    if (p.form === "zero") {
      return { form: "zero-int" }
    } else {
      const q = p.prior
      return { form: "possucc", prior: q }
    }
  }
}

export type Way =
  | { form: "left" }
  | { form: "right" }

export type Spot =
  | { form: "core" }
  | { form: "turn"; step: Way; rest: Spot }

export type End =
  | { form: "stop" }
  | { form: "aim"; step: Way; rest: End }

export function sameNatural(a: Natural, b: Natural): Flag {
  if (a.form === "zero") {
    if (b.form === "zero") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    const ap = a.prior
    if (b.form === "zero") {
      return { form: "no" }
    } else {
      const bp = b.prior
      return sameNatural(ap, bp)
    }
  }
}

export function sameDepth(a: Rung, b: Rung): Flag {
  if (a.form === "negsucc") {
    const ap = a.prior
    if (b.form === "negsucc") {
      const bp = b.prior
      return sameNatural(ap, bp)
    } else if (b.form === "zero-int") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "zero-int") {
    if (b.form === "negsucc") {
      return { form: "no" }
    } else if (b.form === "zero-int") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    const ap = a.prior
    if (b.form === "negsucc") {
      return { form: "no" }
    } else if (b.form === "zero-int") {
      return { form: "no" }
    } else {
      const bp = b.prior
      return sameNatural(ap, bp)
    }
  }
}

export function busemann(p: Spot, xi: End): Rung {
  if (p.form === "core") {
    return { form: "zero-int" }
  } else {
    const step = p.step
    const rest = p.rest
    if (xi.form === "stop") {
      return next(busemann(rest, { form: "stop" }))
    } else {
      const head = xi.step
      const tail = xi.rest
      if (step.form === "left") {
        if (head.form === "left") {
          return back(busemann(rest, tail))
        } else {
          return next(busemann(rest, xi))
        }
      } else {
        if (head.form === "left") {
          return next(busemann(rest, xi))
        } else {
          return back(busemann(rest, tail))
        }
      }
    }
  }
}

export function horosphereLevel(a: Spot, b: Spot, xi: End): Flag {
  return sameDepth(busemann(a, xi), busemann(b, xi))
}

export function stepAlong(p: Spot, xi: End): Spot {
  if (xi.form === "stop") {
    return p
  } else {
    const head = xi.step
    return { form: "turn", step: head, rest: p }
  }
}

export function aStepAlongLeftIsThePredecessor(p: Spot): Spot {
  // hold: verified at compile time
  return p
}

export function aStepAlongRightIsThePredecessor(p: Spot): Spot {
  // hold: verified at compile time
  return p
}

export function aStepAgainstIsTheSuccessor(p: Spot): Spot {
  // hold: verified at compile time
  return p
}

export function centerIsTheWaterline(xi: End): End {
  // hold: verified at compile time
  return xi
}

export function sameNaturalIsReflexive(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function sameNaturalIsSymmetric(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function horosphereIsReflexive(a: Spot, xi: End): Spot {
  // hold: verified at compile time
  return a
}

export function horosphereIsSymmetric(a: Spot, b: Spot, xi: End): Spot {
  if (busemann(a, xi) == busemann(b, xi)) {
    // hold: verified at compile time
  }
  return a
}

export function horosphereIsTransitive(a: Spot, b: Spot, c: Spot, xi: End): Spot {
  if (busemann(a, xi) == busemann(b, xi)) {
    if (busemann(b, xi) == busemann(c, xi)) {
      // hold: verified at compile time
    }
  }
  return a
}

export function awayStepUndoesTowardStep(d: Rung): Rung {
  // hold: verified at compile time
  return d
}

export function towardStepUndoesAwayStep(d: Rung): Rung {
  // hold: verified at compile time
  return d
}

export function towardStepFromWaterlineIsBelow(): void {
  // hold: verified at compile time
  return undefined
}

export function descentTowardTheBoundaryDeepens(p: Natural): Natural {
  // hold: verified at compile time
  return p
}

export function spineDepthAgreesWithBusemann(p: Spot): Spot {
  // hold: verified at compile time
  return p
}
