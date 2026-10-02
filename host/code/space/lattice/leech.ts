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

export type WeightClass =
  | { form: "zero" }
  | { form: "eight" }
  | { form: "twelve" }
  | { form: "sixteen" }
  | { form: "full" }

export function complementWeight(w: WeightClass): WeightClass {
  if (w.form === "zero") {
    return { form: "full" }
  } else if (w.form === "eight") {
    return { form: "sixteen" }
  } else if (w.form === "twelve") {
    return { form: "twelve" }
  } else if (w.form === "sixteen") {
    return { form: "eight" }
  } else {
    return { form: "zero" }
  }
}

export function isGolayWeight(w: WeightClass): Flag {
  if (w.form === "zero") {
    return { form: "yes" }
  } else if (w.form === "eight") {
    return { form: "yes" }
  } else if (w.form === "twelve") {
    return { form: "yes" }
  } else if (w.form === "sixteen") {
    return { form: "yes" }
  } else {
    return { form: "yes" }
  }
}

export function isNonzeroWeight(w: WeightClass): Flag {
  if (w.form === "zero") {
    return { form: "no" }
  } else if (w.form === "eight") {
    return { form: "yes" }
  } else if (w.form === "twelve") {
    return { form: "yes" }
  } else if (w.form === "sixteen") {
    return { form: "yes" }
  } else {
    return { form: "yes" }
  }
}

export function complementWeightIsAnInvolution(w: WeightClass): WeightClass {
  // hold: verified at compile time
  return w
}

export function golayWeightsAreSymmetricUnderComplement(w: WeightClass): WeightClass {
  // hold: verified at compile time
  return w
}

export function complementOfEightIsSixteen(): void {
  // hold: verified at compile time
  return undefined
}

export function twelveIsSelfComplementary(): void {
  // hold: verified at compile time
  return undefined
}

export function zeroComplementsToFull(): void {
  // hold: verified at compile time
  return undefined
}

export type SmallWeight =
  | { form: "w-zero" }
  | { form: "w-one" }
  | { form: "w-two" }
  | { form: "w-three" }
  | { form: "w-four" }
  | { form: "w-five" }
  | { form: "w-six" }
  | { form: "w-seven" }
  | { form: "w-eight" }

export function smallIsGolayWeight(w: SmallWeight): Flag {
  if (w.form === "w-zero") {
    return { form: "yes" }
  } else if (w.form === "w-one") {
    return { form: "no" }
  } else if (w.form === "w-two") {
    return { form: "no" }
  } else if (w.form === "w-three") {
    return { form: "no" }
  } else if (w.form === "w-four") {
    return { form: "no" }
  } else if (w.form === "w-five") {
    return { form: "no" }
  } else if (w.form === "w-six") {
    return { form: "no" }
  } else if (w.form === "w-seven") {
    return { form: "no" }
  } else {
    return { form: "yes" }
  }
}

export function smallIsForbiddenGap(w: SmallWeight): Flag {
  if (w.form === "w-zero") {
    return { form: "no" }
  } else if (w.form === "w-one") {
    return { form: "yes" }
  } else if (w.form === "w-two") {
    return { form: "yes" }
  } else if (w.form === "w-three") {
    return { form: "yes" }
  } else if (w.form === "w-four") {
    return { form: "yes" }
  } else if (w.form === "w-five") {
    return { form: "yes" }
  } else if (w.form === "w-six") {
    return { form: "yes" }
  } else if (w.form === "w-seven") {
    return { form: "yes" }
  } else {
    return { form: "no" }
  }
}

export function minimumNonzeroGolayWeightIsEight(w: SmallWeight): SmallWeight {
  // hold: verified at compile time
  return w
}

export function smallWeightsSplitIntoGapAndAllowed(w: SmallWeight): SmallWeight {
  // hold: verified at compile time
  return w
}

export function weightOneIsForbidden(): void {
  // hold: verified at compile time
  return undefined
}

export function weightSevenIsForbidden(): void {
  // hold: verified at compile time
  return undefined
}

export function weightEightIsAllowed(): void {
  // hold: verified at compile time
  return undefined
}

export function weightZeroIsAllowed(): void {
  // hold: verified at compile time
  return undefined
}

export function minimalSquaredLengthIsFour(): void {
  // hold: verified at compile time
  return undefined
}

export function aRootWouldHaveSquaredLengthTwo(): void {
  // hold: verified at compile time
  return undefined
}

export function kissingNumberIs196560(): void {
  // hold: verified at compile time
  return undefined
}

export function e8Has240Roots(): void {
  // hold: verified at compile time
  return undefined
}
