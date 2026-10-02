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

export function notFlag(a: Flag): Flag {
  if (a.form === "yes") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
}

export function implies(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return b
  } else {
    return { form: "yes" }
  }
}

export type Tone =
  | { form: "fear" }
  | { form: "calm" }
  | { form: "love" }

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

export type Tetrad =
  | { form: "tones-of"; first: Tone; second: Tone; third: Tone; fourth: Tone }

export function tetradOf(first: Tone, second: Tone, third: Tone, fourth: Tone): Tetrad {
  return { form: "tones-of", first: first, second: second, third: third, fourth: fourth }
}

export function tetradFirst(v: Tetrad): Tone {
  if (v.form === "tones-of") {
    const first = v.first
    return first
  }
}

export function tetradSecond(v: Tetrad): Tone {
  if (v.form === "tones-of") {
    const second = v.second
    return second
  }
}

export function tetradThird(v: Tetrad): Tone {
  if (v.form === "tones-of") {
    const third = v.third
    return third
  }
}

export function tetradFourth(v: Tetrad): Tone {
  if (v.form === "tones-of") {
    const fourth = v.fourth
    return fourth
  }
}

export function sameTetrad(v: Tetrad, w: Tetrad): Flag {
  return both(both(sameTone(tetradFirst(v), tetradFirst(w)), sameTone(tetradSecond(v), tetradSecond(w))), both(sameTone(tetradThird(v), tetradThird(w)), sameTone(tetradFourth(v), tetradFourth(w))))
}

export function presence(t: Tone): Tone {
  if (t.form === "fear") {
    return { form: "love" }
  } else if (t.form === "calm") {
    return { form: "calm" }
  } else {
    return { form: "love" }
  }
}

export function support(v: Tetrad): Balance {
  return balanceShift(totalOfThree(presence(tetradFirst(v)), presence(tetradSecond(v)), presence(tetradThird(v))), presence(tetradFourth(v)))
}

export function isSlot(v: Tetrad): Flag {
  {
    const __at1 = support(v)
    if (__at1.form === "minus-four") {
    return { form: "no" }
  } else if (__at1.form === "minus-three") {
    return { form: "no" }
  } else if (__at1.form === "minus-two") {
    return { form: "no" }
  } else if (__at1.form === "minus-one") {
    return { form: "no" }
  } else if (__at1.form === "even") {
    return { form: "no" }
  } else if (__at1.form === "plus-one") {
    return { form: "no" }
  } else if (__at1.form === "plus-two") {
    return { form: "yes" }
  } else if (__at1.form === "plus-three") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
  }
}

export function coordinateSum(v: Tetrad): Balance {
  return balanceShift(totalOfThree(tetradFirst(v), tetradSecond(v), tetradThird(v)), tetradFourth(v))
}

export function isEvenSum(n: Balance): Flag {
  if (n.form === "minus-four") {
    return { form: "yes" }
  } else if (n.form === "minus-three") {
    return { form: "no" }
  } else if (n.form === "minus-two") {
    return { form: "yes" }
  } else if (n.form === "minus-one") {
    return { form: "no" }
  } else if (n.form === "even") {
    return { form: "yes" }
  } else if (n.form === "plus-one") {
    return { form: "no" }
  } else if (n.form === "plus-two") {
    return { form: "yes" }
  } else if (n.form === "plus-three") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
}

export function everySlotIsAStepOfTheD4Lattice(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function noSlotIsTheZeroStep(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}

export function isSmallEven(n: Balance): Flag {
  if (n.form === "minus-four") {
    return { form: "no" }
  } else if (n.form === "minus-three") {
    return { form: "no" }
  } else if (n.form === "minus-two") {
    return { form: "yes" }
  } else if (n.form === "minus-one") {
    return { form: "no" }
  } else if (n.form === "even") {
    return { form: "yes" }
  } else if (n.form === "plus-one") {
    return { form: "no" }
  } else if (n.form === "plus-two") {
    return { form: "yes" }
  } else if (n.form === "plus-three") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
}

export function aStepChangesTheHeightByAtMostTwo(v: Tetrad): Tetrad {
  // hold: verified at compile time
  return v
}
