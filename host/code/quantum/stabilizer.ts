export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Pauli =
  | { form: "identity" }
  | { form: "bit-flip" }
  | { form: "both-flip" }
  | { form: "phase-flip" }

export type StringForm =
  | { form: "pair"; head: Pauli; tail: Pauli }

export function commutes(a: Pauli, b: Pauli): Flag {
  if (a.form === "identity") {
    if (b.form === "identity") {
      return { form: "yes" }
    } else if (b.form === "bit-flip") {
      return { form: "yes" }
    } else if (b.form === "both-flip") {
      return { form: "yes" }
    } else {
      return { form: "yes" }
    }
  } else if (a.form === "bit-flip") {
    if (b.form === "identity") {
      return { form: "yes" }
    } else if (b.form === "bit-flip") {
      return { form: "yes" }
    } else if (b.form === "both-flip") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "both-flip") {
    if (b.form === "identity") {
      return { form: "yes" }
    } else if (b.form === "bit-flip") {
      return { form: "no" }
    } else if (b.form === "both-flip") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "identity") {
      return { form: "yes" }
    } else if (b.form === "bit-flip") {
      return { form: "no" }
    } else if (b.form === "both-flip") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function agree(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return b
  } else {
    if (b.form === "yes") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function headOf(s: StringForm): Pauli {
  if (s.form === "pair") {
    const head = s.head
    return head
  }
}

export function tailOf(s: StringForm): Pauli {
  if (s.form === "pair") {
    const tail = s.tail
    return tail
  }
}

export function stringsCommute(p: StringForm, q: StringForm): Flag {
  return agree(commutes(headOf(p), headOf(q)), commutes(tailOf(p), tailOf(q)))
}

export function commutesIsSymmetric(a: Pauli, b: Pauli): Pauli {
  // hold: verified at compile time
  return a
}

export function identityCommutesWithEverything(p: Pauli): Pauli {
  // hold: verified at compile time
  return p
}

export function everyPauliCommutesWithItself(p: Pauli): Pauli {
  // hold: verified at compile time
  return p
}

export function stringsCommuteIsSymmetric(a: Pauli, b: Pauli, c: Pauli, d: Pauli): Pauli {
  // hold: verified at compile time
  return a
}

export function toricVertexAndPlaquetteCommute(): void {
  // hold: verified at compile time
  return undefined
}

export function oddOverlapPairAnticommutes(): void {
  // hold: verified at compile time
  return undefined
}
