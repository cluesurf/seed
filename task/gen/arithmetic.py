import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/number/arithmetic.tree: the arithmetic of the reals of number/completeness (regular sequences with
the modulus e(t) = 1 / t), and its negative controls."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

ROOT = SEED
X, Y, E = ('x', 1), ('y', 1), ('e', 1)


def regular(f):
    return have(f'{f}-is-a-real', 'p q', f'p < 1 || q < 1 || {f}(p) - {f}(q) <= e(p) + e(q) && {f}(q) - {f}(p) <= e(p) + e(q)')


HEADER = '''# THE ARITHMETIC OF THE REALS. number/completeness builds a real as a regular sequence of rationals,
# |x(p) - x(q)| <= e(p) + e(q), and proves the reals complete. A field needs operations: Bishop's are
#   the sum      (x + y)(n) = x(2n) + y(2n),
#   the product  (x y)(n) = x(2 K n) y(2 K n), with K bounding both sequences,
# and each must be shown to give a real. The modulus is e(t) = 1 / t, written t e(t) = 1, so it halves
# (2 e(2t) = e(t)) and scales (2 K e(2 K t) = e(t)).
'''

RULES = [
    rule('the-modulus-halves', '''
# The modulus halves: from t e(t) = 1 and 2t e(2t) = 1, 2 e(2t) = e(t).''', [E], 't', [
        have('at-t', '', 't * e(t) == 1'),
        have('at-2t', '', '2 * t * e(2 * t) == 1'),
        have('t-is-an-index', '', 't >= 1'),
    ], '2 * e(2 * t) == e(t)'),
    rule('the-sum-of-reals-is-a-real', '''
# THE SUM IS A REAL: x(2m) + y(2m) and x(2n) + y(2n) differ by at most 2 e(2m) + 2 e(2n) = e(m) + e(n).''',
         [X, Y, E], 'm n', [
             regular('x'), regular('y'),
             have('the-modulus-halves', 't', 't < 1 || 2 * e(2 * t) == e(t)'),
             have('m-is-an-index', '', 'm >= 1'), have('n-is-an-index', '', 'n >= 1'),
         ], 'x(2 * m) + y(2 * m) - (x(2 * n) + y(2 * n)) <= e(m) + e(n)'
            ' && x(2 * n) + y(2 * n) - (x(2 * m) + y(2 * m)) <= e(m) + e(n)'),
    rule('a-bounded-factor-times-a-small-one', '''
# THE PRODUCT, first its step: |x Dy| <= K E from |x| <= K and |Dy| <= E, with the certificate
# K E - x Dy = ((K - x)(E + Dy) + (K + x)(E - Dy)) / 2.''', [], 'x dy big eps', [
        have('x-is-bounded', '', 'x <= big && 0 - x <= big'),
        have('dy-is-small', '', 'dy <= eps && 0 - dy <= eps'),
    ], 'x * dy <= big * eps && 0 - x * dy <= big * eps'),
    rule('the-product-step', '''
# At two indices: x(p) y(p) - x(q) y(q) = x(p) (y(p) - y(q)) + y(q) (x(p) - x(q)) is at most 2 K (e(p) + e(q)).''',
         [X, Y, E], 'p q big', [
             have('x-at-p-is-bounded', '', 'x(p) <= big && 0 - x(p) <= big'),
             have('y-at-q-is-bounded', '', 'y(q) <= big && 0 - y(q) <= big'),
             have('x-is-regular-here', '', 'x(p) - x(q) <= e(p) + e(q) && x(q) - x(p) <= e(p) + e(q)'),
             have('y-is-regular-here', '', 'y(p) - y(q) <= e(p) + e(q) && y(q) - y(p) <= e(p) + e(q)'),
         ], 'x(p) * y(p) - x(q) * y(q) <= 2 * big * (e(p) + e(q))'),
    rule('the-product-of-reals-is-a-real', '''
# THE PRODUCT IS A REAL: at p = 2 K m and q = 2 K n the step gives 2 K (e(2 K m) + e(2 K n)) = e(m) + e(n).''',
         [X, Y, E], 'm n big', [
             have('the-product-step', 'p q', 'p < 1 || q < 1 || x(p) * y(p) - x(q) * y(q) <= 2 * big * (e(p) + e(q))'),
             have('the-modulus-scales', 't', 't < 1 || 2 * big * e(2 * big * t) == e(t)'),
             have('the-bound-is-an-index', '', 'big >= 1'),
             have('m-is-an-index', '', 'm >= 1'), have('n-is-an-index', '', 'n >= 1'),
         ], 'x(2 * big * m) * y(2 * big * m) - x(2 * big * n) * y(2 * big * n) <= e(m) + e(n)'),
]

CONTROLS = [
    rule('control-the-sum-without-reindexing', '\n# false: x(m) + y(m) is regular only with 2 e, not e',
         [X, Y, E], 'm n', [
             regular('x'), regular('y'),
             have('the-modulus-halves', 't', 't < 1 || 2 * e(2 * t) == e(t)'),
             have('m-is-an-index', '', 'm >= 1'), have('n-is-an-index', '', 'n >= 1'),
         ], 'x(m) + y(m) - (x(n) + y(n)) <= e(m) + e(n)'),
    rule('control-a-product-step-without-a-bound', '\n# false: without a bound on x the step is unbounded', [X, Y, E], 'p q big', [
        have('y-at-q-is-bounded', '', 'y(q) <= big && 0 - y(q) <= big'),
        have('x-is-regular-here', '', 'x(p) - x(q) <= e(p) + e(q) && x(q) - x(p) <= e(p) + e(q)'),
        have('y-is-regular-here', '', 'y(p) - y(q) <= e(p) + e(q) && y(q) - y(p) <= e(p) + e(q)'),
    ], 'x(p) * y(p) - x(q) * y(q) <= 2 * big * (e(p) + e(q))'),
]


def main():
    open(f'{ROOT}/code/number/arithmetic.tree', 'w').write(HEADER + '\n' + '\n\n'.join(RULES) + '\n')
    head = '# NEGATIVE CONTROLS for number/arithmetic: each must be REFUSED. Expected: 2.\n'
    open(f'{ROOT}/test/case/number/arithmetic-control.tree', 'w').write(head + '\n\n'.join(CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls')


if __name__ == '__main__':
    main()
