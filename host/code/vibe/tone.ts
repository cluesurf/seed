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

export function either(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return { form: "yes" }
  } else {
    return b
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

export function calmTone(): Tone {
  return { form: "calm" }
}

export function loveTone(): Tone {
  return { form: "love" }
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

export function toneSumIsAssociative(a: Tone, b: Tone, c: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneSumIsCommutative(a: Tone, b: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneSumHasALeftIdentity(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneSumHasARightIdentity(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneSumHasALeftInverse(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneSumHasARightInverse(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneProductIsAssociative(a: Tone, b: Tone, c: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneProductIsCommutative(a: Tone, b: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneProductHasALeftIdentity(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneProductHasARightIdentity(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneProductDistributesOnTheLeft(a: Tone, b: Tone, c: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneProductDistributesOnTheRight(a: Tone, b: Tone, c: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneConjugateIsAnInvolution(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function toneConjugateIsAHomomorphism(a: Tone, b: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function conjugateIsMultiplyingByFear(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function conjugatePassesThroughAProduct(a: Tone, b: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function everyVibeSquaresToLove(a: Tone): Tone {
  if (isVibe(a) == { form: "yes" }) {
    // hold: verified at compile time
  }
  return a
}

export function aProductIsCalmOnlyThroughACalmFactor(a: Tone, b: Tone): Tone {
  if (toneProduct(a, b) == { form: "calm" }) {
    // hold: verified at compile time
  }
  return a
}

export function threeOfAToneIsCalm(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function everyToneIsItsOwnCube(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function noSquareIsFear(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function twoSquaresVanishOnlyAtCalm(a: Tone, b: Tone): Tone {
  if (toneSum(toneProduct(a, a), toneProduct(b, b)) == { form: "calm" }) {
    // hold: verified at compile time
  }
  return a
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

export function halfCarry(a: Tone, b: Tone): Tone {
  if (a.form === "fear") {
    if (b.form === "fear") {
      return { form: "fear" }
    } else if (b.form === "calm") {
      return { form: "calm" }
    } else {
      return { form: "calm" }
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
      return { form: "calm" }
    } else if (b.form === "calm") {
      return { form: "calm" }
    } else {
      return { form: "love" }
    }
  }
}

export function fullDigit(a: Tone, b: Tone, c: Tone): Tone {
  return toneSum(toneSum(a, b), c)
}

export function fullCarry(a: Tone, b: Tone, c: Tone): Tone {
  return toneSum(halfCarry(a, b), halfCarry(toneSum(a, b), c))
}

export function theFullAdderIsExact(a: Tone, b: Tone, c: Tone): Tone {
  // hold: verified at compile time
  return a
}
