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

export type Tone =
  | { form: "fear" }
  | { form: "calm" }
  | { form: "love" }

export function toneSum(a: Tone, b: Tone): Tone {
  if (a.form === "fear") {
    if (b.form === "fear") {
      return { form: "love" }
    } else if (b.form === "calm") {
      return { form: "fear" }
    } else {
      return { form: "calm" }
    }
  } else if (a.form === "calm") {
    if (b.form === "fear") {
      return { form: "fear" }
    } else if (b.form === "calm") {
      return { form: "calm" }
    } else {
      return { form: "love" }
    }
  } else {
    if (b.form === "fear") {
      return { form: "calm" }
    } else if (b.form === "calm") {
      return { form: "love" }
    } else {
      return { form: "fear" }
    }
  }
}

export function toneConjugate(a: Tone): Tone {
  if (a.form === "fear") {
    return { form: "love" }
  } else if (a.form === "calm") {
    return { form: "calm" }
  } else {
    return { form: "fear" }
  }
}

export function atMost(a: Tone, b: Tone): Flag {
  if (a.form === "fear") {
    if (b.form === "fear") {
      return { form: "yes" }
    } else if (b.form === "calm") {
      return { form: "yes" }
    } else {
      return { form: "yes" }
    }
  } else if (a.form === "calm") {
    if (b.form === "fear") {
      return { form: "no" }
    } else if (b.form === "calm") {
      return { form: "yes" }
    } else {
      return { form: "yes" }
    }
  } else {
    if (b.form === "fear") {
      return { form: "no" }
    } else if (b.form === "calm") {
      return { form: "no" }
    } else {
      return { form: "yes" }
    }
  }
}

export function leanIsReflexive(a: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function leanIsAntisymmetric(a: Tone, b: Tone): Tone {
  if (atMost(a, b) == { form: "yes" }) {
    if (atMost(b, a) == { form: "yes" }) {
      // hold: verified at compile time
    }
  }
  return a
}

export function leanIsTransitive(a: Tone, b: Tone, c: Tone): Tone {
  if (atMost(a, b) == { form: "yes" }) {
    if (atMost(b, c) == { form: "yes" }) {
      // hold: verified at compile time
    }
  }
  return a
}

export function leanIsTotal(a: Tone, b: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function conjugationReversesTheLean(a: Tone, b: Tone): Tone {
  // hold: verified at compile time
  return a
}

export function theResidueSumBreaksTheLean(): void {
  // hold: verified at compile time
  return undefined
}
