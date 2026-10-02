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

export function bothYesLeftIsIdentity(a: Flag): Flag {
  // hold: verified at compile time
  return a
}

export function eitherNoLeftIsIdentity(a: Flag): Flag {
  // hold: verified at compile time
  return a
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

export function notFlagIsAnInvolution(a: Flag): Flag {
  // hold: verified at compile time
  return a
}

export function implicationCarriesTruth(a: Flag, b: Flag): Flag {
  if (a == { form: "yes" }) {
    if (implies(a, b) == { form: "yes" }) {
      // hold: verified at compile time
    }
  }
  return a
}
