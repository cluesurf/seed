import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/integral/fundamental.tree: the fundamental theorem of calculus for Riemann sums, and the exact
telescoping of the hyperbolic disk's area sums. Also the negative controls."""

import sys

sys.path.insert(0, GEN)
from completeness import prop  # noqa: E402
from tree import ind  # noqa: E402

ROOT = SEED


def fn(name, arity):
    takes = '\n'.join(f'      take a{i}, like integer' for i in range(arity))
    return f'  mark {name}\n    like task\n{takes}\n      like integer'


def have(name, binders, text):
    lines = [f'  have {name}']
    for b in binders.split():
        lines.append(f'    mark {b}, like integer')
    lines.append(ind(prop(text), 4))
    return '\n'.join(lines)


def rule(name, comment, functions, marks, haves, goal, induction=None, cites=()):
    out = [comment.rstrip(), f'rule {name}']
    out.extend(fn(f, a) for f, a in functions)
    for m in marks.split():
        out.append(f'  mark {m}, like integer')
    out.extend(haves)
    out.append('  show hold')
    out.append(ind(prop(goal), 4))
    if induction:
        out.append(f'  fold {induction}')
    # `cite <rule>`: a rule proven above, its hypotheses proved here and its conclusion used (check/holds.ts citedFacts)
    out.extend(f'  cite {c}' for c in cites)
    return '\n'.join(out)


FTC_FUNCTIONS = [('bigf', 1), ('f', 1), ('pt', 1), ('sum', 1)]
FTC_HAVES = [
    have('the-points-are-evenly-spaced', 'i', 'i < 0 || pt(i + 1) - pt(i) == w'),
    have('bigf-has-derivative-f-at-the-mesh', 'i',
         'i < 0 || bigf(pt(i + 1)) - bigf(pt(i)) - f(pt(i)) * w <= eps * w && f(pt(i)) * w - (bigf(pt(i + 1)) - bigf(pt(i))) <= eps * w'),
    have('the-riemann-sum-starts-at-zero', '', 'sum(0) == 0'),
    have('the-riemann-sum-adds-a-strip', 'i', 'i < 0 || sum(i + 1) == sum(i) + f(pt(i)) * w'),
    have('the-width-is-positive', '', 'w > 0'),
    have('the-tolerance-is-not-negative', '', 'eps >= 0'),
    have('n-is-a-count', '', 'n >= 0'),
]

HEADER = '''# THE FUNDAMENTAL THEOREM OF CALCULUS, for Riemann sums: the sums of a derivative converge to the difference of the
# function. F (written bigf) is UNIFORMLY DIFFERENTIABLE with derivative f when, for every tolerance eps > 0, a mesh
# w makes every step obey
#   |F(x + w) - F(x) - f(x) w| <= eps w,
# Bishop's definition of the derivative. For a partition of [a, b] into n strips of width w, points pt(0) = a,
# pt(i + 1) = pt(i) + w, the left Riemann sum is sum(0) = 0, sum(i + 1) = sum(i) + f(pt(i)) w, and the theorem is
#   |sum(n) - (F(pt(n)) - F(pt(0)))| <= eps n w = eps (b - a),
# for every n: the Riemann sums of f come within eps (b - a) of F(b) - F(a) once the mesh is fine enough for eps, so
# the integral of f over [a, b] IS F(b) - F(a). The proof is a telescoping induction over n (`fold n`), each step an
# instance of the derivative hypothesis, decided over an ordered field. F, f, pt and sum are quantified functions:
# the theorem holds for every function with a uniform derivative.
#
# THE HYPERBOLIC DISK. In space/hyperbolic/area the circle of radius r has circumference 2 pi sinh r and the area
# enclosed grows at that rate, so with F = cosh - 1 and f = sinh this theorem makes the disk's area the limit of its
# Riemann sums, 2 pi (cosh r - 1). The sums are also computed EXACTLY below: with C(i) = cosh(i h) and the midpoint
# sinh values M(i) = sinh((i + 1/2) h), the addition formula gives C(i + 1) - C(i) = 2 sinh(h/2) M(i) (from
# space/hyperbolic/archimedes: cosh(a + b) - cosh(a - b) = 2 sinh a sinh b), so the midpoint sum telescopes:
#   2 sinh(h/2) M(0) + ... + 2 sinh(h/2) M(n - 1) = cosh(n h) - 1,
# the area sum times h / (2 sinh(h/2)), a factor that tends to 1 with h.
'''

RULES = [
    rule('the-riemann-sums-of-a-derivative-approach-its-difference', '''
# THE THEOREM, by induction on the number of strips n.''', FTC_FUNCTIONS, 'n w eps', FTC_HAVES,
         'sum(n) - (bigf(pt(n)) - bigf(pt(0))) <= eps * n * w && bigf(pt(n)) - bigf(pt(0)) - sum(n) <= eps * n * w', 'n'),
    rule('the-addition-formula-gives-the-strip', '''
# THE STRIP OF THE DISK. For pairs on the hyperbola (cosh, sinh), cosh(a + b) - cosh(a - b) = 2 sinh a sinh b: with
# a = (i + 1/2) h and b = h / 2 this is C(i + 1) - C(i) = 2 sinh(h/2) M(i).''', [], 'ca sa cb sb', [],
         '(ca * cb + sa * sb) - (ca * cb - sa * sb) == 2 * sa * sb'),
    rule('the-disk-area-sum-telescopes', '''
# THE DISK AREA SUM, exactly: if each strip obeys C(i + 1) - C(i) = 2 s M(i) (s = sinh(h/2)), the sum of the strips
# 2 s M(i) is C(n) - C(0) = cosh(n h) - 1, for every n: the midpoint area sum, times the factor 2 s / h.''',
         [('cc', 1), ('mid', 1), ('acc', 1)], 'n s',
         [have('each-strip-is-a-difference', 'i', 'i < 0 || cc(i + 1) - cc(i) == 2 * s * mid(i)'),
          have('the-sum-starts-at-zero', '', 'acc(0) == 0'),
          have('the-sum-adds-a-strip', 'i', 'i < 0 || acc(i + 1) == acc(i) + 2 * s * mid(i)'),
          have('n-is-a-count', '', 'n >= 0')],
         'acc(n) == cc(n) - cc(0)', 'n'),
]

COSH_FUNCTIONS = [('cc', 1), ('ss', 1)]
COSH_HAVES = [
    have('the-addition-formula', 'a b', 'cc(a + b) == cc(a) * cc(b) + ss(a) * ss(b)'),
    have('cosh-near-zero', 'u', 'u < 0 || u > 1 || cc(u) - 1 >= 0 && cc(u) - 1 <= u * u'),
    have('sinh-near-zero', 'u', 'u < 0 || u > 1 || ss(u) - u >= 0 && ss(u) - u <= u * u * u'),
    have('the-step-is-small', '', 'w >= 0 && w <= 1'),
    have('cosh-is-bounded-here', '', 'cc(x) >= 0 && cc(x) <= big'),
    have('sinh-is-bounded-here', '', 'ss(x) >= 0 && ss(x) <= big'),
    have('the-bound-is-not-negative', '', 'big >= 0'),
]

RULES.append(rule('cosh-has-derivative-sinh', '''
# COSH IS UNIFORMLY DIFFERENTIABLE WITH DERIVATIVE SINH, from two elementary facts about the pair: the addition
# formula cosh(a + b) = cosh a cosh b + sinh a sinh b (archimedes.tree proves it is the boost composition), and the
# bounds near 0, 1 <= cosh w <= 1 + w^2 and w <= sinh w <= w + w^3 for 0 <= w <= 1 (true of the power series). Where
# cosh and sinh are at most big, a step of w changes cosh by sinh x w up to
#   0 <= cosh(x + w) - cosh(x) - sinh(x) w <= big (w^2 + w^3),
# which is the derivative hypothesis of the theorem above with eps = big (w + w^2), and eps -> 0 with the mesh. So the
# Riemann sums of sinh over [0, r] tend to cosh r - 1, and 2 pi times that is the area of the hyperbolic disk of
# radius r (its circumference is 2 pi sinh r, space/hyperbolic/metric). The certificate is the product prover's:
#   big w^2 + big w^3 - [..] = (big - cosh x)(cosh w - 1) + big (w^2 - cosh w + 1)
#                              + (big - sinh x)(sinh w - w) + big (w^3 - sinh w + w).''',
                  COSH_FUNCTIONS, 'x w big', COSH_HAVES,
                  'cc(x + w) - cc(x) - ss(x) * w <= big * w * w + big * w * w * w && cc(x + w) - cc(x) - ss(x) * w >= 0'))

GB_FUNCTIONS = [('ar', 1), ('ps', 1), ('th', 1), ('c', 1), ('ia', 1), ('ip', 1), ('it', 1)]


def gb_haves(turning=True):
    out = [
        have('the-area-follows-its-increment', 'i', 'i < 0 || ar(i + 1) - ar(i) - ia(i) <= eps * w && ia(i) - (ar(i + 1) - ar(i)) <= eps * w'),
        have('psi-follows-its-increment', 'i', 'i < 0 || ps(i + 1) - ps(i) - ip(i) <= eps * w && ip(i) - (ps(i + 1) - ps(i)) <= eps * w'),
        have('theta-follows-its-increment', 'i', 'i < 0 || th(i + 1) - th(i) - it(i) <= eps * w && it(i) - (th(i + 1) - th(i)) <= eps * w'),
        have('the-area-element', 'i', 'i < 0 || ia(i) == c(i) * it(i) - it(i)'),
    ]
    if turning:
        out.append(have('the-turning', 'i', 'i < 0 || ip(i) == 0 - c(i) * it(i)'))
    out += [have('the-width-is-positive', '', 'w > 0'), have('the-tolerance-is-not-negative', '', 'eps >= 0'),
            have('n-is-a-count', '', 'n >= 0')]
    return out


GB_GOAL = ('ar(n) - ar(0) + (ps(n) - ps(0)) + (th(n) - th(0)) <= 3 * eps * n * w'
           ' && 0 - (ar(n) - ar(0) + (ps(n) - ps(0)) + (th(n) - th(0))) <= 3 * eps * n * w')

RULES.append(rule('area-equals-defect', '''
# GAUSS-BONNET, AREA = DEFECT, for a triangle with a vertex O at the origin. Its far side is the geodesic from A to B,
# cut into n steps of arc w. Along it, theta is the polar angle, psi the angle between the geodesic and the radial
# direction, and ar the area swept from O. Each moves by its increment over a step up to eps w (uniform derivatives,
# as in the theorem above), and the increments obey, at every step,
#   area element   d(ar) = (cosh r - 1) d(theta)   (the disk: integral_0^r sinh = cosh r - 1, per unit of angle);
#   the turning    d(psi) = -cosh r d(theta)        (space/hyperbolic/area: M^2 + N^2 = sinh^2 r).
# Summing, ar(n) - ar(0) = -(psi(n) - psi(0)) - (theta(n) - theta(0)) up to 3 eps n w, which tends to 0. With the
# angle at O equal to theta(n) - theta(0), the angle at A equal to pi - psi(0) and the angle at B equal to psi(n),
# the right side is pi minus the three angles: THE AREA OF THE TRIANGLE IS ITS DEFECT. Every triangle is a sum or
# difference of two with a vertex at a chosen point, and defect is additive (space/hyperbolic/metric), so it holds for
# all. Here c(i) is cosh r at step i, and ia, ip, it are the increments.''',
                  GB_FUNCTIONS, 'n w eps', gb_haves(), GB_GOAL, 'n'))

RULES.append(rule('each-cosh-term-is-at-most-half-the-last', '''
# THE SERIES OF COSH, toward proving the bounds the cosh rule assumes. Its terms are t(k) = w^(2k) / (2k)!, so
# (2k + 1)(2k + 2) t(k + 1) = w^2 t(k) with t(0) = 1. On [0, 1] each term is at most half the one before.''',
                  [('t', 1)], 'k w', [
                      have('the-term-from-the-last', '', '(2 * k + 1) * (2 * k + 2) * t(k + 1) == w * w * t(k)'),
                      have('the-last-term-is-not-negative', '', 't(k) >= 0'),
                      have('k-is-a-count', '', 'k >= 0'),
                      have('w-squared-is-at-most-one', '', 'w * w <= 1'),
                  ], '2 * t(k + 1) <= t(k)'))

RULES.append(rule('the-partial-sums-of-cosh-are-bounded', '''
# EVERY PARTIAL SUM of cosh's series on [0, 1] obeys 0 <= P(N) - 1 <= w^2, by induction with the invariant
# P(N) - 1 + t(N) <= w^2 (the next term never more than fills the gap the last one left). This is the bound the cosh
# rule takes as a hypothesis, for every partial sum; for cosh itself it passes to the limit once the partial sums are
# shown to converge.''',
                  [('t', 1), ('psum', 1)], 'n w', [
                      have('the-first-term', '', 't(0) == 1'),
                      have('the-second-term', '', '2 * t(1) == w * w'),
                      have('each-term-is-at-most-half-the-last', 'k', 'k < 0 || 2 * t(k + 1) <= t(k)'),
                      have('each-term-is-not-negative', 'k', 'k < 0 || t(k) >= 0'),
                      have('the-first-partial-sum', '', 'psum(0) == 1'),
                      have('each-partial-sum-adds-a-term', 'k', 'k < 0 || psum(k + 1) == psum(k) + t(k + 1)'),
                      have('n-is-a-count', '', 'n >= 0'),
                  ], 'psum(n + 1) - 1 + t(n + 1) <= w * w && psum(n + 1) - 1 >= 0', 'n'))

RATIO = have('each-term-is-at-most-half-the-last', 'k', 'k < 0 || 2 * t(k + 1) <= t(k)')
SIGN = have('each-term-is-not-negative', 'k', 'k < 0 || t(k) >= 0')

RULES.append(rule('the-terms-are-at-most-one-over-their-index', '''
# CONVERGENCE. Halving makes each term at most 1 / N: (N + 1) t(N + 1) <= 1, by induction from t(1) = w^2 / 2.''',
                  [('t', 1)], 'n w', [
                      have('the-second-term', '', '2 * t(1) == w * w'),
                      have('w-squared-is-at-most-one', '', 'w * w <= 1'),
                      RATIO, SIGN,
                      have('n-is-a-count', '', 'n >= 0'),
                  ], '(n + 1) * t(n + 1) <= 1', 'n'))

RULES.append(rule('a-tail-is-small-and-not-negative', '''
# A TAIL of the series from term big on is at most twice that term, and the partial sums never fall:
# P(big + m) - P(big) + 2 t(big + m) <= 2 t(big), and P(big + m) >= P(big), by induction on m.''',
                  [('t', 1), ('psum', 1)], 'big m', [
                      RATIO, SIGN,
                      have('each-partial-sum-adds-a-term', 'k', 'k < 0 || psum(k + 1) == psum(k) + t(k + 1)'),
                      have('big-is-an-index', '', 'big >= 1'),
                      have('m-is-a-count', '', 'm >= 0'),
                  ], 'psum(big + m) - psum(big) + 2 * t(big + m) <= 2 * t(big) && psum(big + m) - psum(big) >= 0', 'm'))

RULES.append(rule('twice-a-term-is-at-most-the-modulus', '''
# With the modulus e(k) = 2 / k (k e(k) = 2), twice a term is at most the modulus at its index.''',
                  [('t', 1), ('e', 1)], 'k', [
                      have('the-term-is-at-most-one-over-k', '', 'k * t(k) <= 1'),
                      have('the-modulus-is-two-over-k', '', 'k * e(k) == 2'),
                      have('k-is-an-index', '', 'k >= 1'),
                  ], '2 * t(k) <= e(k)'))

RULES.append(rule('the-partial-sums-of-cosh-are-a-real', '''
# SO COSH(w) IS A REAL: its partial sums are a regular sequence, |P(p + m) - P(p)| <= e(p) + e(p + m), the definition
# of a real in number/completeness (e(k) = 2 / k is a modulus there: positive, and 4 e(4k) = e(k)). Every
# approximation lies in [1, 1 + w^2] (the-partial-sums-of-cosh-are-bounded), so cosh(w) does: THE BOUND THE COSH RULE
# ASSUMES HOLDS OF THE SERIES.''',
                  [('t', 1), ('psum', 1), ('e', 1)], 'p m', [
                      have('a-tail-is-small-and-not-negative', 'b j',
                           'b < 1 || j < 0 || psum(b + j) - psum(b) + 2 * t(b + j) <= 2 * t(b) && psum(b + j) - psum(b) >= 0'),
                      have('twice-a-term-is-at-most-the-modulus', 'k', 'k < 1 || 2 * t(k) <= e(k)'),
                      have('the-modulus-is-positive', 'k', 'k < 1 || e(k) > 0'),
                      SIGN,
                      have('p-is-an-index', '', 'p >= 1'),
                      have('m-is-a-count', '', 'm >= 0'),
                  ], 'psum(p + m) - psum(p) <= e(p) + e(p + m) && psum(p) - psum(p + m) <= e(p) + e(p + m)'))

RULES.append(rule('each-sinh-term-is-at-most-half-the-last', '''
# THE SERIES OF SINH: terms s(k) = w^(2k + 1) / (2k + 1)!, so (2k + 2)(2k + 3) s(k + 1) = w^2 s(k), s(0) = w. On
# [0, 1] each term is at most half the one before.''',
                  [('t', 1)], 'k w', [
                      have('the-term-from-the-last', '', '(2 * k + 2) * (2 * k + 3) * t(k + 1) == w * w * t(k)'),
                      have('the-last-term-is-not-negative', '', 't(k) >= 0'),
                      have('k-is-a-count', '', 'k >= 0'),
                      have('w-squared-is-at-most-one', '', 'w * w <= 1'),
                  ], '2 * t(k + 1) <= t(k)'))

RULES.append(rule('the-partial-sums-of-sinh-are-bounded', '''
# EVERY PARTIAL SUM of sinh's series on [0, 1] obeys 0 <= Q(N) - w <= w^3, with the invariant Q(N) - w + s(N) <= w^3
# from 6 s(1) = w^3. With the same convergence lemmas (they use only the halving and the signs), sinh(w) is a real in
# [w, w + w^3]: the other bound the cosh rule assumes.''',
                  [('t', 1), ('psum', 1)], 'n w', [
                      have('the-first-term', '', 't(0) == w'),
                      have('the-second-term', '', '6 * t(1) == w * w * w'),
                      have('w-is-not-negative', '', 'w >= 0'),
                      RATIO, SIGN,
                      have('the-first-partial-sum', '', 'psum(0) == w'),
                      have('each-partial-sum-adds-a-term', 'k', 'k < 0 || psum(k + 1) == psum(k) + t(k + 1)'),
                      have('n-is-a-count', '', 'n >= 0'),
                  ], 'psum(n + 1) - w + t(n + 1) <= w * w * w && psum(n + 1) - w >= 0', 'n'))

CONTROLS = [
    rule('control-gauss-bonnet-without-the-turning', '''
# false: without the turning identity the angles say nothing about the area''',
         GB_FUNCTIONS, 'n w eps', gb_haves(turning=False), GB_GOAL, 'n'),
    rule('control-cosh-without-the-cube', '''
# false: big w^2 alone does not bound the step (cosh x = sinh x = big, cosh w - 1 = w^2, sinh w - w = w^3)''',
         COSH_FUNCTIONS, 'x w big', COSH_HAVES, 'cc(x + w) - cc(x) - ss(x) * w <= big * w * w'),
    rule('control-half-the-tolerance', '\n# false: eps n w / 2 is not enough', FTC_FUNCTIONS, 'n w eps', FTC_HAVES,
         'sum(n) - (bigf(pt(n)) - bigf(pt(0))) <= eps * n * w - eps * w', 'n'),
    rule('control-without-the-derivative', '\n# false: without the derivative hypothesis the sum says nothing',
         FTC_FUNCTIONS, 'n w eps', [h for h in FTC_HAVES if 'derivative' not in h],
         'sum(n) - (bigf(pt(n)) - bigf(pt(0))) <= eps * n * w', 'n'),
    rule('control-a-two-sided-nonlinear-hypothesis', '''
# false: from 0 <= x(t) y <= 1 for every t nothing gives x(0) y >= 7. (A prover that assumed a hypothesis's NEGATION
# would hold x(0) y > 1 and x(0) y < 0 together, and prove this from the contradiction.)''',
         [('x', 1)], 'y', [have('bounded', 't', 'x(t) * y <= 1 && x(t) * y >= 0')], 'x(0) * y >= 7'),
    rule('control-the-disk-sum-off-by-one', '\n# false: the telescoped sum is cc(n) - cc(0), not cc(n)',
         [('cc', 1), ('mid', 1), ('acc', 1)], 'n s',
         [have('each-strip-is-a-difference', 'i', 'i < 0 || cc(i + 1) - cc(i) == 2 * s * mid(i)'),
          have('the-sum-starts-at-zero', '', 'acc(0) == 0'),
          have('the-sum-adds-a-strip', 'i', 'i < 0 || acc(i + 1) == acc(i) + 2 * s * mid(i)'),
          have('n-is-a-count', '', 'n >= 0')],
         'acc(n) == cc(n)', 'n'),
]


def main():
    open(f'{ROOT}/code/integral/fundamental.tree', 'w').write(HEADER + '\n' + '\n\n'.join(RULES) + '\n')
    head = '# NEGATIVE CONTROLS for integral/fundamental: each must be REFUSED. Expected: 6.\n'
    open(f'{ROOT}/control/number/fundamental-control.tree', 'w').write(head + '\n\n'.join(CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls')


if __name__ == '__main__':
    main()
