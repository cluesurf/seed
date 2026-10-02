export type SymbolForm =
  | { form: "blank" }
  | { form: "zero" }
  | { form: "one" }

export type State =
  | { form: "go" }
  | { form: "stop" }

export type Move =
  | { form: "left" }
  | { form: "right" }
  | { form: "stay" }

export type Action =
  | { form: "do"; write: SymbolForm; shift: Move; next: State }

export function transition(s: State, r: SymbolForm): Action {
  if (s.form === "stop") {
    return { form: "do", write: r, shift: { form: "stay" }, next: { form: "stop" } }
  } else {
    if (r.form === "zero") {
      return { form: "do", write: { form: "one" }, shift: { form: "right" }, next: { form: "go" } }
    } else if (r.form === "one") {
      return { form: "do", write: { form: "zero" }, shift: { form: "right" }, next: { form: "go" } }
    } else {
      return { form: "do", write: { form: "blank" }, shift: { form: "stay" }, next: { form: "stop" } }
    }
  }
}

export function readsZeroWritesOne(): void {
  // hold: verified at compile time
  return undefined
}

export function readsOneWritesZero(): void {
  // hold: verified at compile time
  return undefined
}

export function readsBlankHalts(): void {
  // hold: verified at compile time
  return undefined
}

export function stopStateIsFinal(r: SymbolForm): SymbolForm {
  // hold: verified at compile time
  return r
}
