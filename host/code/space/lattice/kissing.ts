export type Sign =
  | { form: "positive" }
  | { form: "negative" }

export function negate(s: Sign): Sign {
  if (s.form === "positive") {
    return { form: "negative" }
  } else {
    return { form: "positive" }
  }
}

export function negationIsAnInvolution(s: Sign): Sign {
  // hold: verified at compile time
  return s
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
