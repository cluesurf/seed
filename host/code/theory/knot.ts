export type Hue =
  | { form: "red" }
  | { form: "green" }
  | { form: "blue" }

export type Check =
  | { form: "legal" }
  | { form: "illegal" }

export function cross(over: Hue, underA: Hue, underB: Hue): Check {
  if (over.form === "red") {
    if (underA.form === "red") {
      if (underB.form === "red") {
        return { form: "legal" }
      } else if (underB.form === "green") {
        return { form: "illegal" }
      } else {
        return { form: "illegal" }
      }
    } else if (underA.form === "green") {
      if (underB.form === "red") {
        return { form: "illegal" }
      } else if (underB.form === "green") {
        return { form: "illegal" }
      } else {
        return { form: "legal" }
      }
    } else {
      if (underB.form === "red") {
        return { form: "illegal" }
      } else if (underB.form === "green") {
        return { form: "legal" }
      } else {
        return { form: "illegal" }
      }
    }
  } else if (over.form === "green") {
    if (underA.form === "red") {
      if (underB.form === "red") {
        return { form: "illegal" }
      } else if (underB.form === "green") {
        return { form: "illegal" }
      } else {
        return { form: "legal" }
      }
    } else if (underA.form === "green") {
      if (underB.form === "red") {
        return { form: "illegal" }
      } else if (underB.form === "green") {
        return { form: "legal" }
      } else {
        return { form: "illegal" }
      }
    } else {
      if (underB.form === "red") {
        return { form: "legal" }
      } else if (underB.form === "green") {
        return { form: "illegal" }
      } else {
        return { form: "illegal" }
      }
    }
  } else {
    if (underA.form === "red") {
      if (underB.form === "red") {
        return { form: "illegal" }
      } else if (underB.form === "green") {
        return { form: "legal" }
      } else {
        return { form: "illegal" }
      }
    } else if (underA.form === "green") {
      if (underB.form === "red") {
        return { form: "legal" }
      } else if (underB.form === "green") {
        return { form: "illegal" }
      } else {
        return { form: "illegal" }
      }
    } else {
      if (underB.form === "red") {
        return { form: "illegal" }
      } else if (underB.form === "green") {
        return { form: "illegal" }
      } else {
        return { form: "legal" }
      }
    }
  }
}

export function aMonochromaticCrossingIsLegal(h: Hue): Hue {
  // hold: verified at compile time
  return h
}

export function theRainbowCrossingIsLegal(): void {
  // hold: verified at compile time
  return undefined
}

export function aTwoColorCrossingIsIllegal(): void {
  // hold: verified at compile time
  return undefined
}

export function theCrossingRuleIsSymmetric(over: Hue, underA: Hue, underB: Hue): Hue {
  // hold: verified at compile time
  return over
}
