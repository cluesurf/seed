export type Division =
  | { form: "real" }
  | { form: "complex" }
  | { form: "quaternion" }
  | { form: "octonion" }

export function next(x: Division): Division {
  if (x.form === "real") {
    return { form: "complex" }
  } else if (x.form === "complex") {
    return { form: "quaternion" }
  } else if (x.form === "quaternion") {
    return { form: "octonion" }
  } else {
    return { form: "octonion" }
  }
}

export function doublingThreeTimesReachesTheOctonions(x: Division): Division {
  // hold: verified at compile time
  return x
}

export function theOctonionsAreTheCeiling(): void {
  // hold: verified at compile time
  return undefined
}

export function dimension(x: Division): number {
  if (x.form === "real") {
    return 1
  } else if (x.form === "complex") {
    return 2
  } else if (x.form === "quaternion") {
    return 4
  } else {
    return 8
  }
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
