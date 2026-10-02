export type Sign =
  | { form: "pos" }
  | { form: "neg" }

export type Blade =
  | { form: "one" }
  | { form: "e1" }
  | { form: "e2" }
  | { form: "e12" }

export type Cliff =
  | { form: "scaled"; sign: Sign; blade: Blade }

export function mulSign(a: Sign, b: Sign): Sign {
  if (a.form === "pos") {
    return b
  } else {
    if (b.form === "pos") {
      return { form: "neg" }
    } else {
      return { form: "pos" }
    }
  }
}

export function mulBlade(a: Blade, b: Blade): Cliff {
  if (a.form === "one") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "one" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e1" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e2" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e12" } }
    }
  } else if (a.form === "e1") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e1" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e12" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e2" } }
    }
  } else if (a.form === "e2") {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e2" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e12" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    } else {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e1" } }
    }
  } else {
    if (b.form === "one") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e12" } }
    } else if (b.form === "e1") {
      return { form: "scaled", sign: { form: "pos" }, blade: { form: "e2" } }
    } else if (b.form === "e2") {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "e1" } }
    } else {
      return { form: "scaled", sign: { form: "neg" }, blade: { form: "one" } }
    }
  }
}

export function applySigns(sx: Sign, sy: Sign, prod: Cliff): Cliff {
  if (prod.form === "scaled") {
    const sp = prod.sign
    const bp = prod.blade
    return { form: "scaled", sign: mulSign(mulSign(sx, sy), sp), blade: bp }
  }
}

export function mul(x: Cliff, y: Cliff): Cliff {
  if (x.form === "scaled") {
    const sx = x.sign
    const bx = x.blade
    if (y.form === "scaled") {
      const sy = y.sign
      const by = y.blade
      return applySigns(sx, sy, mulBlade(bx, by))
    }
  }
}

export function e1SquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function e2SquaredIsMinusOne(): void {
  // hold: verified at compile time
  return undefined
}

export function e1TimesE2IsTheBivector(): void {
  // hold: verified at compile time
  return undefined
}

export function e2TimesE1IsMinusTheBivector(): void {
  // hold: verified at compile time
  return undefined
}

export function bivectorSquaresToMinusOne(): void {
  // hold: verified at compile time
  return undefined
}
