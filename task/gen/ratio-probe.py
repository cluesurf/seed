import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/ratio-probe.tree: each term of cosh's series is at most half the one before, on [0, 1]."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

text = rule('probe-each-cosh-term-is-at-most-half-the-last', '\n# probe', [('t', 1)], 'k w', [
    have('the-term-from-the-last', '', '(2 * k + 1) * (2 * k + 2) * t(k + 1) == w * w * t(k)'),
    have('the-last-term-is-not-negative', '', 't(k) >= 0'),
    have('k-is-a-count', '', 'k >= 0'),
    have('w-squared-is-at-most-one', '', 'w * w <= 1'),
], '2 * t(k + 1) <= t(k)')
open(_os.path.join(SEED, 'tmp/ratio-probe.tree'), 'w').write(text + '\n')
print('written')
