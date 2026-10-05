import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/cosh-probe.tree: cosh is uniformly differentiable with derivative sinh, from the addition formula and
the local bounds near 0."""
import sys

sys.path.insert(0, GEN)
from calculus import fn, have, rule  # noqa: E402

FUNCTIONS = [('cc', 1), ('ss', 1)]
HAVES = [
    have('the-addition-formula', 'a b', 'cc(a + b) == cc(a) * cc(b) + ss(a) * ss(b)'),
    have('cosh-near-zero', 'u', 'u < 0 || u > 1 || cc(u) - 1 >= 0 && cc(u) - 1 <= u * u'),
    have('sinh-near-zero', 'u', 'u < 0 || u > 1 || ss(u) - u >= 0 && ss(u) - u <= u * u * u'),
    have('the-step-is-small', '', 'w >= 0 && w <= 1'),
    have('cosh-is-bounded-here', '', 'cc(x) >= 0 && cc(x) <= big'),
    have('sinh-is-bounded-here', '', 'ss(x) >= 0 && ss(x) <= big'),
    have('the-bound-is-not-negative', '', 'big >= 0'),
]
GOAL = ('cc(x + w) - cc(x) - ss(x) * w <= big * w * w + big * w * w * w'
        ' && cc(x + w) - cc(x) - ss(x) * w >= 0')

text = rule('probe-cosh-has-derivative-sinh', '\n# probe', FUNCTIONS, 'x w big', HAVES, GOAL)
open(_os.path.join(SEED, 'tmp/cosh-probe.tree'), 'w').write(text + '\n')
print('written')
