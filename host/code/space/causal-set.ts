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

export type Event =
  | { form: "bottom" }
  | { form: "left" }
  | { form: "right" }
  | { form: "top" }

export function not(a: Flag): Flag {
  if (a.form === "yes") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
}

export function then(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return b
  } else {
    return { form: "yes" }
  }
}

export function isSame(x: Event, y: Event): Flag {
  if (x.form === "bottom") {
    if (y.form === "bottom") {
      return { form: "yes" }
    } else if (y.form === "left") {
      return { form: "no" }
    } else if (y.form === "right") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (x.form === "left") {
    if (y.form === "left") {
      return { form: "yes" }
    } else if (y.form === "bottom") {
      return { form: "no" }
    } else if (y.form === "right") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (x.form === "right") {
    if (y.form === "right") {
      return { form: "yes" }
    } else if (y.form === "bottom") {
      return { form: "no" }
    } else if (y.form === "left") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else {
    if (y.form === "top") {
      return { form: "yes" }
    } else if (y.form === "bottom") {
      return { form: "no" }
    } else if (y.form === "left") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  }
}

export function precedes(x: Event, y: Event): Flag {
  if (x.form === "bottom") {
    return { form: "yes" }
  } else if (x.form === "left") {
    if (y.form === "left") {
      return { form: "yes" }
    } else if (y.form === "top") {
      return { form: "yes" }
    } else if (y.form === "bottom") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (x.form === "right") {
    if (y.form === "right") {
      return { form: "yes" }
    } else if (y.form === "top") {
      return { form: "yes" }
    } else if (y.form === "bottom") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else {
    if (y.form === "top") {
      return { form: "yes" }
    } else if (y.form === "bottom") {
      return { form: "no" }
    } else if (y.form === "left") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  }
}

export function isLink(a: Event, x: Event, b: Event): Flag {
  return both(both(precedes(a, x), precedes(x, b)), both(not(isSame(x, a)), not(isSame(x, b))))
}

export type Tally =
  | { form: "none" }
  | { form: "more"; prior: Tally }

export function addTally(a: Tally, b: Tally): Tally {
  if (a.form === "none") {
    return b
  } else {
    const prior = a.prior
    return { form: "more", prior: addTally(prior, b) }
  }
}

export function flagTally(f: Flag): Tally {
  if (f.form === "yes") {
    return { form: "more", prior: { form: "none" } }
  } else {
    return { form: "none" }
  }
}

export function linkCount(a: Event, x: Event, b: Event): Tally {
  return flagTally(isLink(a, x, b))
}

export function betweenCount(a: Event, b: Event): Tally {
  return addTally(addTally(flagTally(both(both(precedes(a, { form: "bottom" }), { form: "yes" }), both(not(isSame({ form: "bottom" }, a)), not(isSame({ form: "bottom" }, b))))), flagTally(both(both(precedes(a, { form: "left" }), precedes({ form: "left" }, b)), both(not(isSame({ form: "left" }, a)), not(isSame({ form: "left" }, b)))))), addTally(flagTally(both(both(precedes(a, { form: "right" }), precedes({ form: "right" }, b)), both(not(isSame({ form: "right" }, a)), not(isSame({ form: "right" }, b))))), flagTally(both(both(precedes(a, { form: "top" }), precedes({ form: "top" }, b)), both(not(isSame({ form: "top" }, a)), not(isSame({ form: "top" }, b)))))))
}

export function precedesIsReflexive(e: Event): Event {
  // hold: verified at compile time
  return e
}

export function precedesIsTransitive(x: Event, y: Event, z: Event): Event {
  // hold: verified at compile time
  return x
}

export function precedesIsAntisymmetric(x: Event, y: Event): Event {
  // hold: verified at compile time
  return x
}

export function leftDoesNotPrecedeRight(): void {
  // hold: verified at compile time
  return undefined
}

export function rightDoesNotPrecedeLeft(): void {
  // hold: verified at compile time
  return undefined
}

export function bottomPrecedesTop(): void {
  // hold: verified at compile time
  return undefined
}

export function leftIsBetweenBottomAndTop(): void {
  // hold: verified at compile time
  return undefined
}

export function rightIsBetweenBottomAndTop(): void {
  // hold: verified at compile time
  return undefined
}

export function bottomIsNotStrictlyBetweenBottomAndTop(): void {
  // hold: verified at compile time
  return undefined
}

export function topIsNotStrictlyBetweenBottomAndTop(): void {
  // hold: verified at compile time
  return undefined
}

export function bottomToTopIntervalHasTwoEvents(): void {
  // hold: verified at compile time
  return undefined
}

export function leftToRightIntervalIsEmpty(): void {
  // hold: verified at compile time
  return undefined
}

export function bottomToBottomIntervalIsEmpty(): void {
  // hold: verified at compile time
  return undefined
}
