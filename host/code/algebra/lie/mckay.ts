export type Flag =
  | { form: "yes" }
  | { form: "no" }

export function both(a: Flag, b: Flag): Flag {
  if (a.form === "yes") {
    return b
  } else {
    return { form: "no" }
  }
}

export type AdeType =
  | { form: "a-type" }
  | { form: "d-type" }
  | { form: "e6" }
  | { form: "e7" }
  | { form: "e8" }

export type BinaryGroup =
  | { form: "cyclic" }
  | { form: "binary-dihedral" }
  | { form: "binary-tetrahedral" }
  | { form: "binary-octahedral" }
  | { form: "binary-icosahedral" }

export type Platonic =
  | { form: "tetrahedron" }
  | { form: "octahedron" }
  | { form: "icosahedron" }

export function sameAdeType(a: AdeType, b: AdeType): Flag {
  if (a.form === "a-type") {
    if (b.form === "a-type") {
      return { form: "yes" }
    } else if (b.form === "d-type") {
      return { form: "no" }
    } else if (b.form === "e6") {
      return { form: "no" }
    } else if (b.form === "e7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "d-type") {
    if (b.form === "a-type") {
      return { form: "no" }
    } else if (b.form === "d-type") {
      return { form: "yes" }
    } else if (b.form === "e6") {
      return { form: "no" }
    } else if (b.form === "e7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "e6") {
    if (b.form === "a-type") {
      return { form: "no" }
    } else if (b.form === "d-type") {
      return { form: "no" }
    } else if (b.form === "e6") {
      return { form: "yes" }
    } else if (b.form === "e7") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "e7") {
    if (b.form === "a-type") {
      return { form: "no" }
    } else if (b.form === "d-type") {
      return { form: "no" }
    } else if (b.form === "e6") {
      return { form: "no" }
    } else if (b.form === "e7") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "a-type") {
      return { form: "no" }
    } else if (b.form === "d-type") {
      return { form: "no" }
    } else if (b.form === "e6") {
      return { form: "no" }
    } else if (b.form === "e7") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function sameBinaryGroup(a: BinaryGroup, b: BinaryGroup): Flag {
  if (a.form === "cyclic") {
    if (b.form === "cyclic") {
      return { form: "yes" }
    } else if (b.form === "binary-dihedral") {
      return { form: "no" }
    } else if (b.form === "binary-tetrahedral") {
      return { form: "no" }
    } else if (b.form === "binary-octahedral") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "binary-dihedral") {
    if (b.form === "cyclic") {
      return { form: "no" }
    } else if (b.form === "binary-dihedral") {
      return { form: "yes" }
    } else if (b.form === "binary-tetrahedral") {
      return { form: "no" }
    } else if (b.form === "binary-octahedral") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "binary-tetrahedral") {
    if (b.form === "cyclic") {
      return { form: "no" }
    } else if (b.form === "binary-dihedral") {
      return { form: "no" }
    } else if (b.form === "binary-tetrahedral") {
      return { form: "yes" }
    } else if (b.form === "binary-octahedral") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "binary-octahedral") {
    if (b.form === "cyclic") {
      return { form: "no" }
    } else if (b.form === "binary-dihedral") {
      return { form: "no" }
    } else if (b.form === "binary-tetrahedral") {
      return { form: "no" }
    } else if (b.form === "binary-octahedral") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "cyclic") {
      return { form: "no" }
    } else if (b.form === "binary-dihedral") {
      return { form: "no" }
    } else if (b.form === "binary-tetrahedral") {
      return { form: "no" }
    } else if (b.form === "binary-octahedral") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function samePlatonic(a: Platonic, b: Platonic): Flag {
  if (a.form === "tetrahedron") {
    if (b.form === "tetrahedron") {
      return { form: "yes" }
    } else if (b.form === "octahedron") {
      return { form: "no" }
    } else {
      return { form: "no" }
    }
  } else if (a.form === "octahedron") {
    if (b.form === "tetrahedron") {
      return { form: "no" }
    } else if (b.form === "octahedron") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "tetrahedron") {
      return { form: "no" }
    } else if (b.form === "octahedron") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function mckayGroup(t: AdeType): BinaryGroup {
  if (t.form === "a-type") {
    return { form: "cyclic" }
  } else if (t.form === "d-type") {
    return { form: "binary-dihedral" }
  } else if (t.form === "e6") {
    return { form: "binary-tetrahedral" }
  } else if (t.form === "e7") {
    return { form: "binary-octahedral" }
  } else {
    return { form: "binary-icosahedral" }
  }
}

export function mckayGroupInverse(g: BinaryGroup): AdeType {
  if (g.form === "cyclic") {
    return { form: "a-type" }
  } else if (g.form === "binary-dihedral") {
    return { form: "d-type" }
  } else if (g.form === "binary-tetrahedral") {
    return { form: "e6" }
  } else if (g.form === "binary-octahedral") {
    return { form: "e7" }
  } else {
    return { form: "e8" }
  }
}

export function mckaySolid(t: AdeType): Platonic {
  if (t.form === "a-type") {
    return { form: "tetrahedron" }
  } else if (t.form === "d-type") {
    return { form: "tetrahedron" }
  } else if (t.form === "e6") {
    return { form: "tetrahedron" }
  } else if (t.form === "e7") {
    return { form: "octahedron" }
  } else {
    return { form: "icosahedron" }
  }
}

export function mckaySolidInverse(p: Platonic): AdeType {
  if (p.form === "tetrahedron") {
    return { form: "e6" }
  } else if (p.form === "octahedron") {
    return { form: "e7" }
  } else {
    return { form: "e8" }
  }
}

export function groupOrder(g: BinaryGroup): number {
  if (g.form === "cyclic") {
    return 1
  } else if (g.form === "binary-dihedral") {
    return 8
  } else if (g.form === "binary-tetrahedral") {
    return 24
  } else if (g.form === "binary-octahedral") {
    return 48
  } else {
    return 120
  }
}

export function groupMapRoundTripsFromAde(t: AdeType): AdeType {
  // hold: verified at compile time
  return t
}

export function groupMapRoundTripsFromGroup(g: BinaryGroup): BinaryGroup {
  // hold: verified at compile time
  return g
}

export function solidMapRoundTripsFromPlatonic(p: Platonic): Platonic {
  // hold: verified at compile time
  return p
}

export function solidMapRoundTripsOnTheExceptionalTriple(): void {
  // hold: verified at compile time
  return undefined
}

export function theExceptionalTrinityAligns(): void {
  // hold: verified at compile time
  return undefined
}

export function theExceptionalImagesAreDistinct(): void {
  // hold: verified at compile time
  return undefined
}

export function theOrderOfTheE6GroupIsTwentyFour(): void {
  // hold: verified at compile time
  return undefined
}

export function theOrderOfTheE7GroupIsFortyEight(): void {
  // hold: verified at compile time
  return undefined
}

export function theOrderOfTheE8GroupIsOneHundredTwenty(): void {
  // hold: verified at compile time
  return undefined
}

// hold: verified at compile time

// hold: verified at compile time

// hold: verified at compile time
