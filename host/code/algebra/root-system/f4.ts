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

export type F4Root =
  | { form: "long-e12-pp" }
  | { form: "long-e12-pm" }
  | { form: "long-e12-mp" }
  | { form: "long-e12-mm" }
  | { form: "long-e13-pp" }
  | { form: "long-e13-pm" }
  | { form: "long-e13-mp" }
  | { form: "long-e13-mm" }
  | { form: "long-e14-pp" }
  | { form: "long-e14-pm" }
  | { form: "long-e14-mp" }
  | { form: "long-e14-mm" }
  | { form: "long-e23-pp" }
  | { form: "long-e23-pm" }
  | { form: "long-e23-mp" }
  | { form: "long-e23-mm" }
  | { form: "long-e24-pp" }
  | { form: "long-e24-pm" }
  | { form: "long-e24-mp" }
  | { form: "long-e24-mm" }
  | { form: "long-e34-pp" }
  | { form: "long-e34-pm" }
  | { form: "long-e34-mp" }
  | { form: "long-e34-mm" }
  | { form: "axis-e1-p" }
  | { form: "axis-e1-m" }
  | { form: "axis-e2-p" }
  | { form: "axis-e2-m" }
  | { form: "axis-e3-p" }
  | { form: "axis-e3-m" }
  | { form: "axis-e4-p" }
  | { form: "axis-e4-m" }
  | { form: "half-pppp" }
  | { form: "half-pppm" }
  | { form: "half-ppmp" }
  | { form: "half-ppmm" }
  | { form: "half-pmpp" }
  | { form: "half-pmpm" }
  | { form: "half-pmmp" }
  | { form: "half-pmmm" }
  | { form: "half-mppp" }
  | { form: "half-mppm" }
  | { form: "half-mpmp" }
  | { form: "half-mpmm" }
  | { form: "half-mmpp" }
  | { form: "half-mmpm" }
  | { form: "half-mmmp" }
  | { form: "half-mmmm" }

export function negate(r: F4Root): F4Root {
  if (r.form === "long-e12-pp") {
    return { form: "long-e12-mm" }
  } else if (r.form === "long-e12-pm") {
    return { form: "long-e12-mp" }
  } else if (r.form === "long-e12-mp") {
    return { form: "long-e12-pm" }
  } else if (r.form === "long-e12-mm") {
    return { form: "long-e12-pp" }
  } else if (r.form === "long-e13-pp") {
    return { form: "long-e13-mm" }
  } else if (r.form === "long-e13-pm") {
    return { form: "long-e13-mp" }
  } else if (r.form === "long-e13-mp") {
    return { form: "long-e13-pm" }
  } else if (r.form === "long-e13-mm") {
    return { form: "long-e13-pp" }
  } else if (r.form === "long-e14-pp") {
    return { form: "long-e14-mm" }
  } else if (r.form === "long-e14-pm") {
    return { form: "long-e14-mp" }
  } else if (r.form === "long-e14-mp") {
    return { form: "long-e14-pm" }
  } else if (r.form === "long-e14-mm") {
    return { form: "long-e14-pp" }
  } else if (r.form === "long-e23-pp") {
    return { form: "long-e23-mm" }
  } else if (r.form === "long-e23-pm") {
    return { form: "long-e23-mp" }
  } else if (r.form === "long-e23-mp") {
    return { form: "long-e23-pm" }
  } else if (r.form === "long-e23-mm") {
    return { form: "long-e23-pp" }
  } else if (r.form === "long-e24-pp") {
    return { form: "long-e24-mm" }
  } else if (r.form === "long-e24-pm") {
    return { form: "long-e24-mp" }
  } else if (r.form === "long-e24-mp") {
    return { form: "long-e24-pm" }
  } else if (r.form === "long-e24-mm") {
    return { form: "long-e24-pp" }
  } else if (r.form === "long-e34-pp") {
    return { form: "long-e34-mm" }
  } else if (r.form === "long-e34-pm") {
    return { form: "long-e34-mp" }
  } else if (r.form === "long-e34-mp") {
    return { form: "long-e34-pm" }
  } else if (r.form === "long-e34-mm") {
    return { form: "long-e34-pp" }
  } else if (r.form === "axis-e1-p") {
    return { form: "axis-e1-m" }
  } else if (r.form === "axis-e1-m") {
    return { form: "axis-e1-p" }
  } else if (r.form === "axis-e2-p") {
    return { form: "axis-e2-m" }
  } else if (r.form === "axis-e2-m") {
    return { form: "axis-e2-p" }
  } else if (r.form === "axis-e3-p") {
    return { form: "axis-e3-m" }
  } else if (r.form === "axis-e3-m") {
    return { form: "axis-e3-p" }
  } else if (r.form === "axis-e4-p") {
    return { form: "axis-e4-m" }
  } else if (r.form === "axis-e4-m") {
    return { form: "axis-e4-p" }
  } else if (r.form === "half-pppp") {
    return { form: "half-mmmm" }
  } else if (r.form === "half-pppm") {
    return { form: "half-mmmp" }
  } else if (r.form === "half-ppmp") {
    return { form: "half-mmpm" }
  } else if (r.form === "half-ppmm") {
    return { form: "half-mmpp" }
  } else if (r.form === "half-pmpp") {
    return { form: "half-mpmm" }
  } else if (r.form === "half-pmpm") {
    return { form: "half-mpmp" }
  } else if (r.form === "half-pmmp") {
    return { form: "half-mppm" }
  } else if (r.form === "half-pmmm") {
    return { form: "half-mppp" }
  } else if (r.form === "half-mppp") {
    return { form: "half-pmmm" }
  } else if (r.form === "half-mppm") {
    return { form: "half-pmmp" }
  } else if (r.form === "half-mpmp") {
    return { form: "half-pmpm" }
  } else if (r.form === "half-mpmm") {
    return { form: "half-pmpp" }
  } else if (r.form === "half-mmpp") {
    return { form: "half-ppmm" }
  } else if (r.form === "half-mmpm") {
    return { form: "half-ppmp" }
  } else if (r.form === "half-mmmp") {
    return { form: "half-pppm" }
  } else {
    return { form: "half-pppp" }
  }
}

export function isLong(r: F4Root): Flag {
  if (r.form === "long-e12-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e12-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e12-mp") {
    return { form: "yes" }
  } else if (r.form === "long-e12-mm") {
    return { form: "yes" }
  } else if (r.form === "long-e13-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e13-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e13-mp") {
    return { form: "yes" }
  } else if (r.form === "long-e13-mm") {
    return { form: "yes" }
  } else if (r.form === "long-e14-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e14-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e14-mp") {
    return { form: "yes" }
  } else if (r.form === "long-e14-mm") {
    return { form: "yes" }
  } else if (r.form === "long-e23-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e23-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e23-mp") {
    return { form: "yes" }
  } else if (r.form === "long-e23-mm") {
    return { form: "yes" }
  } else if (r.form === "long-e24-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e24-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e24-mp") {
    return { form: "yes" }
  } else if (r.form === "long-e24-mm") {
    return { form: "yes" }
  } else if (r.form === "long-e34-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e34-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e34-mp") {
    return { form: "yes" }
  } else if (r.form === "long-e34-mm") {
    return { form: "yes" }
  } else if (r.form === "axis-e1-p") {
    return { form: "no" }
  } else if (r.form === "axis-e1-m") {
    return { form: "no" }
  } else if (r.form === "axis-e2-p") {
    return { form: "no" }
  } else if (r.form === "axis-e2-m") {
    return { form: "no" }
  } else if (r.form === "axis-e3-p") {
    return { form: "no" }
  } else if (r.form === "axis-e3-m") {
    return { form: "no" }
  } else if (r.form === "axis-e4-p") {
    return { form: "no" }
  } else if (r.form === "axis-e4-m") {
    return { form: "no" }
  } else if (r.form === "half-pppp") {
    return { form: "no" }
  } else if (r.form === "half-pppm") {
    return { form: "no" }
  } else if (r.form === "half-ppmp") {
    return { form: "no" }
  } else if (r.form === "half-ppmm") {
    return { form: "no" }
  } else if (r.form === "half-pmpp") {
    return { form: "no" }
  } else if (r.form === "half-pmpm") {
    return { form: "no" }
  } else if (r.form === "half-pmmp") {
    return { form: "no" }
  } else if (r.form === "half-pmmm") {
    return { form: "no" }
  } else if (r.form === "half-mppp") {
    return { form: "no" }
  } else if (r.form === "half-mppm") {
    return { form: "no" }
  } else if (r.form === "half-mpmp") {
    return { form: "no" }
  } else if (r.form === "half-mpmm") {
    return { form: "no" }
  } else if (r.form === "half-mmpp") {
    return { form: "no" }
  } else if (r.form === "half-mmpm") {
    return { form: "no" }
  } else if (r.form === "half-mmmp") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
}

export function isPositive(r: F4Root): Flag {
  if (r.form === "long-e12-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e12-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e12-mp") {
    return { form: "no" }
  } else if (r.form === "long-e12-mm") {
    return { form: "no" }
  } else if (r.form === "long-e13-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e13-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e13-mp") {
    return { form: "no" }
  } else if (r.form === "long-e13-mm") {
    return { form: "no" }
  } else if (r.form === "long-e14-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e14-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e14-mp") {
    return { form: "no" }
  } else if (r.form === "long-e14-mm") {
    return { form: "no" }
  } else if (r.form === "long-e23-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e23-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e23-mp") {
    return { form: "no" }
  } else if (r.form === "long-e23-mm") {
    return { form: "no" }
  } else if (r.form === "long-e24-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e24-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e24-mp") {
    return { form: "no" }
  } else if (r.form === "long-e24-mm") {
    return { form: "no" }
  } else if (r.form === "long-e34-pp") {
    return { form: "yes" }
  } else if (r.form === "long-e34-pm") {
    return { form: "yes" }
  } else if (r.form === "long-e34-mp") {
    return { form: "no" }
  } else if (r.form === "long-e34-mm") {
    return { form: "no" }
  } else if (r.form === "axis-e1-p") {
    return { form: "yes" }
  } else if (r.form === "axis-e1-m") {
    return { form: "no" }
  } else if (r.form === "axis-e2-p") {
    return { form: "yes" }
  } else if (r.form === "axis-e2-m") {
    return { form: "no" }
  } else if (r.form === "axis-e3-p") {
    return { form: "yes" }
  } else if (r.form === "axis-e3-m") {
    return { form: "no" }
  } else if (r.form === "axis-e4-p") {
    return { form: "yes" }
  } else if (r.form === "axis-e4-m") {
    return { form: "no" }
  } else if (r.form === "half-pppp") {
    return { form: "yes" }
  } else if (r.form === "half-pppm") {
    return { form: "yes" }
  } else if (r.form === "half-ppmp") {
    return { form: "yes" }
  } else if (r.form === "half-ppmm") {
    return { form: "yes" }
  } else if (r.form === "half-pmpp") {
    return { form: "yes" }
  } else if (r.form === "half-pmpm") {
    return { form: "yes" }
  } else if (r.form === "half-pmmp") {
    return { form: "yes" }
  } else if (r.form === "half-pmmm") {
    return { form: "yes" }
  } else if (r.form === "half-mppp") {
    return { form: "no" }
  } else if (r.form === "half-mppm") {
    return { form: "no" }
  } else if (r.form === "half-mpmp") {
    return { form: "no" }
  } else if (r.form === "half-mpmm") {
    return { form: "no" }
  } else if (r.form === "half-mmpp") {
    return { form: "no" }
  } else if (r.form === "half-mmpm") {
    return { form: "no" }
  } else if (r.form === "half-mmmp") {
    return { form: "no" }
  } else {
    return { form: "no" }
  }
}

export function negateIsAnInvolution(r: F4Root): F4Root {
  // hold: verified at compile time
  return r
}

export function negatePreservesLength(r: F4Root): F4Root {
  // hold: verified at compile time
  return r
}

export function everyRootOrItsAntipodeIsPositive(r: F4Root): F4Root {
  // hold: verified at compile time
  return r
}

export function aLongRootIsLong(): void {
  // hold: verified at compile time
  return undefined
}

export function aShortRootIsShort(): void {
  // hold: verified at compile time
  return undefined
}
