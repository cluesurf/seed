<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<h3 align='center'>@term/seed</h3>
<p align='center'>
  The math library: machine-checked definitions and proofs
</p>

<br/>
<br/>
<br/>

## Introduction

Seed is a machine-checked library of mathematics, written in Term
`.tree` code.

Every structure here is defined as a concrete object and every theorem
is proved by a dependent type-checker. Nothing is asserted. A file does
not say "the integers form a group" in prose. It builds the integers,
defines addition, and proves associativity, commutativity, identity, and
inverse by induction. If a proof is wrong, the file does not compile.

It is a proof assistant and proof library in the lineage of Coq, Agda,
Lean, Idris, and Isabelle. The aim is the full foundations of
mathematics, the way those libraries do it, but in Term, with a small
clear surface anyone can read.

### Scope

The library descends from pure foundations up to physics:

- **Foundations.** Logic, sets, functions, relations, order, the natural
  numbers and integers, lists and trees.
- **Algebra.** Groups, rings, fields, Lie algebras, Clifford algebras,
  the division-algebra tower.
- **Geometry and space.** The three constant curvatures, hyperbolic
  honeycombs in dimensions two through five, the 24-cell and other
  polytopes, the hyperboloid and Poincare models.
- **The vibe substrate.** The eight base elements of vibe theory (tone,
  lean, site, dock, mesh, knit, wake, beat), each modeled and proved to
  satisfy its defining laws, the reversible charge-conserving law of
  motion, and the forced derivation from one distinction up to the
  24-cell.
- **Quantum and physics.** Quantum error-correcting codes, the Pauli and
  spinor structure, the standard-model symmetry counts, holography and
  the cusp-bulk geometry, discrete quantum dynamics.

### Library map

A high-level map of what is modeled and proved, grouped by area. Each
row is a concrete, machine-checked model (constructed objects plus
computable operations plus proven laws), not a stub.

**Foundations**

| area                          | proves                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Logic, sets, relations, order | boolean and ternary logic, set operations, equivalence and order laws, total and partial orders                                                         |
| Numbers                       | Peano naturals and the full semiring, the integers, parity, divisibility, primes, modular arithmetic, the Fibonacci sequence, Zeckendorf representation |
| Type theory                   | self-types, identity types, universes, multiplicity, refinement, the inductive list and tree                                                            |

**Algebra**

| area                   | proves                                                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Group theory           | cyclic groups, the quaternion group, homomorphisms, Lagrange's theorem (cosets partition the group)                                             |
| Division-algebra tower | complex, quaternion, octonion multiplication tables with their proven identities                                                                |
| Lie algebras           | su(2), so(4) = su(2)+su(2) (the factors commute), G2, the E8 Cartan matrix and Dynkin diagram, triality / Spin(8), the weight and root lattices |
| Clifford algebras      | Cl(2), Cl(3) (geometric algebra), Cl(1,3) the Dirac algebra (signature, anticommutation, the chirality element)                                 |

**Root systems, polytopes, exceptional structure**

| area                          | proves                                                                                                                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Root systems                  | A2, D4 (24 roots = the 24-cell), F4 (48 roots = 24-cell and its dual), the E8 root structure                                                                                                                 |
| Regular polytopes             | the 24-cell (self-dual), the 16-cell and tesseract (B4, with the demitesseract), the 600-cell and 120-cell (H4, by duality and Euler characteristic)                                                         |
| Coxeter and reflection groups | the symmetric group as a Weyl group, the general Coxeter matrix and Dynkin diagram, the Wythoff construction, the binary tetrahedral group 2T, the McKay correspondence (ADE = binary polyhedral = Platonic) |

**Geometry and hyperbolic space**

| area                 | proves                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tessellations        | the Schlafli classification (spherical / flat / hyperbolic by (p-2)(q-2) vs 4), triangle groups, pentagrid and heptagrid, the {5,3,4} dodecahedral and {3,4,3,4} 24-cell honeycombs |
| Curvature            | discrete Gauss-Bonnet (angle defect), Regge calculus (deficit angles, the icosahedron's total curvature)                                                                            |
| The splitting method | Margenstern's spanning tree, the white/black node Fibonacci recurrence, the preferred-son property                                                                                  |
| Boundary and bulk    | the cusp and horosphere, discrete AdS holography (the entanglement wedge), the Gromov boundary and Busemann function, Fuchsian groups and genus-g surfaces                          |

**Lattices and packing**

| area     | proves                                                                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Lattices | the D4 lattice (kissing number 24, Voronoi cell the 24-cell), the E8 lattice (even unimodular, kissing 240), the Leech lattice (no roots, the Golay-code weight combinatorics) |

**Quantum mechanics and information**

| area                 | proves                                                                                                                                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operators and states | the Pauli group (anticommutation), spinors, projective measurement (idempotence, orthogonality, completeness)                                                                                                   |
| Error correction     | the three-qubit bit-flip code, the multi-qubit stabilizer formalism, the holographic code (erasure correction)                                                                                                  |
| Entanglement         | the Bell states (perfect correlation), the Bell / CHSH inequality (the local bound), quantum teleportation, quantum tunneling                                                                                   |
| Fields and gravity   | the Fock-space ladder (the number operator), spin networks (SU(2) recoupling), the gauge group from the division-algebra tower, the standard-model particle content (charge quantization, anomaly cancellation) |

**Relativity, cosmology and gravity**

| area                             | proves                                                                                                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Special relativity               | the Lorentz group via rapidity, the Minkowski interval and light cone (timelike / lightlike / spacelike), causal structure                                 |
| General relativity and cosmology | causal sets (spacetime as a partial order), the FLRW expanding universe (Hubble's law, redshift), the Schwarzschild horizon and Bekenstein-Hawking entropy |

**Theory of computation**

| area              | proves                                                                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Universal models  | the SKI combinators (S K K = the identity), the lambda calculus (beta reduction), the Toffoli gate (reversible universality), Turing and register machines |
| Discrete dynamics | reversible cellular automata, interaction nets (strong confluence), the Garden of Eden and Hedlund's theorem                                               |

**The vibe substrate**

| area                    | proves                                                                                                                                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The tone and its numbers | the tone is the field F3 (C is negation, x^3 = x, balanced ternary adds exactly); the Eisenstein integers Z[w] (ring laws, multiplicative norm, reduction to F3, 3 ramifies, 7 splits, the six units); the coin and the meeting as exact unitary circulants (eigenvalues, det w, top speed 1/2) |
| The qutrit | the role grid Z3 x Z3 with its symplectic form and the 12 stabilizer lines of AG(2, 3); the 27 Weyl operators (Z X = w X Z, exponent 3, center); SL(2, 3) proved isomorphic to 2T by an explicit map; the Clifford action as automorphisms |
| The dock | 2T = Q8 x\| Z3 checked against the quaternions; the 24 slots as tone tetrads, proved to be exactly the 24 Hurwitz units; lines, frames, the W(D4) and W(F4) Coxeter relations, triality; the inner product is twice Re(g h^-1); a spherical 5-design, not a 6-design; the Hopf fibration as six circles of four; Cl(4) and the split of Cl+(4) |
| The mesh | Gram determinants classify {3,4,3} (spherical), {4,3,4} (flat), {3,4,3,4} (hyperbolic); the cone-type matrix gives the cubic, the shells 1, 24, 456, 8376, ... and the warp factor in (18.278, 18.279); Margenstern's Fibonacci splitting of {7,3}; the D4 lattice stand-in |
| The rule | the contact (bounce and pass), the pair store and the earliest pair map, each reversible and conserving charge, momentum and energy, with C; a ring of docks under the knit: the line law, reversibility, C and time reversal, motion at one dock per beat; velocity addition and the invariant interval |

### What a foundation is, and why it exists

A foundation of mathematics is a single small system of rules from which
all of mathematics can be built. Numbers, functions, spaces, groups, and
proofs about them are all expressed in the one language, and every
theorem reduces, in principle, to that base.

Foundations exist for four reasons:

- **One language.** Every branch of math (algebra, geometry, analysis)
  should rest on the same precise ground, so results in one area can be
  used in another without doubt.
- **Consistency.** A foundation must not prove a falsehood. Naive set
  theory did, and collapsed. A good foundation is built so the known
  paradoxes cannot be stated.
- **Certainty by checking.** If every step reduces to fixed rules, a
  machine can verify a proof with no trust in the author. Mathematics
  becomes mechanically certain, not socially agreed.
- **Meaning of proof.** A foundation decides what a proof _is_. In the
  constructive, computational view, a proof of "there exists an x" is a
  program that produces the x. Proofs become things that run.

The history is a series of trade-offs. Set theory gave one language but
made everything an untyped collection and left proof non-computational.
Formalism wanted pure symbol-pushing and was shown by Godel to be unable
to certify itself. Type theory grew up to make proofs typed and
runnable, and the modern branches argue over how equality should behave.

### Why we chose what we did

Seed exists to serve a system, Term, that compiles and runs real
programs, and to model physics (the vibe substrate) where computation is
the subject itself. So we need a foundation that is:

- **Typed**, because types catch errors and match how a programmer and a
  mathematician actually think.
- **Computational**, because a proof should reduce, run, and erase to
  efficient code, not sit as an inert symbol.
- **Resource-aware**, because a language that runs must know what is
  used once, many times, or only at compile time.
- **Small**, so the whole surface stays readable and the checker stays
  trustworthy.

That points to the dependent, quantitative, observational branch below,
and away from untyped set theory, non-computing axioms, and the heaviest
machinery.

### The foundation we use

Our kernel is a dependent type theory chosen to be powerful and
computational at once. It combines:

- **Quantitative Type Theory (QTT)** with usage `0 / 1 / many`, so
  erasure and linearity are one mechanism.
- **Observational equality** that computes: function extensionality is a
  theorem the machine reduces, not an axiom bolted on.
- A predicative, cumulative, universe-polymorphic hierarchy (no
  paradoxes of self-containing collections).
- **Self-types** for inductive definitions, dependent pairs (Sigma), the
  identity type with J, and metavariables with pattern unification.

This stack gives the strength of Agda and Lean while keeping equality
and resource-use clean, avoiding both the heavy cubical machinery and
impredicative shortcuts.

### How the modeling works (and why it compiles)

The same idea as Agda, Coq, and Lean, proof is type-checking, but with a
tiny, fixed, readable surface.

A model has three kinds of line:

- `form` defines a data type by its cases (an inductive type), like
  `form bit / case lo / case hi`.
- `task` defines a function by recursion on those cases (a total,
  terminating function the kernel can reduce).
- `rule` states a theorem (`mark` the variables, `show hold` the goal as
  `is-equal` of two terms) and proves it with one tactic.

The tactic vocabulary is small and closed (the opposite of Coq's
hundreds, no tactic language, no custom tactics):

| tactic | proves                                                                                |
| ------ | ------------------------------------------------------------------------------------- |
| `calm` | the two sides compute to one normal form (by definition)                              |
| `fold` | a universal law, by structural induction (`fold a, b` does several variables at once) |
| `cite` | rewrites with an already-proved lemma                                                 |
| `melt` | two functions are equal, lifted from a pointwise proof (funext)                       |

Compilation runs the file through parse, build, resolve, and check. The
checker normalizes terms (normalization by evaluation), decides
convertibility, and validates every `rule` against the kernel. A `rule`
desugars to a function whose parameters are its bound variables, so a
theorem is literally a checked program and an axiom is a postulated
value. Because the kernel is sound, a file that compiles is a file whose
theorems are true. Each is also tested against a deliberately false
variant, which must be rejected, so the proofs are not vacuous.

The result reads like ordinary code, checks like a proof assistant, and
(because Term compiles to many targets) can run anywhere. That is the
power and the future of Seed: one readable library, mechanically
certain, growing toward all of mathematics and the physics built on it.

### How this differs from the math you were taught

School and undergraduate math train one main move: compute and solve.
Arithmetic gives answers, algebra solves for `x`, calculus finds a
derivative. Even proofs, when they appear, are written as informal prose
for a human reader to be convinced by.

Seed is a different activity (the same one as Lean, Agda, Idris,
Coq, and Isabelle). It is closer to building with code than to solving
for an answer, and it rests on three ideas, more general than numbers:

- **Objects.** Everything is an object of a type, and types are not just
  numbers. A bit, a tone, a list, a group, a graph, even a proof, are
  all objects. You make new types freely with `form`, the way a
  programmer makes new data types. There is no privileged set of "real
  numbers" at the bottom.
- **Functions.** A function is a total, terminating rule, written by
  cases and recursion with `task`, exactly like a small program. It does
  not just transform numbers, it transforms any objects: a function can
  take a tone and return a charge, take a group element and return its
  inverse, take a proof and return another proof.
- **Relations and propositions.** A statement like "a equals b" or "x is
  below y" is itself an object you can hold, build, and prove. A proof
  is a value of that object's type. To know something is to have
  constructed it.

So the work is not "find the value of x". It is define a structure, then
prove the laws it obeys, and the machine checks the proof. An equation
like `mirror (mirror t) = t` is not computed to a number, it is
_established_ for every `t` by induction.

The slogan is proofs are programs. A theorem is a typed program, running
it is checking it, and an existence proof literally carries the thing it
claims exists. This is why the same file reads like ordinary code yet
carries the certainty of a proof. It is the generalization of
programming where types may depend on values and truth is a kind of
data.

### Formal verification, and why foundations are essential

Seed is one point in a much larger field: formal verification, the
science of proving software and mathematics correct rather than just
hoping they are. The field is a spectrum, from cheap-and-partial to
expensive-and-total.

| technique               | the question it answers                                             | guarantee                         |
| ----------------------- | ------------------------------------------------------------------- | --------------------------------- |
| Testing                 | did these specific examples work?                                   | the cases you tried               |
| Fuzzing                 | can a machine find an input that breaks it?                         | bugs found, not absence           |
| Static analysis / types | can whole classes of error be ruled out before running?             | the errors the type system models |
| Model checking          | does every reachable state of a finite system satisfy the property? | total, for finite systems         |
| SAT / SMT solving       | is this logical or arithmetic constraint satisfiable?               | total, within the theory          |
| Theorem proving         | does this follow from the axioms, for all inputs?                   | total, universal                  |

Underneath, three philosophies: search (SAT, SMT, fuzzing, model
checking find a bug or a witness), approximate (types, abstract
interpretation compute a safe summary), and prove (Coq, Lean, Agda, and
Seed construct a certificate that holds for _every_ case). The
advanced tools converge downward onto SMT and SAT engines.

How proving is done in practice is interactive theorem proving: a person
states a theorem and builds the proof, while the machine checks each
step, usually live in an editor over the Language Server Protocol or at
a terminal, so a red underline appears the instant a step is wrong. Some
steps are discharged by automated search (an SMT call, a decision
procedure); the rest are guided by the human. Seed sits firmly on
the prove side: it is a type-checker, every `rule` is a machine-checked
proof, and the same Term tooling that gives editor feedback for code
gives it for proofs.

Why insist on this when testing is so much cheaper? Because tests sample
and proofs cover. A test of a few inputs says nothing about the millions
you did not try. This is why the highest-stakes software is formally
verified end to end: the CompCert C compiler, the seL4 operating-system
kernel, cryptographic protocols, aircraft control code. A bug there is
not a crash report, it is a catastrophe, and a proof is the only thing
that rules out _all_ of them.

And here is the reason formal foundations are essential, not optional:
every one of these tools is only as trustworthy as the logic it runs on.
A model checker, an SMT solver, a proof assistant each rest on a small
formal core whose own rules must be sound, or the whole tower certifies
nothing. The foundation is the bedrock. It is what makes "the machine
checked it" mean "it is true" rather than "it passed the tests we
wrote." Seed builds on a foundation chosen to be sound,
computational, and small precisely so that everything checked on top of
it inherits that certainty, all the way up to the physics models.

### Standard foundations, and why we chose differently

Each historical foundation solved a problem and left one. Seed sits
at the end of this line, taking the computational, typed, resource-aware
branch.

| foundation                                    | era         | the problem it left                                                                           |
| --------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------- |
| Naive set theory (Cantor)                     | 1870s-1890s | Russell's paradox, outright inconsistent                                                      |
| Principia ramified types (Russell, Whitehead) | 1910s       | so complex it needed an ad-hoc reducibility axiom                                             |
| Zermelo-Fraenkel set theory (ZFC)             | 1900s-1920s | everything is an untyped set, not computational, choice and the continuum undecidable         |
| Hilbert formalism                             | 1920s       | Godel's incompleteness (1931) showed it could not prove its own consistency                   |
| Simple type theory (Church)                   | 1930s-1940  | typed and clean, but no dependent types, so most math cannot be stated                        |
| Martin-Lof type theory (MLTT)                 | 1970s-1980s | dependent and computational, but the identity type is subtle (equality vs univalence tension) |
| Calculus of Constructions / CIC (Coq)         | 1980s       | very powerful, but impredicative `Prop` and heavy machinery                                   |
| Homotopy Type Theory / Univalent Foundations  | 2000s-2010s | beautiful, but univalence was a non-computing axiom                                           |
| Cubical type theory                           | 2010s       | makes univalence compute, at the cost of large, intricate machinery                           |
| Quantitative + Observational TT (our base)    | 2010s-2020s | usage-aware and equality-computing, the branch Seed builds on                            |

The old line trades away either typing (set theory), computation
(formalism, axiomatic univalence), or simplicity (cubical). Our kernel
keeps all three: typed, computational, and small.

This file collects mathematical structures from across the literature
and models them in Term, each one checked.

## License

MIT

## ClueSurf

Made by [ClueSurf](https://clue.surf), meditating on the universe.
