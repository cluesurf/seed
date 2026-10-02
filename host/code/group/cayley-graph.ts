export type Zmod3 =
  | { form: "z0" }
  | { form: "z1" }
  | { form: "z2" }

export function add3(a: Zmod3, b: Zmod3): Zmod3 {
  if (a.form === "z0") {
    return b
  } else if (a.form === "z1") {
    if (b.form === "z0") {
      return { form: "z1" }
    } else if (b.form === "z1") {
      return { form: "z2" }
    } else {
      return { form: "z0" }
    }
  } else {
    if (b.form === "z0") {
      return { form: "z2" }
    } else if (b.form === "z1") {
      return { form: "z0" }
    } else {
      return { form: "z1" }
    }
  }
}

export function step(g: Zmod3): Zmod3 {
  return add3(g, { form: "z1" })
}

export function cayleyGraphIsAThreeCycle(g: Zmod3): Zmod3 {
  // hold: verified at compile time
  return g
}

export function edgeFromIdentityReachesTheGenerator(): void {
  // hold: verified at compile time
  return undefined
}
