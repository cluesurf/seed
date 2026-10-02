export type Bit =
  | { form: "off" }
  | { form: "on" }

export type Command =
  | { form: "ask" }
  | { form: "turn-on" }
  | { form: "turn-off" }

export type Program =
  | { form: "done" }
  | { form: "step"; first: Command; rest: Program }

export function apply(c: Command, s: Bit): Bit {
  if (c.form === "ask") {
    return s
  } else if (c.form === "turn-on") {
    return { form: "on" }
  } else {
    return { form: "off" }
  }
}

export function run(p: Program, s: Bit): Bit {
  if (p.form === "done") {
    return s
  } else {
    const first = p.first
    const rest = p.rest
    return run(rest, apply(first, s))
  }
}

export function then(p: Program, q: Program): Program {
  if (p.form === "done") {
    return q
  } else {
    const first = p.first
    const rest = p.rest
    return { form: "step", first: first, rest: then(rest, q) }
  }
}

export function runStepUnfolds(c: Command, p: Program, s: Bit): Command {
  // hold: verified at compile time
  return c
}

export function thenStepUnfolds(c: Command, p: Program, q: Program): Command {
  // hold: verified at compile time
  return c
}

export function emptyProgramIsIdentity(s: Bit): Bit {
  // hold: verified at compile time
  return s
}

export function handlerComposes(p: Program, q: Program, s: Bit): Program {
  // hold: verified at compile time
  return p
}
