# Authoring `.tree` math files: model and prove, never assert

This library is a machine-checked mathematics library. Every file must **model a real
mathematical object** and **prove theorems about it** that the kernel verifies. A file that
only lists arithmetic facts on hand-typed constants is worthless. It proves nothing, because
nothing was defined for it to be about.

Read this before writing or editing any `code/**/*.tree` file.

## The one rule

**Define the object as a `form` and recursive `task`, then prove properties of that definition
with `rule` / `calm` / `fold`.** The proof must run the definition. If the definition is wrong,
the proof must fail. That is the whole point.

## The anatomy of a good file

Study `code/number/parity.tree`, `code/number/fibonacci.tree`, `code/number/divisibility.tree`,
and `code/space/lattice/e8.tree`. Every one follows the same shape.

### 1. Define the domain as an inductive `form`

```
form natural
  case zero
  case succ
    link prior, like natural
```

Domain-specific carriers are inductive too: `form bit` (off, on), `form octo`, `form coordinate`.
Each file is self-contained (the kernel checks one file at a time), so redefine `natural`, `plus`,
etc. inline. Do not try to import them.

### 2. Define operations as recursive `task`s

A `task` computes by structural recursion on one argument.

```
task plus
  take a, like natural
  take b, like natural
  like natural
  fork case, read a
    case zero
      send back
        read b
    case succ
      link ap
      send back
        make succ
          bind prior
            call plus
              read ap
              read b
```

The `fork case, read a` splits on the constructor. `link ap` names the predecessor field in the
`succ` branch. The recursive `call plus / read ap / read b` recurses on the strictly smaller `ap`,
which is why it terminates. Two-step recursion (`fib`, `half`) peels two `succ`s and recurses on
the doubly-nested field.

### 3. Prove theorems as `rule`

A `rule` is a named theorem. `show hold` states the goal as an equation. A tactic discharges it.

**Definitional / computational, by `calm hold`.** Use when both sides reduce to the same normal
form by unfolding definitions. This covers step lemmas and concrete evaluations.

```
rule parity-succ-steps
  mark n, like natural
  show hold
    call is-equal
      call parity
        make succ
          bind prior
            read n
      call flip
        call parity
          read n
  calm hold
```

**Universal, by `fold`.** Use for a statement true for all `n`. Induct on the variable the task
recurses on. Add `cite` children for the lemmas the inductive step needs.

```
rule double-is-even
  mark n, like natural
  show hold
    call is-equal
      call parity
        call plus
          read n
          read n
      make off
  fold n
    cite plus-succ-left-steps
    cite plus-succ-right-steps
    cite parity-succ-steps
    cite flip-flip-is-identity
```

`double-is-even` is a genuine theorem: for **every** natural `n`, the defined `parity` of `n + n`
is `off`. It exercises `parity` and `plus`. Break either definition and the proof breaks. That is
what separates it from a calculator check.

### 4. `hold` is garnish, never the substance

A bare `hold` checks machine-integer arithmetic on `code N` literals:

```
hold fib-eight-is-five-plus-three
  call is-equal
    code 8
    call add
      code 5
      code 3
```

This is acceptable **only** as a concrete spot-check of a sequence **alongside** real definitions
and rules, the way `fibonacci.tree` lists a few sequence values after defining `fib` and proving
the recurrence. A file whose entire content is `hold` blocks is the anti-pattern below.

## The tactic vocabulary

| construct | meaning |
| --- | --- |
| `form X / case ... / link f, like Y` | inductive datatype (the object) |
| `task f / take ... / like R / fork case, read a` | recursive function (the operation) |
| `rule name / show hold / <tactic>` | named theorem |
| `mark v, like T` | introduce a universally-quantified variable |
| `calm hold` | discharge by computation / definitional unfolding |
| `fold v` | discharge by structural induction on `v` |
| `cite lemma` | supply a lemma to an inductive step (child of `fold`) |
| `hold name` | machine-integer spot-check (garnish only) |

Step-lemma pattern: a `rule ...-steps` proved by `calm hold` exposes one unfolding of a task (for
example `times (succ a) b = b + times a b`), then the big induction `cite`s it. See
`divisibility.tree` (`times-succ-left-steps-out` feeding `divisors-closed-under-sum`).

## What NOT to do (the anti-patterns that make a file garbage)

1. **A file of only `hold` blocks.** Asserting `is-equal(code 2160, multiply(code 240, code 9))`
   models nothing. The numbers 240, 9, 2160 were typed by hand. The kernel just confirms your
   multiplication. No object is defined, no function is exercised, no theorem is proved. This is a
   calculator, not mathematics. `zeta.tree` in its first form was exactly this, and it was garbage.

2. **Trivial tautologies.** `is-equal(code 4, code 4)`, or `is-equal(4, add(2,2))` with no defined
   function behind it. Says nothing.

3. **Naming a theorem but only asserting its numeric shadow.** Writing
   `hold sigma-three-of-two-is-nine / is-equal(9, add(1, 8))` pretends to state a divisor-function
   fact but never defines the divisor function. Instead define `task sigma-three` and prove
   `rule sigma-three-of-two / call sigma-three <2> = <9> / calm hold`, so `calm` runs your divisor
   sum and checks it. Better still, prove a universal like `sigma-k of a prime p is 1 + p^k` by
   `fold`.

4. **Encoding the answer into the statement.** A "triangle area" task that returns the very deficit
   you claim, then a rule that checks it equals the deficit. The proof must exercise an independent
   definition, not restate its own conclusion.

5. **Using `power` or other non-global names.** The global kernel arithmetic is `is-equal`, `add`,
   `multiply`, `subtract`, `is-below`, `is-above`. `power` is not global. Define it as a `task` or
   expand it, and only inside `hold` garnish anyway.

## What the checker actually enforces (learn this or you will ship unchecked garbage)

The kernel does NOT prove everything you write. Each construct has a decidable fragment, and outside it a
statement is either rejected or, worse, silently **accepted as a warning without being proven**. Verified
empirically against the `term` kernel:

- **`fold v` (structural induction over an inductive `form`)** — proves constructor-level equalities (the
  `parity`/`kauffman`/`nielsen` style) and **polynomial** closed forms whose RHS uses only `add` and
  `multiply` (the `sum.tree` Faulhaber style). It runs the commutative-ring normalizer.
- **`calm hold`** — reduces CLOSED constructor terms (`mirror left = right`). It does NOT drive deep
  recursion, and it does NOT evaluate enum-indexed machine-integer tables (`dimension octonion + dimension
  octonion = 16` fails under both `calm` and `fold`).
- **`hold`** — checks ONLY the decidable **linear machine-integer fragment**: `code N` literals combined
  with `add`, `multiply`, `is-equal`, `is-below`, `is-above`. A false one is rejected (`unproven`).
  **A `hold` that contains a `call` to a defined `task` is NOT checked** — it emits `warn <outside the
  decidable linear fragment ... not proven>` (code `000f`) and passes vacuously. Never trust a task-call
  `hold`. If your `scan` output says "N warnings", you have N unchecked statements masquerading as proved.
- **`subtract` breaks the ring normalizer** (natural-number monus is not ring minus). Keep `subtract` only
  INSIDE a task's recursion (`sum(n-1)`), never in a proven goal. State goals additively: instead of
  `total = 2d - 1` prove `total + 1 = 2*d`.

**Consequence for numeric facts.** An enum-indexed number (a dimension, a root count, a group order) is NOT
provable by `fold`/`calm`/task-`hold`. Your only checkable options are (a) a **pure-constant** machine `hold`
(`is-equal(240, add(112,128))`, honest for a genuine large COUNT, tautological for small ones), or (b)
encoding the number in unary constructors and proving structurally. So a count file must carry a real
**structural** theorem (a `fold`/`calm` law over a defined `form`) as its substance, with the counts as
pure-constant `hold` garnish beside it. See `space/hopf-fibration.tree`: the Cayley-Dickson `next` tower with
a proved ceiling theorem (`fold`), plus pure-constant dimension holds.

**Always grep the scan output for warnings**, not just errors:
`node <...>/host/line.js scan code/<f>.tree 2>&1 | grep -iE 'warn|unchecked|error|invalid'`. A file with
`unchecked-hold` warnings is not done.

## What the kernel can do now (learned building code/vibe, 2026-10-02)

- **A polynomial defined once as a task can be named in a ring identity.** A task over `integer` whose whole body is
  one `send back <expression>` is unfolded by the ring prover (check/unfold.ts), so `call eisenstein-norm` works in
  a goal, in a `have`, and in an `is-minimum` sum-of-squares goal. Recursive tasks and tasks over `natural-number`
  are never unfolded (`subtract` truncates there). Test: test/check/ring-unfold.ts.
- **`fold` splits records down to their finite fields.** `fold m, n` over two 2x2 matrices of residues enumerates
  every entry. A law about a record carrier needs no hand-written marks for its fields. Test: test/check/deep-split.ts.
- **The law kit, code/vibe/law.tree**: `fuse associative, name, carrier, op` and its siblings state one law in one
  line. Templates cannot expand other templates, so a structure is the list of its laws. Every template has a negative
  control that must be refused.
- **Define a task BEFORE the rule that calls it.** A rule elaborated before its helper fails with "the induction did
  not establish the equality", which reads like a false theorem. Two of these cost real time.
- **Do not write a multi-line `fork case` scrutinee.** Branch on a flag computed by a helper task instead:
  `fork case, call is-full, read l`, or a task that takes the flag as an argument.
- **Deep computations used to fail silently.** The kernel unfolded one definition per nested call, so a long chain
  exhausted the stack, and the fuel counter leaked on the exception, so EVERY later proof in the same build quietly
  failed. Both are fixed in check/judge.ts (iterative `whnf` unfolding, `try/finally` on the fuel). If a true closed
  computation fails, split it (two half-size rules) before suspecting the mathematics, and check with Python.
- **`cite` rewrites only the case term as quoted, before definitions unfold**, and the conversion that unfolds them
  uses only the induction hypotheses. An induction step that must unfold and THEN apply a lemma does not close. State
  lemmas in the shape the unreduced goal has, or model a finite instance and prove it by exhaustion.
- **Name every rule, task and form uniquely across the package.** `conjugate`, `shift`, `flip`, `negate` are taken.

## Checking a few files fast

The full package takes most of an hour. To check a handful of modules with every diagnostic printed, link them into
a small package (below sixteen files `term make` is sequential and prints every diagnostic; above, it prints only the
first per file): `sh control/check.sh law tone role`. The negative controls run with `sh control/run.sh`.

## The test that decides if a file is real

Ask: **if I deleted every `hold` and kept only the `form`, `task`, and `rule` blocks, would there
still be a theorem here?** If yes, the file models something. If the file collapses to nothing, it
was a calculator and must be rewritten to define its object and prove a property of it.

## How to make each topic real

- A **number-theoretic constant** (divisor sum, theta coefficient, Bernoulli): define the recursive
  function that produces it, prove it computes the value (`calm`), and prove a structural law
  (`fold`). Feed dependent files from the defined function, not from a retyped constant.
- A **combinatorial count** (kissing number, root count, code weights): define the predicate or the
  generating structure (like `is-integer-root` in `e8.tree`) and prove the members are accepted and
  the non-members rejected, plus an invariant (an involution, a parity, a closure). The final total
  can stay as one `hold` garnish, but the file's substance is the predicate and its proofs.
- An **algebraic identity** (octonion non-associativity, a fusion rule): define the algebra's product
  as a `task` and prove the identity by `calm` on the defined product, the way `octonion.tree` proves
  `(e1 e2) e4` differs from `e1 (e2 e4)`.

## Verify before you claim done

Run the checker on every file you touch:

```
node <path-to>/deck/term/deck/term/host/line.js scan code/<path>.tree
```

A green `✓ file ✓` means the kernel accepted the definitions and proved every rule. A file must
carry at least one `form` or `task` and at least one `rule`, or it is garnish and does not belong.
