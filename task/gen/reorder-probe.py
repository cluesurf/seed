import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/reorder-probe.tree: the triangle sum of the Cauchy product equals sum_k u(k) B(N - k), in four lemmas."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

U, V, C, BB, R, T = ('u', 1), ('v', 1), ('c', 2), ('bb', 1), ('r', 2), ('tt', 1)

C_STARTS = have('c-starts', 'q', 'q < 0 || c(q, 0) == u(0) * v(q)')
C_ADDS = have('c-adds', 'q p', 'q < 0 || p < 0 || c(q, p + 1) == c(q, p) + u(p + 1) * v(q - p - 1)')
B_TIMES_U = have('b-times-u', 'k l', 'k < 0 || l < 0 || u(k) * bb(l + 1) == u(k) * bb(l) + u(k) * v(l + 1)')
R_STARTS = have('r-starts', 'q', 'q < 0 || r(q, 0) == u(0) * bb(q)')
R_ADDS = have('r-adds', 'q p', 'q < 0 || p < 0 || r(q, p + 1) == r(q, p) + u(p + 1) * bb(q - p - 1)')

r1 = rule('probe-b-recurrence-times-u', '\n# probe', [U, V, BB], 'k l', [
    have('b-recurrence', '', 'bb(l + 1) == bb(l) + v(l + 1)'),
], 'u(k) * bb(l + 1) == u(k) * bb(l) + u(k) * v(l + 1)')

r2 = rule('probe-each-column-adds-a-diagonal', '\n# probe', [U, V, C, BB, R], 'n m', [
    B_TIMES_U, C_STARTS, C_ADDS, R_STARTS, R_ADDS,
    have('m-is-a-count', '', 'm >= 0'),
    have('m-is-at-most-n', '', 'm <= n'),
], 'r(n + 1, m) - r(n, m) == c(n + 1, m)', 'm')

r3 = rule('probe-the-reordering-steps', '\n# probe', [U, V, C, BB, R], 'n', [
    have('each-column-adds-a-diagonal', 'q p', 'q < 0 || p < 0 || p > q || r(q + 1, p) - r(q, p) == c(q + 1, p)'),
    have('b-starts', '', 'bb(0) == v(0)'),
    have('b-starts-times-u', 'k', 'k < 0 || u(k) * bb(0) == u(k) * v(0)'),
    C_ADDS, R_ADDS,
    have('n-is-a-count', '', 'n >= 0'),
], 'r(n + 1, n + 1) - r(n, n) == c(n + 1, n + 1)')

r4 = rule('probe-the-triangle-is-reordered', '\n# probe', [C, R, T], 'n', [
    have('the-reordering-steps', 'q', 'q < 0 || r(q + 1, q + 1) - r(q, q) == c(q + 1, q + 1)'),
    have('t-starts', '', 'tt(0) == c(0, 0)'),
    have('t-adds', 'q', 'q < 0 || tt(q + 1) == tt(q) + c(q + 1, q + 1)'),
    have('they-start-together', '', 'r(0, 0) == c(0, 0)'),
    have('n-is-a-count', '', 'n >= 0'),
], 'r(n, n) == tt(n)', 'n')

open(_os.path.join(SEED, 'tmp/reorder-probe.tree'), 'w').write('\n\n'.join([r1, r2, r3, r4]) + '\n')
print('written')
