import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/integral/hyperbolic-functions.tree: cosh and sinh built from the exponential's partial sums, with the
local bounds and the addition formula the disk's area needs, each with explicit errors. Also its negative controls."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

ROOT = SEED
T, P = ('t', 1), ('psum', 1)

E_BOUNDS = [
    have('w-is-in-the-unit-interval', '', 'w >= 0 && w <= 1'),
    have('e-is-above-its-second-order-part', '', '2 * ee - (2 + 2 * w + w * w) >= 0'),
    have('e-is-below-its-third-order-bound', '', '6 * ee - (6 + 6 * w + 3 * w * w) <= 2 * w * w * w'),
    have('rr-is-its-reciprocal', '', 'ee * rr == 1'),
    have('rr-is-positive', '', 'rr > 0'),
]

HEADER = '''# COSH AND SINH FROM THE EXPONENTIAL, with explicit errors: the analysis under the hyperbolic disk's area.
#
# integral/fundamental proves the area from two facts about cosh and sinh: the local bounds near 0 and the addition
# formula. This file proves both for the functions built from the exponential's PARTIAL SUMS E_N(x) (exact rationals,
# no limit taken):
#   cosh_N = (E_N + 1 / E_N) / 2,   sinh_N = (E_N - 1 / E_N) / 2,
# using the reciprocal where the classical definition uses E at -x, so no negative argument is needed.
#
#   THE EXPONENTIAL       each term after the first is at most half the last on [0, 1], and every partial sum from the
#                         third on lies between 1 + w + w^2/2 and 1 + w + w^2/2 + w^3/3;
#   THE LOCAL BOUNDS      so 0 <= cosh_N(w) - 1 <= w^2 and 0 <= sinh_N(w) - w <= w^3 on [0, 1];
#   THE ADDITION FORMULA  integral/exponential proves E_N(x) E_N(w) is within delta of E_N(x + w), with delta at most
#                         twice the N-th term of the series of e^(x + w) plus the last column, which tend to 0. Through
#                         the reciprocals (each of the four steps below), cosh_N(x + w) is within delta of
#                         cosh_N(x) cosh_N(w) + sinh_N(x) sinh_N(w);
#   THE DERIVATIVE        so each step of cosh_N is sinh_N times the step, up to big (w^2 + w^3) + delta;
#   THE AREA              and integral/fundamental's theorem with a per-step tolerance makes the Riemann sums of sinh_N
#                         over [0, r] within n (big (w^2 + w^3) + delta) of cosh_N(r) - 1. With n w = r the error is
#                         r big (w + w^2) + n delta: it tends to 0 as the mesh w shrinks and N grows with it. Times
#                         2 pi (the circumference is 2 pi sinh r, space/hyperbolic/metric), the disk's area is
#                         2 pi (cosh r - 1).
#
# Each rule takes as hypotheses what the rules before it prove, at the values named. Every certificate is the product
# prover's, replayed (check/product.ts), over an ordered field.
'''

RULES = [
    rule('each-exp-term-is-at-most-half-the-last', '''
# THE EXPONENTIAL's terms t(k) = w^k / k! obey (k + 1) t(k + 1) = w t(k): on [0, 1], from the second on, each is at most
# half the last.''', [T], 'k w', [
        have('the-term-from-the-last', '', '(k + 1) * t(k + 1) == w * t(k)'),
        have('the-last-term-is-not-negative', '', 't(k) >= 0'),
        have('k-is-at-least-one', '', 'k >= 1'),
        have('w-is-in-the-unit-interval', '', 'w >= 0 && w <= 1'),
    ], '2 * t(k + 1) <= t(k)'),
    rule('the-exp-partial-sums-are-bounded', '''
# Every partial sum from the third, E_(n + 3), lies in [1 + w + w^2/2, 1 + w + w^2/2 + w^3/3], by induction with the
# invariant 6 E + 6 t <= 6 + 6 w + 3 w^2 + 2 w^3.''', [T, P], 'n w', [
        have('the-third-term', '', '6 * t(3) == w * w * w'),
        have('each-term-is-at-most-half-the-last', 'k', 'k < 1 || 2 * t(k + 1) <= t(k)'),
        have('each-term-is-not-negative', 'k', 'k < 0 || t(k) >= 0'),
        have('the-third-partial-sum', '', '2 * psum(3) == 2 + 2 * w + w * w + 2 * t(3)'),
        have('each-partial-sum-adds-a-term', 'k', 'k < 0 || psum(k + 1) == psum(k) + t(k + 1)'),
        have('n-is-a-count', '', 'n >= 0'),
    ], '6 * psum(n + 3) - (6 + 6 * w + 3 * w * w) + 6 * t(n + 3) <= 2 * w * w * w'
       ' && 2 * psum(n + 3) - (2 + 2 * w + w * w) >= 0', 'n'),
    rule('cosh-near-zero', '''
# THE LOCAL BOUNDS of cosh = (E + R)/2, R = 1/E: 0 <= cosh(w) - 1 <= w^2, written for 2 cosh.''', [], 'w ee rr', E_BOUNDS,
         'ee + rr - 2 >= 0 && ee + rr - 2 <= 2 * w * w'),
    rule('sinh-near-zero', '''
# and of sinh = (E - R)/2: 0 <= sinh(w) - w <= w^3. (The lower side rests on (1 + w + w^2/2)^2 - 1 - 2 w (1 + w + w^2/2)
# = w^4 / 4.)''', [], 'w ee rr', E_BOUNDS, 'ee - rr - 2 * w >= 0 && ee - rr - 2 * w <= 2 * w * w * w'),
    rule('the-product-of-inverses-inverts-the-product', '''
# THE ADDITION FORMULA, through the reciprocals. First: 1/x times 1/w inverts x w.''', [], 'ex ew rx rw', [
        have('rx-inverts', '', 'ex * rx == 1'), have('rw-inverts', '', 'ew * rw == 1'),
    ], 'rx * rw * (ex * ew) == 1'),
    rule('the-reciprocal-difference', '''
# 1/s - 1/(x w) = (x w - s) / (s x w), as rs - pp = rs pp (x w - s).''', [], 'ex ew es rs pp', [
        have('rs-inverts', '', 'es * rs == 1'),
        have('pp-inverts-the-product', '', 'pp * (ex * ew) == 1'),
    ], 'rs - pp == rs * pp * (ex * ew - es)'),
    rule('an-inverse-of-at-least-one-is-at-most-one', '''
# An inverse of a number at least 1 is at most 1 (so rs pp is in [0, 1]).''', [], 'ee rr', [
        have('ee-is-at-least-one', '', 'ee >= 1'),
        have('rr-inverts', '', 'ee * rr == 1'),
        have('rr-is-positive', '', 'rr > 0'),
    ], 'rr <= 1'),
    rule('a-small-difference-scaled-by-at-most-one', '''
# A difference within delta, times a factor in [0, 1], is within delta.''', [], 'dd q delta', [
        have('dd-is-small', '', 'dd <= delta && 0 - dd <= delta'),
        have('q-is-in-the-unit-interval', '', 'q >= 0 && q <= 1'),
    ], 'dd * q <= delta && 0 - dd * q <= delta'),
    rule('cosh-addition-up-to-the-error-of-e', '''
# So 2 cosh(x + w) = es + rs is within 2 delta of 2 (cosh x cosh w + sinh x sinh w) = ex ew + rx rw: the addition
# formula, up to the exponential's own error.''', [], 'ex ew es rs pp q dd delta', [
        have('dd-is-the-error-of-e', '', 'dd == ex * ew - es'),
        have('the-reciprocal-difference', '', 'rs - pp == q * dd'),
        have('the-error-scaled', '', 'q * dd <= delta && 0 - q * dd <= delta'),
        have('the-error-is-small', '', 'dd <= delta && 0 - dd <= delta'),
    ], '(es + rs) - (ex * ew + pp) <= 2 * delta && (ex * ew + pp) - (es + rs) <= 2 * delta'),
    rule('cosh-has-derivative-sinh-up-to-an-error', '''
# THE DERIVATIVE, with the addition formula's error: a step of w changes cosh by sinh x w up to big (w^2 + w^3) + delta.''',
         [], 'cx sx cw sw cs w big delta', [
             have('the-addition-up-to-delta', '', 'cs - (cx * cw + sx * sw) <= delta && (cx * cw + sx * sw) - cs <= delta'),
             have('cosh-near-zero', '', 'cw - 1 >= 0 && cw - 1 <= w * w'),
             have('sinh-near-zero', '', 'sw - w >= 0 && sw - w <= w * w * w'),
             have('the-step-is-small', '', 'w >= 0 && w <= 1'),
             have('cosh-is-bounded-here', '', 'cx >= 0 && cx <= big'),
             have('sinh-is-bounded-here', '', 'sx >= 0 && sx <= big'),
             have('the-bound-is-not-negative', '', 'big >= 0'),
         ], 'cs - cx - sx * w <= big * w * w + big * w * w * w + delta && cs - cx - sx * w >= 0 - delta'),
    rule('the-riemann-sums-with-a-tolerance', '''
# THE AREA: the fundamental theorem with a per-step tolerance. If each step of F is f times the step up to tol, the
# Riemann sum of f over n strips is within n tol of F(b) - F(a).''', [('bigf', 1), ('f', 1), ('pt', 1), ('sum', 1)], 'n w tol', [
        have('bigf-steps-like-f', 'i',
             'i < 0 || bigf(pt(i + 1)) - bigf(pt(i)) - f(pt(i)) * w <= tol && f(pt(i)) * w - (bigf(pt(i + 1)) - bigf(pt(i))) <= tol'),
        have('the-riemann-sum-starts-at-zero', '', 'sum(0) == 0'),
        have('the-riemann-sum-adds-a-strip', 'i', 'i < 0 || sum(i + 1) == sum(i) + f(pt(i)) * w'),
        have('the-tolerance-is-not-negative', '', 'tol >= 0'),
        have('n-is-a-count', '', 'n >= 0'),
    ], 'sum(n) - (bigf(pt(n)) - bigf(pt(0))) <= n * tol && bigf(pt(n)) - bigf(pt(0)) - sum(n) <= n * tol', 'n'),
]

CONTROLS = [
    rule('control-cosh-near-zero-too-tight', '\n# false: cosh(w) - 1 is about w^2 / 2, not below w^2 / 4', [], 'w ee rr', E_BOUNDS,
         '4 * (ee + rr - 2) <= 2 * w * w'),
    rule('control-an-inverse-without-a-lower-bound', '\n# false: an inverse of a number below 1 exceeds 1', [], 'ee rr', [
        have('rr-inverts', '', 'ee * rr == 1'), have('rr-is-positive', '', 'rr > 0'),
    ], 'rr <= 1'),
    rule('control-cosh-addition-with-half-the-error', '\n# false: the reciprocal part adds its own delta', [],
         'ex ew es rs pp q dd delta', [
             have('dd-is-the-error-of-e', '', 'dd == ex * ew - es'),
             have('the-reciprocal-difference', '', 'rs - pp == q * dd'),
             have('the-error-scaled', '', 'q * dd <= delta && 0 - q * dd <= delta'),
             have('the-error-is-small', '', 'dd <= delta && 0 - dd <= delta'),
         ], '(es + rs) - (ex * ew + pp) <= delta'),
]


def main():
    open(f'{ROOT}/code/integral/hyperbolic-functions.tree', 'w').write(HEADER + '\n' + '\n\n'.join(RULES) + '\n')
    head = '# NEGATIVE CONTROLS for integral/hyperbolic-functions: each must be REFUSED. Expected: 3.\n'
    open(f'{ROOT}/control/number/hyperbolic-functions-control.tree', 'w').write(head + '\n\n'.join(CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls')


if __name__ == '__main__':
    main()
