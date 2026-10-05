import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/integral/limits.tree: the error terms of the exponential's addition formula tend to 0, and the partial
sums are bounded on an interval. Also its negative controls."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

ROOT = SEED
T, P, S = ('t', 1), ('p', 1), ('s', 1)

HEADER = '''# THE ERRORS TEND TO 0: the last analytic step under the hyperbolic disk's area.
#
# integral/exponential bounds the gap between E_N(a) E_N(b) and E_N(a + b) by 2 w(N) + u(N) bb(N), where w(N) =
# (a + b)^N / N! and u(N) = a^N / N! are terms of exponential series and bb(N) is a partial sum of e^b. This file proves
# each piece tends to 0, with an explicit index for every tolerance, and bounds the partial sums on an interval [0, R],
# which is the bound `big` integral/hyperbolic-functions takes as a hypothesis.
#
#   THE TERMS HALVE       a term t(k) of the series of e^x, (k + 1) t(k + 1) = x t(k), is at most half the last once
#                         k + 1 >= 2 x;
#   SO THEY FALL LIKE 2^-j from such a start n0: p(j) t(n0 + j) <= t(n0), with p(j) = 2^j;
#   2^j >= j + 1          by induction;
#   SO THEY TEND TO 0     for every eps > 0, any j with (j + 1) eps >= t(n0) gives t(n0 + j) <= eps (the Archimedean
#                         property of the field gives such a j, number/completeness);
#   THE SUMS ARE BOUNDED  each partial sum past n0 is at most the sum at n0 plus 2 t(n0), the tail being at most twice
#                         its first term;
#   MONOTONE IN x         on 0 <= x <= R each term of e^x is at most the same term of e^R, so each partial sum is too,
#                         and one bound serves the whole interval;
#   COSH AND SINH         and cosh_N = (E + 1/E)/2 and sinh_N = (E - 1/E)/2 are each at most E when E >= 1, so that
#                         bound is the `big` of the derivative step.
#
# Every certificate is the product prover's, replayed (check/product.ts), over an ordered field.
'''

RULES = [
    rule('a-term-past-twice-x-is-at-most-half-the-last', '''
# THE TERMS HALVE: (k + 1) t(k + 1) = x t(k) with k + 1 >= 2 x gives 2 t(k + 1) <= t(k).''', [T], 'k x', [
        have('the-term-from-the-last', '', '(k + 1) * t(k + 1) == x * t(k)'),
        have('the-last-term-is-not-negative', '', 't(k) >= 0'),
        have('k-is-past-twice-x', '', 'k + 1 >= 2 * x'),
        have('x-is-not-negative', '', 'x >= 0'),
        have('k-is-a-count', '', 'k >= 0'),
    ], '2 * t(k + 1) <= t(k)'),
    rule('the-powers-of-two-pass-the-counts', '''
# 2^j >= j + 1, for the powers p(0) = 1, p(j + 1) = 2 p(j), by induction on j.''', [P], 'j', [
        have('p-starts-at-one', '', 'p(0) == 1'),
        have('p-doubles', 'k', 'k < 0 || p(k + 1) == 2 * p(k)'),
        have('j-is-a-count', '', 'j >= 0'),
    ], 'p(j) >= j + 1', 'j'),
    rule('the-terms-fall-like-powers-of-two', '''
# SO THEY FALL like 2^-j from a start n0 past twice x: p(j) t(n0 + j) <= t(n0), by induction on j.''', [T, P], 'n0 j', [
        have('each-term-past-n0-halves', 'k', 'k < n0 || 2 * t(k + 1) <= t(k)'),
        have('p-starts-at-one', '', 'p(0) == 1'),
        have('p-doubles', 'k', 'k < 0 || p(k + 1) == 2 * p(k)'),
        have('p-is-not-negative', 'k', 'k < 0 || p(k) >= 0'),
        have('n0-is-a-count', '', 'n0 >= 0'),
        have('j-is-a-count', '', 'j >= 0'),
    ], 'p(j) * t(n0 + j) <= t(n0)', 'j'),
    rule('a-term-is-below-any-tolerance', '''
# SO THEY TEND TO 0: a term t with p t <= t0 and p >= j + 1, for j with (j + 1) eps >= t0, is at most eps.''', [],
         'tt t0 pp j eps', [
             have('it-falls-like-a-power-of-two', '', 'pp * tt <= t0'),
             have('the-power-passes-the-count', '', 'pp >= j + 1'),
             have('j-is-far-enough', '', '(j + 1) * eps >= t0'),
             have('j-is-a-count', '', 'j >= 0'),
             have('the-tolerance-is-positive', '', 'eps > 0'),
         ], 'tt <= eps'),
    rule('the-partial-sums-past-n0-are-bounded', '''
# THE SUMS ARE BOUNDED: with s(n0 + j + 1) = s(n0 + j) + t(n0 + j + 1) and each term past n0 at most half the last,
# s(n0 + j) + 2 t(n0 + j + 1) <= s(n0) + 2 t(n0 + 1), by induction on j: the sum so far plus twice the next term
# never grows, as the next term plus twice the one after is at most twice the next.''', [T, S], 'n0 j', [
        have('each-term-past-n0-halves', 'k', 'k < n0 || 2 * t(k + 1) <= t(k)'),
        have('each-sum-adds-a-term', 'k', 'k < 0 || s(k + 1) == s(k) + t(k + 1)'),
        have('n0-is-a-count', '', 'n0 >= 0'),
        have('j-is-a-count', '', 'j >= 0'),
    ], 's(n0 + j) + 2 * t(n0 + j + 1) <= s(n0) + 2 * t(n0 + 1)', 'j'),
    rule('a-term-step-keeps-the-order', '''
# MONOTONE IN x: on 0 <= x <= R, a term of e^x at most the same term of e^R stays so at the next step (u for x, t
# for R): (k + 1) u1 = x u0 <= R t0 = (k + 1) t1.''', [], 'k x r u0 u1 t0 t1', [
        have('u-steps', '', '(k + 1) * u1 == x * u0'),
        have('t-steps', '', '(k + 1) * t1 == r * t0'),
        have('u0-is-at-most-t0', '', 'u0 <= t0'),
        have('u0-is-not-negative', '', 'u0 >= 0'),
        have('x-is-in-the-interval', '', 'x >= 0 && x <= r'),
        have('k-is-a-count', '', 'k >= 0'),
    ], 'u1 <= t1'),
    rule('the-terms-grow-with-x', '''
# so every term of e^x is at most the same term of e^R, by induction on k.''', [('u', 1), T], 'k', [
        have('u-starts-at-one', '', 'u(0) == 1'),
        have('t-starts-at-one', '', 't(0) == 1'),
        have('each-step-keeps-the-order', 'i', 'i < 0 || u(i) > t(i) || u(i + 1) <= t(i + 1)'),
        have('k-is-a-count', '', 'k >= 0'),
    ], 'u(k) <= t(k)', 'k'),
    rule('the-partial-sums-grow-with-x', '''
# so each partial sum of e^x is at most the same partial sum of e^R, by induction on n.''',
         [('u', 1), T, ('su', 1), S], 'n', [
             have('the-terms-grow-with-x', 'i', 'i < 0 || u(i) <= t(i)'),
             have('su-starts-at-one', '', 'su(0) == u(0)'),
             have('s-starts-at-one', '', 's(0) == t(0)'),
             have('su-adds-a-term', 'i', 'i < 0 || su(i + 1) == su(i) + u(i + 1)'),
             have('s-adds-a-term', 'i', 'i < 0 || s(i + 1) == s(i) + t(i + 1)'),
             have('n-is-a-count', '', 'n >= 0'),
         ], 'su(n) <= s(n)', 'n'),
    rule('cosh-and-sinh-are-at-most-e', '''
# COSH AND SINH: with E >= 1 and R = 1/E, both 2 cosh = E + R and 2 sinh = E - R lie in [0, 2 E].''', [], 'ee rr', [
        have('ee-is-at-least-one', '', 'ee >= 1'),
        have('rr-inverts', '', 'ee * rr == 1'),
        have('rr-is-positive', '', 'rr > 0'),
    ], 'ee + rr <= 2 * ee && ee + rr >= 0 && ee - rr <= 2 * ee && ee - rr >= 0'),
    rule('within-every-tolerance-is-equal', '''
# WITHIN EVERY TOLERANCE IS EQUAL. Reals are regular sequences (number/completeness). If x is within 1/k of y for
# every k, at every precision n up to the sequences' own 2/n, then at k = n, |x(n) - y(n)| <= 3/n for every n:
# Bishop's criterion for x = y. This is the last step of "zero derivative means constant" (the fundamental theorem
# with f = 0 puts F(b) within every eps (b - a) of F(a)).''', [('x', 1), ('y', 1)], 'n', [
        have('x-is-within-every-tolerance-of-y', 'k m',
             'k < 1 || m < 1 || k * m * (x(m) - y(m)) <= m + 2 * k && k * m * (y(m) - x(m)) <= m + 2 * k'),
        have('n-is-a-precision', '', 'n >= 1'),
    ], 'n * (x(n) - y(n)) <= 3 && n * (y(n) - x(n)) <= 3'),
]

CONTROLS = [
    rule('control-a-term-before-twice-x-halves', '\n# false: before k + 1 reaches 2 x the terms may grow', [T], 'k x', [
        have('the-term-from-the-last', '', '(k + 1) * t(k + 1) == x * t(k)'),
        have('the-last-term-is-not-negative', '', 't(k) >= 0'),
        have('x-is-not-negative', '', 'x >= 0'),
        have('k-is-a-count', '', 'k >= 0'),
    ], '2 * t(k + 1) <= t(k)'),
    rule('control-the-powers-of-two-pass-twice-the-counts', '\n# false: 2^1 = 2 is below 2 (1 + 1) = 4', [P], 'j', [
        have('p-starts-at-one', '', 'p(0) == 1'),
        have('p-doubles', 'k', 'k < 0 || p(k + 1) == 2 * p(k)'),
        have('j-is-a-count', '', 'j >= 0'),
    ], 'p(j) >= 2 * j + 2', 'j'),
    rule('control-a-term-below-half-the-tolerance', '\n# false: the bound reaches eps, not eps / 2', [],
         'tt t0 pp j eps', [
             have('it-falls-like-a-power-of-two', '', 'pp * tt <= t0'),
             have('the-power-passes-the-count', '', 'pp >= j + 1'),
             have('j-is-far-enough', '', '(j + 1) * eps >= t0'),
             have('j-is-a-count', '', 'j >= 0'),
             have('the-tolerance-is-positive', '', 'eps > 0'),
         ], '2 * tt <= eps'),
    rule('control-the-sums-past-n0-without-the-tail', '\n# false: the sum grows past its value at n0', [T, S], 'n0 j', [
        have('each-term-past-n0-halves', 'k', 'k < n0 || 2 * t(k + 1) <= t(k)'),
        have('each-sum-adds-a-term', 'k', 'k < 0 || s(k + 1) == s(k) + t(k + 1)'),
        have('n0-is-a-count', '', 'n0 >= 0'),
        have('j-is-a-count', '', 'j >= 0'),
    ], 's(n0 + j) <= s(n0)', 'j'),
    rule('control-within-every-tolerance-is-within-one-over-n', '\n# false: the sequences carry their own 2/n',
         [('x', 1), ('y', 1)], 'n', [
             have('x-is-within-every-tolerance-of-y', 'k m',
                  'k < 1 || m < 1 || k * m * (x(m) - y(m)) <= m + 2 * k && k * m * (y(m) - x(m)) <= m + 2 * k'),
             have('n-is-a-precision', '', 'n >= 1'),
         ], 'n * (x(n) - y(n)) <= 1'),
]


def main():
    open(f'{ROOT}/code/integral/limits.tree', 'w').write(HEADER + '\n' + '\n\n'.join(RULES) + '\n')
    head = '# NEGATIVE CONTROLS for integral/limits: each must be REFUSED. Expected: 5.\n'
    open(f'{ROOT}/control/number/limits-control.tree', 'w').write(head + '\n\n'.join(CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls')


if __name__ == '__main__':
    main()
