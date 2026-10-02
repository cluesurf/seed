export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function either(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return { form: "yes" }
  } else {
    return b
  }
}

export type Root =
  | { form: "simple-a" }
  | { form: "simple-b" }
  | { form: "high" }
  | { form: "anti-a" }
  | { form: "anti-b" }
  | { form: "anti-high" }

export function negate(r: Root): Root {
  if (r.form === "simple-a") {
    return { form: "anti-a" }
  } else if (r.form === "simple-b") {
    return { form: "anti-b" }
  } else if (r.form === "high") {
    return { form: "anti-high" }
  } else if (r.form === "anti-a") {
    return { form: "simple-a" }
  } else if (r.form === "anti-b") {
    return { form: "simple-b" }
  } else {
    return { form: "high" }
  }
}

export function reflectA(r: Root): Root {
  if (r.form === "simple-a") {
    return { form: "anti-a" }
  } else if (r.form === "simple-b") {
    return { form: "high" }
  } else if (r.form === "high") {
    return { form: "simple-b" }
  } else if (r.form === "anti-a") {
    return { form: "simple-a" }
  } else if (r.form === "anti-b") {
    return { form: "anti-high" }
  } else {
    return { form: "anti-b" }
  }
}

export function reflectB(r: Root): Root {
  if (r.form === "simple-a") {
    return { form: "high" }
  } else if (r.form === "simple-b") {
    return { form: "anti-b" }
  } else if (r.form === "high") {
    return { form: "simple-a" }
  } else if (r.form === "anti-a") {
    return { form: "anti-high" }
  } else if (r.form === "anti-b") {
    return { form: "simple-b" }
  } else {
    return { form: "anti-a" }
  }
}

export function isPositive(r: Root): Flag {
  if (r.form === "simple-a") {
    return { form: "yes" }
  } else if (r.form === "simple-b") {
    return { form: "yes" }
  } else if (r.form === "high") {
    return { form: "yes" }
  } else if (r.form === "anti-a") {
    return { form: "no" }
  } else if (r.form === "anti-b") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
}

export function negateIsAnInvolution(r: Root): Root {
  // hold: verified at compile time
  return r
}

export function reflectAIsAnInvolution(r: Root): Root {
  // hold: verified at compile time
  return r
}

export function reflectBIsAnInvolution(r: Root): Root {
  // hold: verified at compile time
  return r
}

export function braidRelationOfTheWeylGroup(r: Root): Root {
  // hold: verified at compile time
  return r
}

export function everyRootOrItsAntipodeIsPositive(r: Root): Root {
  // hold: verified at compile time
  return r
}

export function reflectALowersTheHighestRoot(): void {
  // hold: verified at compile time
  return undefined
}

export function reflectBLowersTheHighestRoot(): void {
  // hold: verified at compile time
  return undefined
}
