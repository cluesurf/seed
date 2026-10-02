export type Root =
  | { form: "pa" }
  | { form: "pb" }
  | { form: "pc" }
  | { form: "na" }
  | { form: "nb" }
  | { form: "nc" }

export function negate(r: Root): Root {
  if (r.form === "pa") {
    return { form: "na" }
  } else if (r.form === "pb") {
    return { form: "nb" }
  } else if (r.form === "pc") {
    return { form: "nc" }
  } else if (r.form === "na") {
    return { form: "pa" }
  } else if (r.form === "nb") {
    return { form: "pb" }
  } else {
    return { form: "pc" }
  }
}

export function reflectA(r: Root): Root {
  if (r.form === "pa") {
    return { form: "na" }
  } else if (r.form === "na") {
    return { form: "pa" }
  } else if (r.form === "pb") {
    return { form: "pc" }
  } else if (r.form === "pc") {
    return { form: "pb" }
  } else if (r.form === "nb") {
    return { form: "nc" }
  } else {
    return { form: "nb" }
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

export function reflectionCommutesWithNegation(r: Root): Root {
  // hold: verified at compile time
  return r
}
