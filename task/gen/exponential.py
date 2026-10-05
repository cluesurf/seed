import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/integral/exponential.tree: the exponential series and its addition formula, built in lemmas, each
proved by instantiating universal hypotheses over an ordered field. Also its negative controls."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

ROOT = SEED
U, V, W, C = ('u', 1), ('v', 1), ('w', 1), ('c', 2)

U_TIMES_V = have('u-times-v', 'k j', 'k < 0 || j < 0 || (k + 1) * u(k + 1) * v(j) == a * u(k) * v(j)')
V_TIMES_U = have('v-times-u', 'k j', 'k < 0 || j < 0 || (j + 1) * u(k) * v(j + 1) == b * u(k) * v(j)')
C_STARTS = have('c-starts', 'q', 'q < 0 || c(q, 0) == u(0) * v(q)')
C_ADDS = have('c-adds', 'q r', 'q < 0 || r < 0 || c(q, r + 1) == c(q, r) + u(r + 1) * v(q - r - 1)')

HEADER = '''# THE EXPONENTIAL SERIES AND ITS ADDITION FORMULA, the analytic fact the hyperbolic disk's area and Gauss-Bonnet rest
# on (integral/fundamental: cosh has derivative sinh given cosh(a + b) = cosh a cosh b + sinh a sinh b, and cosh and
# sinh are the even and odd parts of the exponential, so their addition formulas are ring identities of E(a + b) =
# E(a) E(b)).
#
# The terms are u(k) = a^k / k!, v(l) = b^l / l! and w(n) = (a + b)^n / n!, given by their recurrences
#   (k + 1) u(k + 1) = a u(k),   (l + 1) v(l + 1) = b v(l),   (n + 1) w(n + 1) = (a + b) w(n),   u(0) = v(0) = w(0) = 1,
# and the convolution c(n, m) = u(0) v(n) + u(1) v(n - 1) + ... + u(m) v(n - m).
#
#   THE BINOMIAL IDENTITY FOR EXPONENTIAL TERMS   c(n, n) = w(n): the sum over k of a^k b^(n - k) / (k! (n - k)!) is
#                                                 (a + b)^n / n!, for every n. Four lemmas:
#     u-recurrence-times-v      an equation times a term is an equation;
#     the-inner-identity        (n + 1) c(n + 1, m) = (a + b) c(n, m) - a u(m) v(n - m) for 0 <= m <= n, by induction on m
#                               (each new term splits as (m + 1) + (n - m), one factor for each recurrence);
#     the-convolution-steps     at m = n: (n + 1) c(n + 1, n + 1) = (a + b) c(n, n);
#     the-binomial-identity     so c(n, n) = w(n), by induction on n.
#
# So the Cauchy product of the series of e^a and e^b is, term by term, the series of e^(a + b). What remains for
# E(a + b) = E(a) E(b) is analytic: the product of the partial sums differs from the partial sum of the product by
# the terms u(k) v(l) with k + l > N, and those go to 0 (the tail lemmas of integral/fundamental bound them).
'''

RULES = [
    rule('u-recurrence-times-v', '''
# An equation times any quantity is an equation: the recurrence of u, times a term of v.''', [U, V], 'k j a', [
        have('u-recurrence', '', '(k + 1) * u(k + 1) == a * u(k)'),
    ], '(k + 1) * u(k + 1) * v(j) == a * u(k) * v(j)'),
    rule('the-inner-identity', '''
# THE INNER IDENTITY, by induction on m up to n. The new term (n + 1) u(m + 1) v(n - m) splits as
# (m + 1) u(m + 1) v(n - m) = a u(m) v(n - m) and (n - m) u(m + 1) v(n - m) = b u(m + 1) v(n - m - 1).''',
         [U, V, C], 'n m a b', [U_TIMES_V, V_TIMES_U, C_STARTS, C_ADDS,
                                have('m-is-a-count', '', 'm >= 0'), have('m-is-at-most-n', '', 'm <= n')],
         '(n + 1) * c(n + 1, m) == (a + b) * c(n, m) - a * u(m) * v(n - m)', 'm'),
    rule('the-convolution-steps', '''
# THE STEP: at m = n the inner identity, the last term u(n + 1) v(0), and the recurrence of u close it.''',
         [U, V, C], 'n a b', [
             have('the-inner-identity', 'q r',
                  'q < 0 || r < 0 || r > q || (q + 1) * c(q + 1, r) == (a + b) * c(q, r) - a * u(r) * v(q - r)'),
             U_TIMES_V, C_ADDS, have('n-is-a-count', '', 'n >= 0'),
         ], '(n + 1) * c(n + 1, n + 1) == (a + b) * c(n, n)'),
    rule('the-binomial-identity', '''
# THE BINOMIAL IDENTITY for exponential terms, by induction on n: the convolution and w obey one recurrence from one
# start, so they are equal.''', [C, W], 'n a b', [
        have('the-convolution-steps', 'q', 'q < 0 || (q + 1) * c(q + 1, q + 1) == (a + b) * c(q, q)'),
        have('w-recurrence', 'q', 'q < 0 || (q + 1) * w(q + 1) == (a + b) * w(q)'),
        have('they-start-together', '', 'c(0, 0) == w(0)'),
        have('n-is-a-count', '', 'n >= 0'),
    ], 'c(n, n) == w(n)', 'n'),
]

BB, R, T = ('bb', 1), ('r', 2), ('tt', 1)
B_TIMES_U = have('b-times-u', 'k l', 'k < 0 || l < 0 || u(k) * bb(l + 1) == u(k) * bb(l) + u(k) * v(l + 1)')
R_STARTS = have('r-starts', 'q', 'q < 0 || r(q, 0) == u(0) * bb(q)')
R_ADDS = have('r-adds', 'q p', 'q < 0 || p < 0 || r(q, p + 1) == r(q, p) + u(p + 1) * bb(q - p - 1)')
C_ADDS_P = have('c-adds', 'q p', 'q < 0 || p < 0 || c(q, p + 1) == c(q, p) + u(p + 1) * v(q - p - 1)')

RULES += [
    rule('b-recurrence-times-u', '''
# THE REORDERING. bb(l) = v(0) + ... + v(l) are the partial sums of b's series. The triangle T(N), the partial sum of
# the Cauchy product (T(N) = c(0, 0) + ... + c(N, N), so T(N) is the partial sum of e^(a + b) by the binomial
# identity), is reordered as r(N, N) = u(0) bb(N) + u(1) bb(N - 1) + ... + u(N) bb(0): a single sum over the terms of
# a. First, the recurrence of bb times a term of u.''', [U, V, BB], 'k l', [
        have('b-recurrence', '', 'bb(l + 1) == bb(l) + v(l + 1)'),
    ], 'u(k) * bb(l + 1) == u(k) * bb(l) + u(k) * v(l + 1)'),
    rule('each-column-adds-a-diagonal', '''
# r(N + 1, m) - r(N, m) = c(N + 1, m) for 0 <= m <= N, by induction on m: each new term adds u(m + 1) v(N - m).''',
         [U, V, C, BB, R], 'n m', [B_TIMES_U, C_STARTS, C_ADDS_P, R_STARTS, R_ADDS,
                                   have('m-is-a-count', '', 'm >= 0'), have('m-is-at-most-n', '', 'm <= n')],
         'r(n + 1, m) - r(n, m) == c(n + 1, m)', 'm'),
    rule('the-reordering-steps', '''
# At m = N, with the last term u(N + 1) bb(0) = u(N + 1) v(0): r(N + 1, N + 1) - r(N, N) = c(N + 1, N + 1).''',
         [U, V, C, BB, R], 'n', [
             have('each-column-adds-a-diagonal', 'q p', 'q < 0 || p < 0 || p > q || r(q + 1, p) - r(q, p) == c(q + 1, p)'),
             have('b-starts', '', 'bb(0) == v(0)'),
             have('b-starts-times-u', 'k', 'k < 0 || u(k) * bb(0) == u(k) * v(0)'),
             C_ADDS_P, R_ADDS, have('n-is-a-count', '', 'n >= 0'),
         ], 'r(n + 1, n + 1) - r(n, n) == c(n + 1, n + 1)'),
    rule('the-triangle-is-reordered', '''
# So the reordered sum is the triangle: r(N, N) = T(N), by induction on N.''', [C, R, T], 'n', [
        have('the-reordering-steps', 'q', 'q < 0 || r(q + 1, q + 1) - r(q, q) == c(q + 1, q + 1)'),
        have('t-starts', '', 'tt(0) == c(0, 0)'),
        have('t-adds', 'q', 'q < 0 || tt(q + 1) == tt(q) + c(q + 1, q + 1)'),
        have('they-start-together', '', 'r(0, 0) == c(0, 0)'),
        have('n-is-a-count', '', 'n >= 0'),
    ], 'r(n, n) == tt(n)', 'n'),
]

AA, DD = ('aa', 1), ('d', 2)
D_STARTS = have('d-starts', 'q', 'q < 0 || d(q, 0) == 0')
D_ADDS = have('d-adds', 'q p', 'q < 0 || p < 0 || d(q, p + 1) == d(q, p) + u(p + 1) * bb(q) - u(p + 1) * bb(q - p - 1)')

RULES += [
    rule('a-recurrence-times-b', '''
# THE SQUARE MINUS THE TRIANGLE. aa(K) = u(0) + ... + u(K) are the partial sums of a's series, so aa(N) bb(N) is the
# product of the partial sums: the square of terms u(k) v(l) with k, l <= N. Minus the reordered triangle it is
# d(N, N) = u(0) (bb(N) - bb(N)) + u(1) (bb(N) - bb(N - 1)) + ... + u(N) (bb(N) - bb(0)): the terms with k + l > N.
# First, the recurrence of aa times a partial sum of b.''', [U, AA, BB], 'k n', [
        have('a-recurrence', '', 'aa(k + 1) == aa(k) + u(k + 1)'),
    ], 'aa(k + 1) * bb(n) == aa(k) * bb(n) + u(k + 1) * bb(n)'),
    rule('the-square-minus-the-triangle', '''
# aa(m) bb(N) - r(N, m) = d(N, m) for 0 <= m <= N, by induction on m.''', [U, AA, BB, R, DD], 'n m', [
        have('a-times-b', 'k q', 'k < 0 || q < 0 || aa(k + 1) * bb(q) == aa(k) * bb(q) + u(k + 1) * bb(q)'),
        have('a-starts-times-b', 'q', 'q < 0 || aa(0) * bb(q) == u(0) * bb(q)'),
        R_STARTS, R_ADDS, D_STARTS, D_ADDS,
        have('m-is-a-count', '', 'm >= 0'), have('m-is-at-most-n', '', 'm <= n'),
    ], 'aa(m) * bb(n) - r(n, m) == d(n, m)', 'm'),
    rule('a-difference-term-is-small', '''
# Each term of the difference is small: a tail of b's series is at most twice its first term (integral/fundamental,
# a-tail-is-small-and-not-negative), and u(k) >= 0, so u(k) (bb(N) - bb(N - k)) <= 2 u(k) v(N - k).''',
         [U, V, BB], 'k n', [
             have('the-tail-of-b', '', 'bb(n) - bb(n - k) <= 2 * v(n - k)'),
             have('u-is-not-negative', '', 'u(k) >= 0'),
         ], 'u(k) * bb(n) - u(k) * bb(n - k) <= 2 * u(k) * v(n - k)'),
    rule('the-difference-is-small', '''
# So d(N, m) <= 2 c(N, m) for m < N, by induction on m: the difference is at most twice the convolution, which is the
# term w(N) = (a + b)^N / N! of the sum's series (the binomial identity), and that tends to 0. The last column,
# u(N) (bb(N) - bb(0)), is at most u(N) times a bound on bb, and u(N) tends to 0 too. So the product of the partial
# sums of e^a and e^b and the partial sum of e^(a + b) differ by at most 2 w(N) + u(N) bb(N): E(a) E(b) = E(a + b).''',
         [U, V, C, BB, DD], 'n m', [
             have('each-difference-term-is-small', 'k q', 'k < 0 || q < 0 || u(k) * bb(q) - u(k) * bb(q - k) <= 2 * u(k) * v(q - k)'),
             C_STARTS, C_ADDS_P, D_STARTS, D_ADDS,
             have('the-first-c-term-is-not-negative', 'q', 'q < 0 || u(0) * v(q) >= 0'),
             have('m-is-a-count', '', 'm >= 0'), have('m-is-below-n', '', 'm + 1 <= n'),
         ], 'd(n, m) <= 2 * c(n, m)', 'm'),
]

CONTROLS = [
    rule('control-the-inner-identity-without-the-a-term', '\n# false: the a u(m) v(n - m) correction dropped',
         [U, V, C], 'n m a b', [U_TIMES_V, V_TIMES_U, C_STARTS, C_ADDS,
                                have('m-is-a-count', '', 'm >= 0'), have('m-is-at-most-n', '', 'm <= n')],
         '(n + 1) * c(n + 1, m) == (a + b) * c(n, m)', 'm'),
    rule('control-the-binomial-identity-from-another-start', '\n# false: starting apart, they stay apart', [C, W], 'n a b', [
        have('the-convolution-steps', 'q', 'q < 0 || (q + 1) * c(q + 1, q + 1) == (a + b) * c(q, q)'),
        have('w-recurrence', 'q', 'q < 0 || (q + 1) * w(q + 1) == (a + b) * w(q)'),
        have('they-start-apart', '', 'c(0, 0) == w(0) + 1'),
        have('n-is-a-count', '', 'n >= 0'),
    ], 'c(n, n) == w(n)', 'n'),
]


def main():
    open(f'{ROOT}/code/integral/exponential.tree', 'w').write(HEADER + '\n' + '\n\n'.join(RULES) + '\n')
    head = '# NEGATIVE CONTROLS for integral/exponential: each must be REFUSED. Expected: 2.\n'
    open(f'{ROOT}/test/case/number/exponential-control.tree', 'w').write(head + '\n\n'.join(CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls')


if __name__ == '__main__':
    main()
