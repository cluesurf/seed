import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/arith-probe.tree: the sum and the product of two reals (regular sequences) are reals."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

X, Y, E = ('x', 1), ('y', 1), ('e', 1)
MODULUS = [
    have('the-modulus', 't', 't < 1 || t * e(t) == 1'),
    have('the-modulus-is-positive', 't', 't < 1 || e(t) > 0'),
]


def regular(f):
    return have(f'{f}-is-a-real', 'p q', f'p < 1 || q < 1 || {f}(p) - {f}(q) <= e(p) + e(q) && {f}(q) - {f}(p) <= e(p) + e(q)')


# the modulus halves: 2 e(2 t) = e(t)
halves = rule('probe-the-modulus-halves', '\n# probe', [E], 't', [
    have('at-t', '', 't * e(t) == 1'),
    have('at-2t', '', '2 * t * e(2 * t) == 1'),
    have('t-is-an-index', '', 't >= 1'),
], '2 * e(2 * t) == e(t)')

# the sum: (x + y)(n) = x(2n) + y(2n) is regular
total = rule('probe-the-sum-of-reals-is-a-real', '\n# probe', [X, Y, E], 'm n', [
    regular('x'), regular('y'),
    have('the-modulus-halves', 't', 't < 1 || 2 * e(2 * t) == e(t)'),
    have('m-is-an-index', '', 'm >= 1'),
    have('n-is-an-index', '', 'n >= 1'),
], 'x(2 * m) + y(2 * m) - (x(2 * n) + y(2 * n)) <= e(m) + e(n)'
   ' && x(2 * n) + y(2 * n) - (x(2 * m) + y(2 * m)) <= e(m) + e(n)')

# one product step: |x Dy| <= K E from |x| <= K and |Dy| <= E
step = rule('probe-a-bounded-factor-times-a-small-one', '\n# probe', [], 'x dy big eps', [
    have('x-is-bounded', '', 'x <= big && 0 - x <= big'),
    have('dy-is-small', '', 'dy <= eps && 0 - dy <= eps'),
], 'x * dy <= big * eps && 0 - x * dy <= big * eps')

# the product step, at two indices, from bounds and regularity there
pstep = rule('probe-the-product-step', '\n# probe', [X, Y, E], 'p q big', [
    have('x-at-p-is-bounded', '', 'x(p) <= big && 0 - x(p) <= big'),
    have('y-at-q-is-bounded', '', 'y(q) <= big && 0 - y(q) <= big'),
    have('x-is-regular-here', '', 'x(p) - x(q) <= e(p) + e(q) && x(q) - x(p) <= e(p) + e(q)'),
    have('y-is-regular-here', '', 'y(p) - y(q) <= e(p) + e(q) && y(q) - y(p) <= e(p) + e(q)'),
], 'x(p) * y(p) - x(q) * y(q) <= 2 * big * (e(p) + e(q))')

# the product of reals is a real, from the step and the modulus's scaling
product = rule('probe-the-product-of-reals-is-a-real', '\n# probe', [X, Y, E], 'm n big', [
    have('the-product-step', 'p q', 'p < 1 || q < 1 || x(p) * y(p) - x(q) * y(q) <= 2 * big * (e(p) + e(q))'),
    have('the-modulus-scales', 't', 't < 1 || 2 * big * e(2 * big * t) == e(t)'),
    have('the-bound-is-an-index', '', 'big >= 1'),
    have('m-is-an-index', '', 'm >= 1'),
    have('n-is-an-index', '', 'n >= 1'),
], 'x(2 * big * m) * y(2 * big * m) - x(2 * big * n) * y(2 * big * n) <= e(m) + e(n)')

open(_os.path.join(SEED, 'tmp/arith-probe.tree'), 'w').write(pstep + '\n\n' + product + '\n')
print('written')
