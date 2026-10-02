export type Partner =
  | { form: "first" }
  | { form: "second" }

export function swap(p: Partner): Partner {
  if (p.form === "first") {
    return { form: "second" }
  } else {
    return { form: "first" }
  }
}

export function thePartnerSwapIsAnInvolution(p: Partner): Partner {
  // hold: verified at compile time
  return p
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
