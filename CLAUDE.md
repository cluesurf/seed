# seed.tree: the machine-checked mathematics library, `@term/seed`

This package is a kernel-verified math library written in Term `.tree`. Every file models a real
mathematical object and proves theorems about it that the `term` kernel checks.

## Read this before writing or editing any `.tree` file here

**[note/proof-authoring-guide.md](note/proof-authoring-guide.md)** is the authoring standard. It is
not optional. It explains the one rule and the anti-patterns that make a file worthless.

## The one rule (summary, full detail in the guide)

**Define the object as a `form` and recursive `task`, then prove properties of that definition with
`rule` / `calm` / `fold`.** The proof must run the definition and fail if the definition is wrong.

- `form` = the inductive datatype (the object).
- `task` = the recursive operation, by structural recursion (`fork case`).
- `rule ... / show hold / calm hold` = a theorem discharged by computation.
- `rule ... / seat v, like T / show hold / fold v / cite lemma` = a universal theorem by induction. A `seat` is the
  theorem's variable, for every value of `T`. It was spelled `mark` until 2026-10-05, and the build refuses that now.
- `hold` = a machine-integer spot-check. **Garnish only.** A file made only of `hold` blocks is
  garbage: it checks arithmetic on constants you typed and models nothing. Do not write those.

The test: delete every `hold`. If no theorem remains, the file was a calculator. Rewrite it to
define its object and prove a property.

Gold-standard files to imitate: `code/number/parity.tree`, `code/number/fibonacci.tree`,
`code/number/divisibility.tree`, `code/space/lattice/e8.tree`, `code/octonion.tree`.

## Generated files

The analysis and hyperbolic files (`code/integral/*`, `code/number/completeness.tree`, `code/number/arithmetic.tree`,
`code/space/hyperbolic/{order,archimedes,area,metric,polar,distance}.tree`) and their controls are WRITTEN by the
Python generators in `task/gen/`. Edit the generator and rerun it (`python3 task/gen/<name>.py`), never the `.tree`.
A rule may cite a rule proven above it with `cite <rule>` (the generators' `rule(..., cites=(...))`).

## Controls: `test/case/`

Every file of rules has a CONTROL beside it in `test/case/` (it was `control/` until 2026-10-05): the same theorems
perturbed (a wrong constant, a dropped hypothesis, a reversed inequality), each of which must be REFUSED. A control
states how many in its header, `Expected: N`. `term test` builds every file under `test/case/` and passes it only when
the build refuses exactly N goals, for proof reasons. A control that builds means a false law was accepted. One refused
for another reason (a typo, an unknown name) is reported broken, because it no longer tests anything.

```
node ../term/host/line.js test --filter test/case
```

A new file of rules is not done until its control is in `test/case/` and that command passes.

## New files are lean, and import, never redefine

`role.tree` names the files written lean (`back x`, `<x>`, `f(a, b)`, see `../../../../note/term/lean.md`). A new
file goes there, with its control. The rest of the library stays longhand until `pnpm term:lean-convert` reads it equal.

Import the canonical definitions: `flag` and its operations from `atom/flag.tree`, `natural` and `plus`, `times`,
`power` from `number/peano.tree`. A proof in one file runs a task and cites a rule of another when that file states
rules (a THEORY): its definitions' bodies and its rules travel with it to every file that loads it, in the per-unit
build as in the merged one. A file with no rules keeps its bodies to itself.

Three things that are not guessable:

- `cite <rule>` closes a goal that is an INSTANCE of a proven equation: `cite both-commutes` proves
  `evaluate(v, make conjunction(p, q)) == evaluate(v, make conjunction(q, p))`, because the two sides compute to
  `both(x, y)` and `both(y, x)`. One rewrite by the rule, either way round, must make the sides the same.
- a case's fields may be `slot`s, so `make conjunction(p, q)` fills them by position. A `make` followed by a comma nests
  what follows into it (the comma rule), so put the formula LAST in an argument list (`evaluate(v, p)`), or stack the
  arguments on their own lines.
- a form that aliases a task type (`form assignment / like task / take n, like natural / like flag`) types a seat that
  is then called as the task: `seat v, like assignment` and `v(n)`.
- a goal over truth values (`flag`) DECIDES ITSELF by its truth table, with no step, even over values the kernel cannot
  compute (`evaluate(v, p)` is yes or no whatever `p` is). The same table closes each case of a `fold`, under the
  induction hypotheses, which is how `logic/soundness.tree` is one `fold`. A false one is refused with the values that
  break it: `it is FALSE in the case affirm, where evaluate(v, a) is no, evaluate(v, b) is yes`.
- a value index of an indexed family keeps its `read` under `head` (`head` / `read a`): a bare word there is a type.
- a rule may take a type parameter (`rule union-commutes / head a / seat s, like set a`), and an alias may too
  (`form set / head a / like task / take x, like a / like flag`), so a law is stated once for every type.
- a hypothesis that holds FOR EVERY element is a `have` with a `seat` of its own: `have symmetric / seat u, like a /
  seat v, like a / is-equal r(u, v), r(v, u)`. The kernel uses it at each term of that type the goal, its guards and
  its `find` witnesses name, and nowhere else, so name the term it is needed at. Instances are decided by the truth
  table and by congruence closure (`f(x) == f(y)` with `g(f(u)) == u` gives `x == y`). See `relation/base.tree` and
  `function/property.tree`. A `fold` in such a theorem is not yet supported (math-foundations-0028).
- a claim (`rule` with no `show`) is proved by a `task` of its name, checked by the kernel as one term against the
  claim's type, so a proof can BUILD evidence: `relation/well-founded.tree` proves every natural accessible that way.
  A match there refines the result type (by the subject, and by a constructor-headed index), never a variable already
  in scope, so match in a helper that returns a FUNCTION of that variable (the convoy, `answers` and
  `below-successor` there).
- a call cannot be applied to a call in lean (`compose(g, f)(x)` loses its arguments). Apply through a task:
  `apply(compose(g, f), x)`, `relates(converse(r), x, y)`, `has(union(s, t), x)`.

## What to write next

`../../../../note/term/foundations/` is the plan for the layers the library is missing (logic, sets, numbers,
algebra, analysis, discrete mathematics), and `phases.md` there is the order. The checklist is
`../../../../note/term/project/math-foundations.json`. Phase 0 began 2026-10-05 with `logic/boolean.tree` and
`logic/propositional.tree`.

## Checking

```
node ../term/host/line.js make
```

`term make` is the only trustworthy compile signal. Green `✓` means the kernel accepted the definitions and proved
every rule. `term scan` cannot resolve imports and reports valid code as broken.

## Prose in comments

Follow the repository style: no em-dashes, no semicolons, punctuation outside closing quotes, plain
direct words. Comment headers explain what the file models and what each theorem states.
