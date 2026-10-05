import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/integral/disk.tree: the composed statements. The disk's area within an explicit error that tends to 0,
and the swept area's squeeze as an instance of the Riemann-sum bound. Also its negative controls."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

ROOT = SEED


def within(x, e):
    return f'{x} <= {e} && 0 - ({x}) <= {e}'


HEADER = '''# THE COMPOSED STATEMENTS: the chain of integral/ and space/hyperbolic/ rules, closed into the theorems they serve.
#
#   THE DISK              integral/hyperbolic-functions puts the Riemann sum S of sinh_N over n strips of [0, r] within
#                         n tol of D = cosh_N(r) - 1, with tol = big (w^2 + w^3) + delta per step (cosh-has-derivative-
#                         sinh-up-to-an-error, the-riemann-sums-with-a-tolerance). integral/limits makes delta <= eps w
#                         for N large (each error term is a term of an exponential series past twice its argument). So
#                         with n w = r and w <= 1, |S - D| <= r (2 big w + eps): the Riemann sums of sinh tend to
#                         cosh r - 1 as the mesh w and eps shrink, and the disk's area (2 pi times them, the circumference
#                         being 2 pi sinh r) is 2 pi (cosh r - 1);
#   THE SWEPT AREA        the area swept from O along a geodesic is DEFINED as the integral over theta of cosh r - 1, the
#                         polar form of area (the disk theorem per unit of angle). Its increment over [theta, theta +
#                         dth], on a stretch where cosh r runs from ch to ch + dch, is a limit of Riemann sums each within
#                         [(ch - 1) dth, (ch + dch - 1) dth] (integral/angle, a-riemann-sum-lies-between-its-ends, with the
#                         integrand cosh r - 1 increasing along the stretch), which is space/hyperbolic/polar's squeeze.
#
# Every certificate is the product prover's, replayed (check/product.ts), over an ordered field.
'''

RULES = [
    rule('the-step-errors-sum', '''
# THE DISK. With q = big w, the step error is tol = q w + q w^2 + delta (big w^2 + big w^3 + delta), and over n strips
# with n w = r it sums to n tol = q r + q r w + n delta.''', [], 'n w r q delta tol', [
        have('tol-is-the-step-error', '', 'tol == q * w + q * w * w + delta'),
        have('the-strips-cover-the-radius', '', 'n * w == r'),
    ], 'n * tol == q * r + q * r * w + n * delta'),
    rule('the-exponential-errors-sum-to-eps-r', '''
# The exponential's errors, each delta <= eps w (integral/limits), sum to n delta <= eps r.''', [], 'n w r delta eps', [
        have('delta-is-small', '', 'delta <= eps * w'),
        have('n-is-a-count', '', 'n >= 0'),
        have('the-strips-cover-the-radius', '', 'n * w == r'),
    ], 'n * delta <= eps * r'),
    rule('the-mesh-errors-sum-to-twice-big-w-r', '''
# The mesh errors q r + q r w are at most 2 p, p = q r = big w r, as w <= 1.''', [], 'q r w p', [
        have('p-is-q-times-the-radius', '', 'p == q * r && p >= 0'),
        have('the-mesh-is-at-most-one', '', 'w >= 0 && w <= 1'),
    ], 'q * r + q * r * w <= 2 * p'),
    rule('the-disk-area-within-an-error', '''
# So the Riemann sum S of sinh_N, within n tol of D = cosh_N(r) - 1, is within 2 big w r + eps r of it: the error tends
# to 0 with the mesh w and the tolerance eps.''', [], 'ss dd nt q r w nd eps p', [
        have('the-sums-are-within-n-tol', '', within('ss - dd', 'nt')),
        have('the-step-errors-sum', '', 'nt == q * r + q * r * w + nd'),
        have('the-exponential-errors-sum', '', 'nd <= eps * r'),
        have('the-mesh-errors-sum', '', 'q * r + q * r * w <= 2 * p'),
    ], within('ss - dd', '2 * p + eps * r')),
    rule('the-disk-area-from-the-steps', '''
# THE SAME, COMPOSED: from the per-step facts alone, citing the three rules above rather than assuming what they prove.
# Each citation proves the cited rule's hypotheses here and uses its conclusion, at this rule's n, w, r, q, delta, tol,
# eps and p (a cited rule's marks are read by name).''', [], 'ss dd n w r q delta tol eps p', [
        have('the-sums-are-within-n-tol', '', within('ss - dd', 'n * tol')),
        have('tol-is-the-step-error', '', 'tol == q * w + q * w * w + delta'),
        have('the-strips-cover-the-radius', '', 'n * w == r'),
        have('delta-is-small', '', 'delta <= eps * w'),
        have('n-is-a-count', '', 'n >= 0'),
        have('p-is-q-times-the-radius', '', 'p == q * r && p >= 0'),
        have('the-mesh-is-at-most-one', '', 'w >= 0 && w <= 1'),
    ], within('ss - dd', '2 * p + eps * r'), cites=(
        'the-step-errors-sum',
        'the-exponential-errors-sum-to-eps-r',
        'the-mesh-errors-sum-to-twice-big-w-r',
    )),
    rule('the-swept-area-sum-is-squeezed', '''
# THE SWEPT AREA: a Riemann sum of g = cosh r - 1 over m strips of width w covering dth = m w, with every value of g in
# [ch - 1, ch + dch - 1], lies in [(ch - 1) dth, (ch + dch - 1) dth]: a-riemann-sum-lies-between-its-ends at
# fa = ch + dch - 1 and fb = ch - 1, for an increasing integrand.''', [], 'sm m w dth ch dch', [
        have('the-riemann-sum-bound', '', 'sm <= m * w * (ch + dch - 1) && sm >= m * w * (ch - 1)'),
        have('the-strips-cover-the-angle', '', 'm * w == dth'),
    ], 'sm <= (ch + dch - 1) * dth && sm >= (ch - 1) * dth'),
]

CONTROLS = [
    rule('control-the-disk-area-without-the-mesh-error', '\n# false: the error carries the mesh term 2 p', [],
         'ss dd nt q r w nd eps p', [
             have('the-sums-are-within-n-tol', '', within('ss - dd', 'nt')),
             have('the-step-errors-sum', '', 'nt == q * r + q * r * w + nd'),
             have('the-exponential-errors-sum', '', 'nd <= eps * r'),
             have('the-mesh-errors-sum', '', 'q * r + q * r * w <= 2 * p'),
         ], 'ss - dd <= eps * r'),
]


def main():
    open(f'{ROOT}/code/integral/disk.tree', 'w').write(HEADER + '\n' + '\n\n'.join(RULES) + '\n')
    head = '# NEGATIVE CONTROLS for integral/disk: each must be REFUSED. Expected: 1.\n'
    open(f'{ROOT}/test/case/number/disk-control.tree', 'w').write(head + '\n\n'.join(CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls')


if __name__ == '__main__':
    main()
