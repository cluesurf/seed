import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/regular-probe.tree: the partial sums of cosh's series are a regular sequence with modulus e(N) = 2 / N, so
they are a real in the sense of number/completeness."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

RATIO = have('each-term-is-at-most-half-the-last', 'k', 'k < 0 || 2 * t(k + 1) <= t(k)')
SIGN = have('each-term-is-not-negative', 'k', 'k < 0 || t(k) >= 0')

tail = rule('probe-a-tail-is-small-and-not-negative', '\n# probe', [('t', 1), ('psum', 1)], 'big m', [
    RATIO, SIGN,
    have('each-partial-sum-adds-a-term', 'k', 'k < 0 || psum(k + 1) == psum(k) + t(k + 1)'),
    have('big-is-an-index', '', 'big >= 1'),
    have('m-is-a-count', '', 'm >= 0'),
], 'psum(big + m) - psum(big) + 2 * t(big + m) <= 2 * t(big) && psum(big + m) - psum(big) >= 0', 'm')

regular = rule('probe-the-partial-sums-are-regular', '\n# probe', [('t', 1), ('psum', 1), ('e', 1)], 'p m', [
    have('a-tail-is-small-and-not-negative', 'b j',
         'b < 1 || j < 0 || psum(b + j) - psum(b) + 2 * t(b + j) <= 2 * t(b) && psum(b + j) - psum(b) >= 0'),
    have('twice-a-term-is-at-most-the-modulus', 'k', 'k < 1 || 2 * t(k) <= e(k)'),
    have('the-modulus-is-positive', 'k', 'k < 1 || e(k) > 0'),
    SIGN,
    have('p-is-an-index', '', 'p >= 1'),
    have('m-is-a-count', '', 'm >= 0'),
], 'psum(p + m) - psum(p) <= e(p) + e(p + m) && psum(p) - psum(p + m) <= e(p) + e(p + m)')

step = rule('probe-twice-a-term-is-at-most-the-modulus', '\n# probe', [('t', 1), ('e', 1)], 'k', [
    have('the-term-is-at-most-one-over-k', '', 'k * t(k) <= 1'),
    have('the-modulus-is-two-over-k', '', 'k * e(k) == 2'),
    have('k-is-an-index', '', 'k >= 1'),
], '2 * t(k) <= e(k)')

open(_os.path.join(SEED, 'tmp/regular-probe.tree'), 'w').write(tail + '\n\n' + step + '\n\n' + regular + '\n')
print('written')
