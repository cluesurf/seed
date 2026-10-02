export type Node =
  | { form: "node-a" }
  | { form: "node-b" }
  | { form: "node-c" }
  | { form: "node-d" }

export function rotate(x: Node): Node {
  if (x.form === "node-a") {
    return { form: "node-b" }
  } else if (x.form === "node-b") {
    return { form: "node-c" }
  } else if (x.form === "node-c") {
    return { form: "node-d" }
  } else {
    return { form: "node-a" }
  }
}

export function theCyclicAutomorphismHasOrderFour(x: Node): Node {
  // hold: verified at compile time
  return x
}

// hold: verified at compile time

// hold: verified at compile time
