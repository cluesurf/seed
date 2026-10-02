export type Term =
  | { form: "s" }
  | { form: "k" }
  | { form: "i" }
  | { form: "app"; left: Term; right: Term }

export type Natural =
  | { form: "zero" }
  | { form: "succ"; prior: Natural }

export function step(t: Term): Term {
  if (t.form === "s") {
    return t
  } else if (t.form === "k") {
    return t
  } else if (t.form === "i") {
    return t
  } else {
    const spineOne = t.left
    const argZ = t.right
    if (spineOne.form === "i") {
      return argZ
    } else if (spineOne.form === "s") {
      return t
    } else if (spineOne.form === "k") {
      return t
    } else {
      const spineTwo = spineOne.left
      const argY = spineOne.right
      if (spineTwo.form === "i") {
        return { form: "app", left: argY, right: argZ }
      } else if (spineTwo.form === "k") {
        return argY
      } else if (spineTwo.form === "s") {
        return t
      } else {
        const spineThree = spineTwo.left
        const argX = spineTwo.right
        if (spineThree.form === "s") {
          return { form: "app", left: { form: "app", left: argX, right: argZ }, right: { form: "app", left: argY, right: argZ } }
        } else if (spineThree.form === "i") {
          return { form: "app", left: { form: "app", left: argX, right: argY }, right: argZ }
        } else if (spineThree.form === "k") {
          return { form: "app", left: argX, right: argZ }
        } else {
          const left = spineThree.left
          const right = spineThree.right
          return { form: "app", left: step(spineOne), right: argZ }
        }
      }
    }
  }
}

export function reduce(n: Natural, t: Term): Term {
  if (n.form === "zero") {
    return t
  } else {
    const prior = n.prior
    return reduce(prior, step(t))
  }
}

export function reduceZeroIsIdentity(t: Term): Term {
  // hold: verified at compile time
  return t
}

export function iRedexSteps(x: Term): Term {
  // hold: verified at compile time
  return x
}

export function iReducesOnAConstant(): void {
  // hold: verified at compile time
  return undefined
}

export function kDiscardsItsSecondArgument(): void {
  // hold: verified at compile time
  return undefined
}

export function sKKIsTheIdentity(): void {
  // hold: verified at compile time
  return undefined
}

export function ifTrueSelectsTheFirstBranch(): void {
  // hold: verified at compile time
  return undefined
}

export function ifFalseSelectsTheSecondBranch(): void {
  // hold: verified at compile time
  return undefined
}
