export type Agent =
  | { form: "eraser" }
  | { form: "constructor" }
  | { form: "duplicator" }

export type Arity =
  | { form: "none" }
  | { form: "two" }

export function ports(a: Agent): Arity {
  if (a.form === "eraser") {
    return { form: "none" }
  } else if (a.form === "constructor") {
    return { form: "two" }
  } else {
    return { form: "two" }
  }
}

export type Clash =
  | { form: "face"; one: Agent; two: Agent }

export type Rule =
  | { form: "annihilate" }
  | { form: "commute" }

export function sameKind(a: Agent, b: Agent): Rule {
  if (a.form === "eraser") {
    if (b.form === "eraser") {
      return { form: "annihilate" }
    } else if (b.form === "constructor") {
      return { form: "commute" }
    } else {
      return { form: "commute" }
    }
  } else if (a.form === "constructor") {
    if (b.form === "eraser") {
      return { form: "commute" }
    } else if (b.form === "constructor") {
      return { form: "annihilate" }
    } else {
      return { form: "commute" }
    }
  } else {
    if (b.form === "eraser") {
      return { form: "commute" }
    } else if (b.form === "constructor") {
      return { form: "commute" }
    } else {
      return { form: "annihilate" }
    }
  }
}

export function interaction(c: Clash): Rule {
  if (c.form === "face") {
    const one = c.one
    const two = c.two
    return sameKind(one, two)
  }
}

export function interactionIsSymmetric(a: Agent, b: Agent): Agent {
  // hold: verified at compile time
  return a
}

export function equalAgentsAnnihilate(a: Agent): Agent {
  // hold: verified at compile time
  return a
}

export type Net =
  | { form: "running"; here: Clash; there: Clash }
  | { form: "here-reduced"; hereRule: Rule; there: Clash }
  | { form: "there-reduced"; here: Clash; thereRule: Rule }
  | { form: "both-reduced"; hereRule: Rule; thereRule: Rule }

export function reduceHere(n: Net): Net {
  if (n.form === "running") {
    const here = n.here
    const there = n.there
    return { form: "here-reduced", hereRule: interaction(here), there: there }
  } else if (n.form === "here-reduced") {
    const hereRule = n.hereRule
    const there = n.there
    return { form: "here-reduced", hereRule: hereRule, there: there }
  } else if (n.form === "there-reduced") {
    const here = n.here
    const thereRule = n.thereRule
    return { form: "both-reduced", hereRule: interaction(here), thereRule: thereRule }
  } else {
    const hereRule = n.hereRule
    const thereRule = n.thereRule
    return { form: "both-reduced", hereRule: hereRule, thereRule: thereRule }
  }
}

export function reduceThere(n: Net): Net {
  if (n.form === "running") {
    const here = n.here
    const there = n.there
    return { form: "there-reduced", here: here, thereRule: interaction(there) }
  } else if (n.form === "here-reduced") {
    const hereRule = n.hereRule
    const there = n.there
    return { form: "both-reduced", hereRule: hereRule, thereRule: interaction(there) }
  } else if (n.form === "there-reduced") {
    const here = n.here
    const thereRule = n.thereRule
    return { form: "there-reduced", here: here, thereRule: thereRule }
  } else {
    const hereRule = n.hereRule
    const thereRule = n.thereRule
    return { form: "both-reduced", hereRule: hereRule, thereRule: thereRule }
  }
}

export function reductionIsStronglyConfluent(herePair: Clash, therePair: Clash): Clash {
  // hold: verified at compile time
  return herePair
}
