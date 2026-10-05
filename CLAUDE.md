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
- `rule ... / mark v, like T / show hold / fold v / cite lemma` = a universal theorem by induction.
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

## What to write next

`../../../../note/term/foundations/` is the plan for the layers the library is missing (logic, sets, numbers,
algebra, analysis, discrete mathematics), and `phases.md` there is the order. Phase 0 needs no kernel change.

## Checking

```
node ../term/host/line.js make
```

`term make` is the only trustworthy compile signal. Green `✓` means the kernel accepted the definitions and proved
every rule. `term scan` cannot resolve imports and reports valid code as broken.

## Prose in comments

Follow the repository style: no em-dashes, no semicolons, punctuation outside closing quotes, plain
direct words. Comment headers explain what the file models and what each theorem states.
