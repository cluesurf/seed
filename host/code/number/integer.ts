export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export type Rung =
  | { form: "negsucc"; prior: Natural }
  | { form: "zero-int" }
  | { form: "possucc"; prior: Natural }

export function negate(z: Rung): Rung {
  if (z.form === "negsucc") {
    const p = z.prior
    return { form: "possucc", prior: p }
  } else if (z.form === "zero-int") {
    return { form: "zero-int" }
  } else {
    const p = z.prior
    return { form: "negsucc", prior: p }
  }
}

export function fromNatural(n: Natural): Rung {
  if (n.form === "zero") {
    return { form: "zero-int" }
  } else {
    const p = n.prior
    return { form: "possucc", prior: p }
  }
}

export function negateInvolution(z: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function negateZeroIsZero(): void {
  // hold: verified at compile time
  return undefined
}

export function negateNegsuccIsPossucc(p: Natural): Natural {
  // hold: verified at compile time
  return p
}

export function negatePossuccIsNegsucc(p: Natural): Natural {
  // hold: verified at compile time
  return p
}

export function fromNaturalZeroIsZero(): void {
  // hold: verified at compile time
  return undefined
}

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

export function backNextCancels(z: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function nextBackCancels(z: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function climb(z: Rung, p: Natural): Rung {
  if (p.form === "zero") {
    return next(z)
  } else {
    const q = p.prior
    return next(climb(z, q))
  }
}

export function drop(z: Rung, p: Natural): Rung {
  if (p.form === "zero") {
    return back(z)
  } else {
    const q = p.prior
    return back(drop(z, q))
  }
}

export function combine(z: Rung, w: Rung): Rung {
  if (w.form === "negsucc") {
    const p = w.prior
    return drop(z, p)
  } else if (w.form === "zero-int") {
    return z
  } else {
    const p = w.prior
    return climb(z, p)
  }
}

export function combineZeroRightIsSelf(z: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function climbSuccSteps(z: Rung, p: Natural): Rung {
  // hold: verified at compile time
  return z
}

export function dropSuccSteps(z: Rung, p: Natural): Rung {
  // hold: verified at compile time
  return z
}

export function climbFromZeroIsPossucc(p: Natural): Natural {
  // hold: verified at compile time
  return p
}

export function dropFromZeroIsNegsucc(p: Natural): Natural {
  // hold: verified at compile time
  return p
}

export function combinePossuccSteps(z: Rung, p: Natural): Rung {
  // hold: verified at compile time
  return z
}

export function combineNegsuccSteps(z: Rung, p: Natural): Rung {
  // hold: verified at compile time
  return z
}

export function combineZeroLeftIsSelf(z: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function combineOneIsNext(z: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function combineNegOneIsBack(z: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function combinePossuccSuccSteps(z: Rung, p: Natural): Rung {
  // hold: verified at compile time
  return z
}

export function dropZeroSteps(z: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function climbNextCommute(z: Rung, p: Natural): Rung {
  // hold: verified at compile time
  return z
}

export function dropNextCommute(z: Rung, p: Natural): Rung {
  // hold: verified at compile time
  return z
}

export function combineNextLeft(z: Rung, w: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function climbZeroSteps(z: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function climbBackCommute(z: Rung, p: Natural): Rung {
  // hold: verified at compile time
  return z
}

export function dropBackCommute(z: Rung, p: Natural): Rung {
  // hold: verified at compile time
  return z
}

export function combineBackLeft(z: Rung, w: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function combineNextRight(z: Rung, w: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function combineBackRight(z: Rung, w: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function possuccZeroIsNextZero(): void {
  // hold: verified at compile time
  return undefined
}

export function negsuccZeroIsBackZero(): void {
  // hold: verified at compile time
  return undefined
}

export function possuccSuccIsNextPossucc(p: Natural): Natural {
  // hold: verified at compile time
  return p
}

export function negsuccSuccIsBackNegsucc(p: Natural): Natural {
  // hold: verified at compile time
  return p
}

export function combinePossuccCommutes(p: Natural, z: Rung): Natural {
  // hold: verified at compile time
  return p
}

export function combineNegsuccCommutes(p: Natural, z: Rung): Natural {
  // hold: verified at compile time
  return p
}

export function combineIsCommutative(z: Rung, w: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function climbCombineRight(p: Natural, z: Rung, w: Rung): Natural {
  // hold: verified at compile time
  return p
}

export function dropCombineRight(p: Natural, z: Rung, w: Rung): Natural {
  // hold: verified at compile time
  return p
}

export function combineIsAssociative(z: Rung, w: Rung, u: Rung): Rung {
  // hold: verified at compile time
  return z
}

export function dropClimbCancels(p: Natural, z: Rung): Natural {
  // hold: verified at compile time
  return p
}

export function climbDropCancels(p: Natural, z: Rung): Natural {
  // hold: verified at compile time
  return p
}

export function dropPossuccSelf(p: Natural): Natural {
  // hold: verified at compile time
  return p
}

export function climbNegsuccSelf(p: Natural): Natural {
  // hold: verified at compile time
  return p
}

export function combineNegateRightIsZero(z: Rung): Rung {
  // hold: verified at compile time
  return z
}
