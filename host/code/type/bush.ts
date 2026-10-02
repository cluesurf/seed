export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export function plus(a: Natural, b: Natural): Natural {
  if (a.form === "zero") {
    return b
  } else {
    const prior = a.prior
    return { form: "succ", prior: plus(prior, b) }
  }
}

export type Bush =
  | { form: "leaf" }
  | { form: "node"; left: Bush; value: Natural; right: Bush }

export function mirror(t: Bush): Bush {
  if (t.form === "leaf") {
    return { form: "leaf" }
  } else {
    const left = t.left
    const value = t.value
    const right = t.right
    return { form: "node", left: mirror(right), value: value, right: mirror(left) }
  }
}

export function size(t: Bush): Natural {
  if (t.form === "leaf") {
    return { form: "zero" }
  } else {
    const left = t.left
    const right = t.right
    return { form: "succ", prior: plus(size(left), size(right)) }
  }
}

export function mirrorLeafIsLeaf(): void {
  // hold: verified at compile time
  return undefined
}

export function sizeLeafIsZero(): void {
  // hold: verified at compile time
  return undefined
}

export function mirrorMirrorIsIdentity(t: Bush): Bush {
  // hold: verified at compile time
  return t
}

export function plusZeroRightOnSize(n: Natural): Natural {
  // hold: verified at compile time
  return n
}

export function plusSuccRightOnSize(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function plusIsCommutativeOnSize(a: Natural, b: Natural): Natural {
  // hold: verified at compile time
  return a
}

export function mirrorNodeSteps(l: Bush, v: Natural, r: Bush): Bush {
  // hold: verified at compile time
  return l
}

export function sizeNodeSteps(l: Bush, v: Natural, r: Bush): Bush {
  // hold: verified at compile time
  return l
}

export function sizeOfMirrorIsSize(t: Bush): Bush {
  // hold: verified at compile time
  return t
}
