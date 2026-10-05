import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/space/hyperbolic/distance.tree: cosh is strictly increasing on [0, oo), so the cosh form of the
triangle inequality (order.tree) is the distance form. Also its negative controls."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

ROOT = SEED

HEADER = '''# DISTANCES: the triangle inequality for lengths, from the one for their cosh's.
#
# order.tree proves cosh d(a, c) <= cosh d(a, b) cosh d(b, c) + sinh d(a, b) sinh d(b, c), the right side being
# cosh (d(a, b) + d(b, c)) by the addition formula (integral/exponential, integral/hyperbolic-functions). What turns
# that into d(a, c) <= d(a, b) + d(b, c) is that cosh is STRICTLY INCREASING on [0, oo):
#
#   THE STEP             cosh(x + w) - cosh x = cosh x (cosh w - 1) + sinh x sinh w, which is positive for x >= 0 and
#                        w > 0, as cosh w - 1 >= w^2 / 4 > 0 on (0, 1] (from the exponential's bounds) and cosh x >= 1,
#                        sinh x, sinh w >= 0;
#   THE INEQUALITY       so a distance past the sum would have a cosh past the sum's cosh, which order.tree refuses.
#
# Every certificate is the product prover's, replayed (check/product.ts), over an ordered field.
'''

RULES = [
    rule('cosh-steps-up', '''
# THE STEP: with the addition formula cs = cx cw + sx sw, cw > 1, cx >= 1 and sx, sw >= 0, cs > cx.''', [],
         'cx sx cw sw cs', [
             have('the-addition-formula', '', 'cs == cx * cw + sx * sw'),
             have('cw-is-past-one', '', 'cw > 1'),
             have('cx-is-at-least-one', '', 'cx >= 1'),
             have('the-sinhs-are-not-negative', '', 'sx >= 0 && sw >= 0'),
         ], 'cs > cx'),
    rule('cosh-is-a-quarter-square-past-one', '''
# cosh = (E + 1/E) / 2 with E between its second- and third-order parts on [0, 1] (integral/hyperbolic-functions):
# 2 cosh w - 2 >= w^2 / 2, as (E - 1)^2 >= (w + w^2 / 2)^2 exceeds E w^2 / 2.''', [], 'w ee rr', [
        have('w-is-in-the-unit-interval', '', 'w >= 0 && w <= 1'),
        have('e-is-above-its-second-order-part', '', '2 * ee - (2 + 2 * w + w * w) >= 0'),
        have('e-is-below-its-third-order-bound', '', '6 * ee - (6 + 6 * w + 3 * w * w) <= 2 * w * w * w'),
        have('rr-is-its-reciprocal', '', 'ee * rr == 1'),
        have('rr-is-positive', '', 'rr > 0'),
    ], '2 * (ee + rr - 2) >= w * w'),
    rule('cosh-is-past-one-off-zero', '''
# so cosh w > 1 for w > 0.''', [], 'w cw', [
        have('cosh-near-zero', '', '4 * (cw - 1) >= w * w'),
        have('w-is-positive', '', 'w > 0'),
    ], 'cw > 1'),
    rule('the-triangle-inequality-for-distances', '''
# THE INEQUALITY: d(a, c) = dac and s = d(a, b) + d(b, c). cosh (ch) is strictly increasing, so x <= y or
# ch(x) > ch(y), and order.tree gives ch(dac) <= ch(s), so dac <= s.''', [('ch', 1)], 'dac s', [
        have('cosh-is-increasing', 'x y', 'x <= y || ch(x) > ch(y)'),
        have('the-cosh-form', '', 'ch(dac) <= ch(s)'),
    ], 'dac <= s'),
]

CONTROLS = [
    rule('control-cosh-steps-up-from-a-flat-step', '\n# false: with cw = 1 and sx = 0 cosh does not move', [],
         'cx sx cw sw cs', [
             have('the-addition-formula', '', 'cs == cx * cw + sx * sw'),
             have('cw-is-at-least-one', '', 'cw >= 1'),
             have('cx-is-at-least-one', '', 'cx >= 1'),
             have('the-sinhs-are-not-negative', '', 'sx >= 0 && sw >= 0'),
         ], 'cs > cx'),
    rule('control-the-triangle-inequality-without-the-cosh-form', '\n# false: monotonicity alone bounds nothing',
         [('ch', 1)], 'dac s', [
             have('cosh-is-increasing', 'x y', 'x <= y || ch(x) > ch(y)'),
         ], 'dac <= s'),
]


def main():
    open(f'{ROOT}/code/space/hyperbolic/distance.tree', 'w').write(HEADER + '\n' + '\n\n'.join(RULES) + '\n')
    head = '# NEGATIVE CONTROLS for space/hyperbolic/distance: each must be REFUSED. Expected: 2.\n'
    open(f'{ROOT}/test/case/hyperbolic/distance-control.tree', 'w').write(head + '\n\n'.join(CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls')


if __name__ == '__main__':
    main()
