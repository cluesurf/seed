import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/difference-probe.tree: the product of partial sums minus the reordered triangle, and its bound."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

U, V, C, A, BB, R, D = ('u', 1), ('v', 1), ('c', 2), ('aa', 1), ('bb', 1), ('r', 2), ('d', 2)

d1 = rule('probe-a-recurrence-times-b', '\n# probe', [U, A, BB], 'k n', [
    have('a-recurrence', '', 'aa(k + 1) == aa(k) + u(k + 1)'),
], 'aa(k + 1) * bb(n) == aa(k) * bb(n) + u(k + 1) * bb(n)')

d2 = rule('probe-the-square-minus-the-triangle', '\n# probe', [U, A, BB, R, D], 'n m', [
    have('a-times-b', 'k q', 'k < 0 || q < 0 || aa(k + 1) * bb(q) == aa(k) * bb(q) + u(k + 1) * bb(q)'),
    have('a-starts-times-b', 'q', 'q < 0 || aa(0) * bb(q) == u(0) * bb(q)'),
    have('r-starts', 'q', 'q < 0 || r(q, 0) == u(0) * bb(q)'),
    have('r-adds', 'q p', 'q < 0 || p < 0 || r(q, p + 1) == r(q, p) + u(p + 1) * bb(q - p - 1)'),
    have('d-starts', 'q', 'q < 0 || d(q, 0) == 0'),
    have('d-adds', 'q p', 'q < 0 || p < 0 || d(q, p + 1) == d(q, p) + u(p + 1) * bb(q) - u(p + 1) * bb(q - p - 1)'),
    have('m-is-a-count', '', 'm >= 0'),
    have('m-is-at-most-n', '', 'm <= n'),
], 'aa(m) * bb(n) - r(n, m) == d(n, m)', 'm')

dterm = rule('probe-a-difference-term-is-small', '\n# probe', [U, V, BB], 'k n', [
    have('the-tail-of-b', '', 'bb(n) - bb(n - k) <= 2 * v(n - k)'),
    have('u-is-not-negative', '', 'u(k) >= 0'),
], 'u(k) * bb(n) - u(k) * bb(n - k) <= 2 * u(k) * v(n - k)')

d3 = rule('probe-the-difference-is-small', '\n# probe', [U, V, C, BB, D], 'n m', [
    have('each-difference-term-is-small', 'k q', 'k < 0 || q < 0 || u(k) * bb(q) - u(k) * bb(q - k) <= 2 * u(k) * v(q - k)'),
    C_STARTS := have('c-starts', 'q', 'q < 0 || c(q, 0) == u(0) * v(q)'),
    have('c-adds', 'q p', 'q < 0 || p < 0 || c(q, p + 1) == c(q, p) + u(p + 1) * v(q - p - 1)'),
    have('d-starts', 'q', 'q < 0 || d(q, 0) == 0'),
    have('d-adds', 'q p', 'q < 0 || p < 0 || d(q, p + 1) == d(q, p) + u(p + 1) * bb(q) - u(p + 1) * bb(q - p - 1)'),
    have('the-first-c-term-is-not-negative', 'q', 'q < 0 || u(0) * v(q) >= 0'),
    have('m-is-a-count', '', 'm >= 0'),
    have('m-is-below-n', '', 'm + 1 <= n'),
], 'd(n, m) <= 2 * c(n, m)', 'm')

open(_os.path.join(SEED, 'tmp/difference-probe.tree'), 'w').write('\n\n'.join([d1, d2, dterm, d3]) + '\n')
print('written')
