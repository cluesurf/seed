import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/binomial-probe.tree: the binomial identity for exponential terms, in four lemmas."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

U, V, W, C = ('u', 1), ('v', 1), ('w', 1), ('c', 2)

# L1: the recurrence of u, times any v term (an equation times an atom)
l1 = rule('probe-u-recurrence-times-v', '\n# probe', [U, V], 'k j a', [
    have('u-recurrence', '', '(k + 1) * u(k + 1) == a * u(k)'),
], '(k + 1) * u(k + 1) * v(j) == a * u(k) * v(j)')

# L2: inner induction on m, for 0 <= m <= n
l2 = rule('probe-the-inner-identity', '\n# probe', [U, V, C], 'n m a b', [
    have('u-times-v', 'k j', 'k < 0 || j < 0 || (k + 1) * u(k + 1) * v(j) == a * u(k) * v(j)'),
    have('v-times-u', 'k j', 'k < 0 || j < 0 || (j + 1) * u(k) * v(j + 1) == b * u(k) * v(j)'),
    have('c-starts', 'q', 'q < 0 || c(q, 0) == u(0) * v(q)'),
    have('c-adds', 'q r', 'q < 0 || r < 0 || c(q, r + 1) == c(q, r) + u(r + 1) * v(q - r - 1)'),
    have('m-is-a-count', '', 'm >= 0'),
    have('m-is-at-most-n', '', 'm <= n'),
], '(n + 1) * c(n + 1, m) == (a + b) * c(n, m) - a * u(m) * v(n - m)', 'm')

# L3: the inner identity at m = n closes the convolution
l3 = rule('probe-the-convolution-steps', '\n# probe', [U, V, C], 'n a b', [
    have('the-inner-identity', 'q r',
         'q < 0 || r < 0 || r > q || (q + 1) * c(q + 1, r) == (a + b) * c(q, r) - a * u(r) * v(q - r)'),
    have('u-times-v', 'k j', 'k < 0 || j < 0 || (k + 1) * u(k + 1) * v(j) == a * u(k) * v(j)'),
    have('c-adds', 'q r', 'q < 0 || r < 0 || c(q, r + 1) == c(q, r) + u(r + 1) * v(q - r - 1)'),
    have('n-is-a-count', '', 'n >= 0'),
], '(n + 1) * c(n + 1, n + 1) == (a + b) * c(n, n)')

# L4: the binomial identity for exponential terms, by induction on n
l4 = rule('probe-the-binomial-identity', '\n# probe', [C, W], 'n a b', [
    have('the-convolution-steps', 'q', 'q < 0 || (q + 1) * c(q + 1, q + 1) == (a + b) * c(q, q)'),
    have('w-recurrence', 'q', 'q < 0 || (q + 1) * w(q + 1) == (a + b) * w(q)'),
    have('they-start-together', '', 'c(0, 0) == w(0)'),
    have('n-is-a-count', '', 'n >= 0'),
], 'c(n, n) == w(n)', 'n')

open(_os.path.join(SEED, 'tmp/binomial-probe.tree'), 'w').write(l3 + '\n\n' + l4 + '\n')
print('written')
