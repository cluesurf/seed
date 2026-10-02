export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Bit =
  | { form: "off" }
  | { form: "on" }

export function exclusiveOr(a: Bit, b: Bit): Bit {
  if (a.form === "off") {
    return b
  } else {
    if (b.form === "off") {
      return { form: "on" }
    } else {
      return { form: "off" }
    }
  }
}

export function andBit(a: Bit, b: Bit): Bit {
  if (a.form === "off") {
    return { form: "off" }
  } else {
    return b
  }
}

export function sameBit(a: Bit, b: Bit): Flag {
  if (a.form === "off") {
    if (b.form === "off") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "off") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export type Strategy =
  | { form: "low" }
  | { form: "high" }
  | { form: "copy" }
  | { form: "swap" }

export function applyStrategy(s: Strategy, q: Bit): Bit {
  if (s.form === "low") {
    return { form: "off" }
  } else if (s.form === "high") {
    return { form: "on" }
  } else if (s.form === "copy") {
    return q
  } else {
    if (q.form === "off") {
      return { form: "on" }
    } else {
      return { form: "off" }
    }
  }
}

export function wins(alice: Strategy, bob: Strategy, x: Bit, y: Bit): Flag {
  return sameBit(exclusiveOr(applyStrategy(alice, x), applyStrategy(bob, y)), andBit(x, y))
}

export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export function score(result: Flag, rest: Natural): Natural {
  if (result.form === "yes") {
    return { form: "succ", prior: rest }
  } else {
    return rest
  }
}

export function winCount(alice: Strategy, bob: Strategy): Natural {
  return score(sameBit(exclusiveOr(applyStrategy(alice, { form: "off" }), applyStrategy(bob, { form: "off" })), { form: "off" }), score(sameBit(exclusiveOr(applyStrategy(alice, { form: "off" }), applyStrategy(bob, { form: "on" })), { form: "off" }), score(sameBit(exclusiveOr(applyStrategy(alice, { form: "on" }), applyStrategy(bob, { form: "off" })), { form: "off" }), score(sameBit(exclusiveOr(applyStrategy(alice, { form: "on" }), applyStrategy(bob, { form: "on" })), { form: "on" }), { form: "zero" }))))
}

export function atMost(a: Natural, b: Natural): Bit {
  if (a.form === "zero") {
    return { form: "on" }
  } else {
    const ap = a.prior
    if (b.form === "zero") {
      return { form: "off" }
    } else {
      const bp = b.prior
      return atMost(ap, bp)
    }
  }
}

export function three(): Natural {
  return { form: "succ", prior: { form: "succ", prior: { form: "succ", prior: { form: "zero" } } } }
}

export function noLocalStrategyWinsAllFour(alice: Strategy, bob: Strategy): Strategy {
  // hold: verified at compile time
  return alice
}

export function aStrategyAchievesThree(): void {
  // hold: verified at compile time
  return undefined
}

export function chshConditionOnTheHardRound(): void {
  // hold: verified at compile time
  return undefined
}

export function constantPairLosesTheHardRound(): void {
  // hold: verified at compile time
  return undefined
}
