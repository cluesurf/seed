import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/converge-probe.tree: the terms of cosh's series fall at least as fast as 1/N, and the partial sums' tails are
at most twice the last term, so the partial sums are a regular sequence (a real) with modulus 2/t."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

RATIO = have('each-term-is-at-most-half-the-last', 'k', 'k < 0 || 2 * t(k + 1) <= t(k)')
SIGN = have('each-term-is-not-negative', 'k', 'k < 0 || t(k) >= 0')

terms = rule('probe-the-terms-are-at-most-one-over-n', '\n# probe', [('t', 1)], 'n w', [
    have('the-second-term', '', '2 * t(1) == w * w'),
    have('w-squared-is-at-most-one', '', 'w * w <= 1'),
    RATIO, SIGN,
    have('n-is-a-count', '', 'n >= 0'),
], '(n + 1) * t(n + 1) <= 1', 'n')

tail = rule('probe-a-tail-is-at-most-twice-its-first-term', '\n# probe', [('t', 1), ('psum', 1)], 'big m', [
    RATIO, SIGN,
    have('each-partial-sum-adds-a-term', 'k', 'k < 0 || psum(k + 1) == psum(k) + t(k + 1)'),
    have('big-is-an-index', '', 'big >= 1'),
    have('m-is-a-count', '', 'm >= 0'),
], 'psum(big + m) - psum(big) + 2 * t(big + m) <= 2 * t(big)', 'm')

open(_os.path.join(SEED, 'tmp/converge-probe.tree'), 'w').write(terms + '\n\n' + tail + '\n')
print('written')
