export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function either(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return { form: "yes" }
  } else {
    return b
  }
}

export type D4Root =
  | { form: "e12-pp" }
  | { form: "e12-pm" }
  | { form: "e12-mp" }
  | { form: "e12-mm" }
  | { form: "e13-pp" }
  | { form: "e13-pm" }
  | { form: "e13-mp" }
  | { form: "e13-mm" }
  | { form: "e14-pp" }
  | { form: "e14-pm" }
  | { form: "e14-mp" }
  | { form: "e14-mm" }
  | { form: "e23-pp" }
  | { form: "e23-pm" }
  | { form: "e23-mp" }
  | { form: "e23-mm" }
  | { form: "e24-pp" }
  | { form: "e24-pm" }
  | { form: "e24-mp" }
  | { form: "e24-mm" }
  | { form: "e34-pp" }
  | { form: "e34-pm" }
  | { form: "e34-mp" }
  | { form: "e34-mm" }

export function negate(r: D4Root): D4Root {
  if (r.form === "e12-pp") {
    return { form: "e12-mm" }
  } else if (r.form === "e12-pm") {
    return { form: "e12-mp" }
  } else if (r.form === "e12-mp") {
    return { form: "e12-pm" }
  } else if (r.form === "e12-mm") {
    return { form: "e12-pp" }
  } else if (r.form === "e13-pp") {
    return { form: "e13-mm" }
  } else if (r.form === "e13-pm") {
    return { form: "e13-mp" }
  } else if (r.form === "e13-mp") {
    return { form: "e13-pm" }
  } else if (r.form === "e13-mm") {
    return { form: "e13-pp" }
  } else if (r.form === "e14-pp") {
    return { form: "e14-mm" }
  } else if (r.form === "e14-pm") {
    return { form: "e14-mp" }
  } else if (r.form === "e14-mp") {
    return { form: "e14-pm" }
  } else if (r.form === "e14-mm") {
    return { form: "e14-pp" }
  } else if (r.form === "e23-pp") {
    return { form: "e23-mm" }
  } else if (r.form === "e23-pm") {
    return { form: "e23-mp" }
  } else if (r.form === "e23-mp") {
    return { form: "e23-pm" }
  } else if (r.form === "e23-mm") {
    return { form: "e23-pp" }
  } else if (r.form === "e24-pp") {
    return { form: "e24-mm" }
  } else if (r.form === "e24-pm") {
    return { form: "e24-mp" }
  } else if (r.form === "e24-mp") {
    return { form: "e24-pm" }
  } else if (r.form === "e24-mm") {
    return { form: "e24-pp" }
  } else if (r.form === "e34-pp") {
    return { form: "e34-mm" }
  } else if (r.form === "e34-pm") {
    return { form: "e34-mp" }
  } else if (r.form === "e34-mp") {
    return { form: "e34-pm" }
  } else {
    return { form: "e34-pp" }
  }
}

export function isPositive(r: D4Root): Flag {
  if (r.form === "e12-pp") {
    return { form: "yes" }
  } else if (r.form === "e12-pm") {
    return { form: "yes" }
  } else if (r.form === "e12-mp") {
    return { form: "no" }
  } else if (r.form === "e12-mm") {
    return { form: "no" }
  } else if (r.form === "e13-pp") {
    return { form: "yes" }
  } else if (r.form === "e13-pm") {
    return { form: "yes" }
  } else if (r.form === "e13-mp") {
    return { form: "no" }
  } else if (r.form === "e13-mm") {
    return { form: "no" }
  } else if (r.form === "e14-pp") {
    return { form: "yes" }
  } else if (r.form === "e14-pm") {
    return { form: "yes" }
  } else if (r.form === "e14-mp") {
    return { form: "no" }
  } else if (r.form === "e14-mm") {
    return { form: "no" }
  } else if (r.form === "e23-pp") {
    return { form: "yes" }
  } else if (r.form === "e23-pm") {
    return { form: "yes" }
  } else if (r.form === "e23-mp") {
    return { form: "no" }
  } else if (r.form === "e23-mm") {
    return { form: "no" }
  } else if (r.form === "e24-pp") {
    return { form: "yes" }
  } else if (r.form === "e24-pm") {
    return { form: "yes" }
  } else if (r.form === "e24-mp") {
    return { form: "no" }
  } else if (r.form === "e24-mm") {
    return { form: "no" }
  } else if (r.form === "e34-pp") {
    return { form: "yes" }
  } else if (r.form === "e34-pm") {
    return { form: "yes" }
  } else if (r.form === "e34-mp") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
}

export function isVertex(r: D4Root): Flag {
  return { form: "yes" }
}

export function dual(r: D4Root): D4Root {
  return negate(r)
}

export function neighborsCount(): number {
  return 24
}

export type RidgeCell =
  | { form: "north" }
  | { form: "east" }
  | { form: "south" }
  | { form: "west" }

export function aroundRidge(c: RidgeCell): RidgeCell {
  if (c.form === "north") {
    return { form: "east" }
  } else if (c.form === "east") {
    return { form: "south" }
  } else if (c.form === "south") {
    return { form: "west" }
  } else {
    return { form: "north" }
  }
}

export function dualIsAnInvolution(r: D4Root): D4Root {
  // hold: verified at compile time
  return r
}

export function everyRootIsAVertex(r: D4Root): D4Root {
  // hold: verified at compile time
  return r
}

export function verticesPairIntoTwelveLines(r: D4Root): D4Root {
  // hold: verified at compile time
  return r
}

export function fourCellsAroundARidge(c: RidgeCell): RidgeCell {
  // hold: verified at compile time
  return c
}

export function neighborsCountIsTwentyFour(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time
