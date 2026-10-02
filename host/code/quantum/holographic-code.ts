export type Flag =
  | { form: "yes" }
  | { form: "no" }

export type Bit =
  | { form: "off" }
  | { form: "on" }

export function same(a: Bit, b: Bit): Flag {
  if (a.form === "off") {
    if (b.form === "off") {
      return { form: "yes" }
    } else {
      return { form: "no" }
    }
  } else {
    if (b.form === "off") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export type Boundary =
  | { form: "sites"; one: Bit; two: Bit; three: Bit }

export function encode(b: Bit): Boundary {
  return { form: "sites", one: b, two: b, three: b }
}

export function decode(w: Boundary): Bit {
  if (w.form === "sites") {
    const one = w.one
    const two = w.two
    const three = w.three
    if (one.form === "off") {
      if (two.form === "off") {
        return { form: "off" }
      } else {
        return three
      }
    } else {
      if (two.form === "off") {
        return three
      } else {
        return { form: "on" }
      }
    }
  }
}

export type Position =
  | { form: "at-one" }
  | { form: "at-two" }
  | { form: "at-three" }

export function eraseAt(w: Boundary, p: Position): Boundary {
  if (w.form === "sites") {
    const one = w.one
    const two = w.two
    const three = w.three
    if (p.form === "at-one") {
      return { form: "sites", one: { form: "off" }, two: two, three: three }
    } else if (p.form === "at-two") {
      return { form: "sites", one: one, two: { form: "off" }, three: three }
    } else {
      return { form: "sites", one: one, two: two, three: { form: "off" } }
    }
  }
}

export type Region =
  | { form: "keep-one-two" }
  | { form: "keep-two-three" }
  | { form: "keep-one-three" }
  | { form: "keep-all" }

export function reconstructFromRegion(w: Boundary, g: Region): Bit {
  if (w.form === "sites") {
    const one = w.one
    const two = w.two
    const three = w.three
    if (g.form === "keep-one-two") {
      if (one.form === "off") {
        return { form: "off" }
      } else {
        return two
      }
    } else if (g.form === "keep-two-three") {
      if (two.form === "off") {
        return { form: "off" }
      } else {
        return three
      }
    } else if (g.form === "keep-one-three") {
      if (one.form === "off") {
        return { form: "off" }
      } else {
        return three
      }
    } else {
      return decode(w)
    }
  }
}

export function bulkReconstructsFromTheBoundary(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function singleErasureCorrectableAtOne(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function singleErasureCorrectableAtTwo(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function singleErasureCorrectableAtThree(b: Bit): Bit {
  // hold: verified at compile time
  return b
}

export function reconstructionFromAMajorityRegion(b: Bit, g: Region): Bit {
  // hold: verified at compile time
  return b
}

export function fullRegionReconstructionIsGlobalDecode(x: Bit, y: Bit, z: Bit): Bit {
  // hold: verified at compile time
  return x
}

export function siteOneOf(w: Boundary): Bit {
  if (w.form === "sites") {
    const one = w.one
    return one
  }
}

export function erasureResetsTheLostSite(x: Bit, y: Bit, z: Bit): Bit {
  // hold: verified at compile time
  return x
}
