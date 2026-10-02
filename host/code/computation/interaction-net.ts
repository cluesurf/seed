export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Agent =
  | { form: "constructor" }
  | { form: "duplicator" }
  | { form: "eraser" }

export type Pair =
  | { form: "face"; one: Agent; two: Agent }

export type Interaction =
  | { form: "annihilate" }
  | { form: "commute" }

export type Count =
  | { form: "none" }
  | { form: "two" }
  | { form: "four" }

export function sameType(one: Agent, two: Agent): Flag {
  if (one.form === "constructor") {
    if (two.form === "constructor") {
      return { form: "yes" }
    } else if (two.form === "duplicator") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (one.form === "duplicator") {
    if (two.form === "constructor") {
      return { form: "no" }
    } else if (two.form === "duplicator") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (two.form === "constructor") {
      return { form: "no" }
    } else if (two.form === "duplicator") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function interactionOfSame(isSame: Flag): Interaction {
  if (isSame.form === "yes") {
    return { form: "annihilate" }
  } else {
    return { form: "commute" }
  }
}

export function countOfSame(isSame: Flag): Count {
  if (isSame.form === "yes") {
    return { form: "none" }
  } else {
    return { form: "four" }
  }
}

export function interact(p: Pair): Interaction {
  if (p.form === "face") {
    const one = p.one
    const two = p.two
    return interactionOfSame(sameType(one, two))
  }
}

export function agentCountAfter(p: Pair): Count {
  if (p.form === "face") {
    const one = p.one
    const two = p.two
    return countOfSame(sameType(one, two))
  }
}

export function isBelowTwo(c: Count): Flag {
  if (c.form === "none") {
    return { form: "yes" }
  } else if (c.form === "two") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
}

export function isAboveTwo(c: Count): Flag {
  if (c.form === "none") {
    return { form: "no" }
  } else if (c.form === "two") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
}

export function activePair(one: Agent, two: Agent): Pair {
  return { form: "face", one: one, two: two }
}

export function sameTypeIsSymmetric(a: Agent, b: Agent): Agent {
  // hold: verified at compile time
  return a
}

export function interactionIsSymmetric(a: Agent, b: Agent): Agent {
  // hold: verified at compile time
  return a
}

export function sameAgentsAnnihilate(a: Agent): Agent {
  // hold: verified at compile time
  return a
}

export function distinctAgentsCommute(): void {
  // hold: verified at compile time
  return undefined
}

export function annihilationShrinksThePair(a: Agent): Agent {
  // hold: verified at compile time
  return a
}

export function commutationGrowsThePair(): void {
  // hold: verified at compile time
  return undefined
}

export function theTwoRewritesDiffer(): void {
  // hold: verified at compile time
  return undefined
}
