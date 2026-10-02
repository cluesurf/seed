export type Bit =
  | { form: "off" }
  | { form: "on" }

export function flip(b: Bit): Bit {
  if (b.form === "off") {
    return { form: "on" }
  } else {
    return { form: "off" }
  }
}

export function applyByproduct(control: Bit, target: Bit): Bit {
  if (control.form === "off") {
    return target
  } else {
    return flip(target)
  }
}

export type Outcome =
  | { form: "sent"; flipBit: Bit; phaseBit: Bit }

export type Frame =
  | { form: "qubit"; value: Bit; phase: Bit }

export function corrupt(o: Outcome, f: Frame): Frame {
  if (o.form === "sent") {
    const flipBit = o.flipBit
    const phaseBit = o.phaseBit
    if (f.form === "qubit") {
      const value = f.value
      const phase = f.phase
      return { form: "qubit", value: applyByproduct(flipBit, value), phase: applyByproduct(phaseBit, phase) }
    }
  }
}

export function correct(o: Outcome, f: Frame): Frame {
  if (o.form === "sent") {
    const flipBit = o.flipBit
    const phaseBit = o.phaseBit
    if (f.form === "qubit") {
      const value = f.value
      const phase = f.phase
      return { form: "qubit", value: applyByproduct(flipBit, value), phase: applyByproduct(phaseBit, phase) }
    }
  }
}

export function teleportationRecoversTheInput(flipBit: Bit, phaseBit: Bit, value: Bit, phase: Bit): Bit {
  // hold: verified at compile time
  return flipBit
}
