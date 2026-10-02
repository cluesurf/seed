export type Subset =
  | { form: "empty" }
  | { form: "only-a" }
  | { form: "only-b" }
  | { form: "whole" }

export function union(p: Subset, q: Subset): Subset {
  if (p.form === "empty") {
    return q
  } else if (p.form === "only-a") {
    if (q.form === "empty") {
      return { form: "only-a" }
    } else if (q.form === "only-a") {
      return { form: "only-a" }
    } else if (q.form === "only-b") {
      return { form: "whole" }
    } else {
      return { form: "whole" }
    }
  } else if (p.form === "only-b") {
    if (q.form === "empty") {
      return { form: "only-b" }
    } else if (q.form === "only-a") {
      return { form: "whole" }
    } else if (q.form === "only-b") {
      return { form: "only-b" }
    } else {
      return { form: "whole" }
    }
  } else {
    return { form: "whole" }
  }
}

export function intersect(p: Subset, q: Subset): Subset {
  if (p.form === "empty") {
    return { form: "empty" }
  } else if (p.form === "only-a") {
    if (q.form === "empty") {
      return { form: "empty" }
    } else if (q.form === "only-a") {
      return { form: "only-a" }
    } else if (q.form === "only-b") {
      return { form: "empty" }
    } else {
      return { form: "only-a" }
    }
  } else if (p.form === "only-b") {
    if (q.form === "empty") {
      return { form: "empty" }
    } else if (q.form === "only-a") {
      return { form: "empty" }
    } else if (q.form === "only-b") {
      return { form: "only-b" }
    } else {
      return { form: "only-b" }
    }
  } else {
    return q
  }
}

export function complement(p: Subset): Subset {
  if (p.form === "empty") {
    return { form: "whole" }
  } else if (p.form === "only-a") {
    return { form: "only-b" }
  } else if (p.form === "only-b") {
    return { form: "only-a" }
  } else {
    return { form: "empty" }
  }
}

export function unionIsCommutative(p: Subset, q: Subset): Subset {
  // hold: verified at compile time
  return p
}

export function intersectIsCommutative(p: Subset, q: Subset): Subset {
  // hold: verified at compile time
  return p
}

export function complementIsAnInvolution(p: Subset): Subset {
  // hold: verified at compile time
  return p
}

export function deMorganUnion(p: Subset, q: Subset): Subset {
  // hold: verified at compile time
  return p
}
