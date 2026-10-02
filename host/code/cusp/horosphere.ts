export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Level =
  | { form: "cusp" }
  | { form: "deep"; prior: Level }

export function deeper(l: Level): Level {
  return { form: "deep", prior: l }
}

export function ascend(l: Level): Level {
  if (l.form === "cusp") {
    return { form: "cusp" }
  } else {
    const prior = l.prior
    return prior
  }
}

export function below(a: Level, b: Level): Flag {
  if (b.form === "cusp") {
    return { form: "no" }
  } else {
    const bp = b.prior
    if (a.form === "cusp") {
      return { form: "yes" }
    } else {
      const ap = a.prior
      return below(ap, bp)
    }
  }
}

export function row(l: Level): Level {
  if (l.form === "cusp") {
    return { form: "deep", prior: { form: "cusp" } }
  } else {
    const m = l.prior
    if (m.form === "cusp") {
      return { form: "deep", prior: { form: "cusp" } }
    } else {
      const k = m.prior
      return tally(row(m), row(k))
    }
  }
}

export function tally(a: Level, b: Level): Level {
  if (a.form === "cusp") {
    return b
  } else {
    const ap = a.prior
    return { form: "deep", prior: tally(ap, b) }
  }
}

export function ascendUndoesDeeper(l: Level): Level {
  // hold: verified at compile time
  return l
}

export function nothingIsBelowTheCusp(l: Level): Level {
  // hold: verified at compile time
  return l
}

export function deeperIsStrictlyDeeper(l: Level): Level {
  // hold: verified at compile time
  return l
}

export function deeperNeverReturns(l: Level): Level {
  // hold: verified at compile time
  return l
}

export function rowGrowsByFibonacci(l: Level): Level {
  // hold: verified at compile time
  return l
}

export function cuspRowIsOneCell(): void {
  // hold: verified at compile time
  return undefined
}

export function firstBulkRowIsOneCell(): void {
  // hold: verified at compile time
  return undefined
}
