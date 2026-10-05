import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/coshsinh-probe.tree: cosh = (E + 1/E)/2 and sinh = (E - 1/E)/2 obey the local bounds near 0, from the
second-order bounds on E (E a partial sum of the exponential, or any value in those bounds)."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

HAVES = [
    have('w-is-in-the-unit-interval', '', 'w >= 0 && w <= 1'),
    have('e-is-above-its-second-order-part', '', '2 * ee - (2 + 2 * w + w * w) >= 0'),
    have('e-is-below-its-third-order-bound', '', '6 * ee - (6 + 6 * w + 3 * w * w) <= 2 * w * w * w'),
    have('rr-is-its-reciprocal', '', 'ee * rr == 1'),
    have('rr-is-positive', '', 'rr > 0'),
]

cosh = rule('probe-cosh-near-zero', '\n# probe', [], 'w ee rr', HAVES,
            'ee + rr - 2 >= 0 && ee + rr - 2 <= 2 * w * w')
sinh = rule('probe-sinh-near-zero', '\n# probe', [], 'w ee rr', HAVES,
            'ee - rr - 2 * w >= 0 && ee - rr - 2 * w <= 2 * w * w * w')

open(_os.path.join(SEED, 'tmp/coshsinh-probe.tree'), 'w').write(cosh + '\n\n' + sinh + '\n')
print('written')
