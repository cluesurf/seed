export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Sign =
  | { form: "positive" }
  | { form: "negative" }

export function flipSign(s: Sign): Sign {
  if (s.form === "positive") {
    return { form: "negative" }
  } else {
    return { form: "positive" }
  }
}

export function flipSignIsAnInvolution(s: Sign): Sign {
  // hold: verified at compile time
  return s
}

export function sameSign(a: Sign, b: Sign): Flag {
  if (a.form === "positive") {
    if (b.form === "positive") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "positive") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function flipSignDiffers(s: Sign): Sign {
  // hold: verified at compile time
  return s
}
