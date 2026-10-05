import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/series-probe.tree: every partial sum of cosh's series obeys 1 <= P(N) <= 1 + w^2 on [0, 1], given the
ratio lemma (each term at most half the last) and the terms' signs."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

FUNCTIONS = [('t', 1), ('psum', 1)]
HAVES = [
    have('the-first-term', '', 't(0) == 1'),
    have('the-second-term', '', '2 * t(1) == w * w'),
    have('each-term-is-at-most-half-the-last', 'k', 'k < 0 || 2 * t(k + 1) <= t(k)'),
    have('each-term-is-not-negative', 'k', 'k < 0 || t(k) >= 0'),
    have('the-first-partial-sum', '', 'psum(0) == 1'),
    have('each-partial-sum-adds-a-term', 'k', 'k < 0 || psum(k + 1) == psum(k) + t(k + 1)'),
    have('n-is-a-count', '', 'n >= 0'),
]
GOAL = 'psum(n + 1) - 1 + t(n + 1) <= w * w && psum(n + 1) - 1 >= 0'

text = rule('probe-cosh-partial-sums-are-bounded', '\n# probe', FUNCTIONS, 'n w', HAVES, GOAL, 'n')
open(_os.path.join(SEED, 'tmp/series-probe.tree'), 'w').write(text + '\n')
print('written')
