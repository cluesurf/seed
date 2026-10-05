import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/addition-probe.tree: cosh = (E + 1/E)/2 obeys the addition formula up to the error of E's, in steps."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

inverse_product = rule('probe-the-product-of-inverses-inverts-the-product', '\n# probe', [], 'ex ew rx rw', [
    have('rx-inverts', '', 'ex * rx == 1'), have('rw-inverts', '', 'ew * rw == 1'),
], 'rx * rw * (ex * ew) == 1')

difference = rule('probe-the-reciprocal-difference', '\n# probe', [], 'ex ew es rs pp', [
    have('rs-inverts', '', 'es * rs == 1'),
    have('pp-inverts-the-product', '', 'pp * (ex * ew) == 1'),
], 'rs - pp == rs * pp * (ex * ew - es)')

at_most_one = rule('probe-an-inverse-of-at-least-one-is-at-most-one', '\n# probe', [], 'ee rr', [
    have('ee-is-at-least-one', '', 'ee >= 1'),
    have('rr-inverts', '', 'ee * rr == 1'),
    have('rr-is-positive', '', 'rr > 0'),
], 'rr <= 1')

scaled = rule('probe-a-small-difference-scaled-by-at-most-one', '\n# probe', [], 'dd q delta', [
    have('dd-is-small', '', 'dd <= delta && 0 - dd <= delta'),
    have('q-is-in-the-unit-interval', '', 'q >= 0 && q <= 1'),
], 'dd * q <= delta && 0 - dd * q <= delta')

open(_os.path.join(SEED, 'tmp/addition-probe.tree'), 'w').write(
    '\n\n'.join([inverse_product, difference, at_most_one, scaled]) + '\n')
print('written')
