import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/exp-bounds-probe.tree: second-order bounds on the partial sums of the exponential on [0, 1]."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

T, P = ('t', 1), ('psum', 1)

ratio = rule('probe-each-exp-term-is-at-most-half-the-last', '\n# probe', [T], 'k w', [
    have('the-term-from-the-last', '', '(k + 1) * t(k + 1) == w * t(k)'),
    have('the-last-term-is-not-negative', '', 't(k) >= 0'),
    have('k-is-at-least-one', '', 'k >= 1'),
    have('w-is-in-the-unit-interval', '', 'w >= 0 && w <= 1'),
], '2 * t(k + 1) <= t(k)')

bounds = rule('probe-the-exp-partial-sums-are-bounded', '\n# probe', [T, P], 'n w', [
    have('the-third-term', '', '6 * t(3) == w * w * w'),
    have('each-term-is-at-most-half-the-last', 'k', 'k < 1 || 2 * t(k + 1) <= t(k)'),
    have('each-term-is-not-negative', 'k', 'k < 0 || t(k) >= 0'),
    have('the-third-partial-sum', '', '2 * psum(3) == 2 + 2 * w + w * w + 2 * t(3)'),
    have('each-partial-sum-adds-a-term', 'k', 'k < 0 || psum(k + 1) == psum(k) + t(k + 1)'),
    have('n-is-a-count', '', 'n >= 0'),
], '6 * psum(n + 3) - (6 + 6 * w + 3 * w * w) + 6 * t(n + 3) <= 2 * w * w * w'
   ' && 2 * psum(n + 3) - (2 + 2 * w + w * w) >= 0', 'n')

open(_os.path.join(SEED, 'tmp/exp-bounds-probe.tree'), 'w').write(ratio + '\n\n' + bounds + '\n')
print('written')
