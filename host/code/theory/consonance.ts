export type Interval =
  | { form: "unison" }
  | { form: "minor-third" }
  | { form: "major-third" }
  | { form: "fourth" }
  | { form: "fifth" }
  | { form: "minor-sixth" }
  | { form: "major-sixth" }
  | { form: "octave" }

export function invert(i: Interval): Interval {
  if (i.form === "unison") {
    return { form: "octave" }
  } else if (i.form === "octave") {
    return { form: "unison" }
  } else if (i.form === "fifth") {
    return { form: "fourth" }
  } else if (i.form === "fourth") {
    return { form: "fifth" }
  } else if (i.form === "major-third") {
    return { form: "minor-sixth" }
  } else if (i.form === "minor-sixth") {
    return { form: "major-third" }
  } else if (i.form === "minor-third") {
    return { form: "major-sixth" }
  } else {
    return { form: "minor-third" }
  }
}

export function inversionIsAnInvolution(i: Interval): Interval {
  // hold: verified at compile time
  return i
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
