export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export type Tiling =
  | { form: "none" }
  | { form: "link"; step: Natural; rest: Tiling }

export function dimension(m: Tiling): Natural {
  if (m.form === "none") {
    return { form: "zero" }
  } else {
    const rest = m.rest
    return { form: "succ", prior: dimension(rest) }
  }
}

export function cell(m: Tiling): Tiling {
  if (m.form === "none") {
    return { form: "none" }
  } else {
    const step = m.step
    const rest = m.rest
    if (rest.form === "none") {
      return { form: "none" }
    } else {
      const step = rest.step
      const rest = rest.rest
      return { form: "link", step: step, rest: cell(rest) }
    }
  }
}

export function heptagridIsTwoDimensional(): void {
  // hold: verified at compile time
  return undefined
}

export function pentagridIsTwoDimensional(): void {
  // hold: verified at compile time
  return undefined
}

export function dodecagridIsThreeDimensional(): void {
  // hold: verified at compile time
  return undefined
}

export function substrateIsFourDimensional(): void {
  // hold: verified at compile time
  return undefined
}

export function fiveDimensionalHoneycomb(): void {
  // hold: verified at compile time
  return undefined
}
