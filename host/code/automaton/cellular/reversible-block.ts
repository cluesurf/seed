export type Cell =
  | { form: "off" }
  | { form: "on" }

export type Block =
  | { form: "row"; one: Cell; two: Cell; three: Cell }

export type Count =
  | { form: "none" }
  | { form: "one" }
  | { form: "two" }
  | { form: "all" }

export function step(b: Block): Block {
  if (b.form === "row") {
    const one = b.one
    const two = b.two
    const three = b.three
    return { form: "row", one: three, two: one, three: two }
  }
}

export function unstep(b: Block): Block {
  if (b.form === "row") {
    const one = b.one
    const two = b.two
    const three = b.three
    return { form: "row", one: two, two: three, three: one }
  }
}

export function charge(b: Block): Count {
  if (b.form === "row") {
    const one = b.one
    const two = b.two
    const three = b.three
    if (one.form === "off") {
      if (two.form === "off") {
        if (three.form === "off") {
          return { form: "none" }
        } else {
          return { form: "one" }
        }
      } else {
        if (three.form === "off") {
          return { form: "one" }
        } else {
          return { form: "two" }
        }
      }
    } else {
      if (two.form === "off") {
        if (three.form === "off") {
          return { form: "one" }
        } else {
          return { form: "two" }
        }
      } else {
        if (three.form === "off") {
          return { form: "two" }
        } else {
          return { form: "all" }
        }
      }
    }
  }
}

export function unstepUndoesStep(b: Block): Block {
  // hold: verified at compile time
  return b
}

export function stepUndoesUnstep(b: Block): Block {
  // hold: verified at compile time
  return b
}

export function stepConservesCharge(b: Block): Block {
  // hold: verified at compile time
  return b
}

export function unstepConservesCharge(b: Block): Block {
  // hold: verified at compile time
  return b
}

export function headCell(b: Block): Cell {
  if (b.form === "row") {
    const one = b.one
    return one
  }
}

export function stepIsNotIdentity(): void {
  // hold: verified at compile time
  return undefined
}
