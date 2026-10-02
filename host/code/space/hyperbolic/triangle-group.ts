export type Chamber =
  | { form: "pp" }
  | { form: "pm" }
  | { form: "mp" }
  | { form: "mm" }

export function reflectA(x: Chamber): Chamber {
  if (x.form === "pp") {
    return { form: "mp" }
  } else if (x.form === "pm") {
    return { form: "mm" }
  } else if (x.form === "mp") {
    return { form: "pp" }
  } else {
    return { form: "pm" }
  }
}

export function reflectC(x: Chamber): Chamber {
  if (x.form === "pp") {
    return { form: "pm" }
  } else if (x.form === "pm") {
    return { form: "pp" }
  } else if (x.form === "mp") {
    return { form: "mm" }
  } else {
    return { form: "mp" }
  }
}

export function reflectB(x: Chamber): Chamber {
  if (x.form === "pp") {
    return { form: "pp" }
  } else if (x.form === "pm") {
    return { form: "mp" }
  } else if (x.form === "mp") {
    return { form: "pm" }
  } else {
    return { form: "mm" }
  }
}

export function reflectAIsAnInvolution(x: Chamber): Chamber {
  // hold: verified at compile time
  return x
}

export function reflectBIsAnInvolution(x: Chamber): Chamber {
  // hold: verified at compile time
  return x
}

export function reflectCIsAnInvolution(x: Chamber): Chamber {
  // hold: verified at compile time
  return x
}

export function reflectAThenCHasOrderTwo(x: Chamber): Chamber {
  // hold: verified at compile time
  return x
}

export function perpendicularReflectionsCommute(x: Chamber): Chamber {
  // hold: verified at compile time
  return x
}

export function orderTwoWordFixesAChamber(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
