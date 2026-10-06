import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/space/hyperbolic/area.tree: the differential form of the area theorems, each a polynomial identity or
certificate checked by the oracle tmp/gen/area-check.py first."""

import sys

sys.path.insert(0, GEN)
from order import parse  # noqa: E402
from tree import call, ind  # noqa: E402

ROOT = SEED


def B(a, b):
    return f'({a[0]}) * ({b[0]}) - ({a[1]}) * ({b[1]}) - ({a[2]}) * ({b[2]})'


u = ['u0', 'u1', 'u2']
v = ['v0', 'v1', 'v2']
x = [f'c * {u[i]} + s * {v[i]}' for i in range(3)]
d = [f's * {u[i]} + c * {v[i]}' for i in range(3)]
Buu, Bvv, Buv = B(u, u), B(v, v), B(u, v)
pair = 'c * c - s * s - 1'


def identity(name, comment, marks, left, right):
    out = [comment.rstrip(), f'rule {name}']
    for m in marks.split():
        out.append(f'  seat {m}, like integer')
    out.append('  show hold')
    out.append(ind(call('is-equal', parse(left), parse(right)), 4))
    return '\n'.join(out)


GEO = 'u0 u1 u2 v0 v1 v2 c s'

HEADER = '''# AREA in the hyperbolic plane, in differential form: the identities whose integrals are the area theorems. On the
# hyperboloid (space/hyperbolic/hyperboloid) the geodesic through a point u with unit tangent v is
#
#   x(s) = cosh(s) u + sinh(s) v,   written with c = cosh s, s = sinh s, c^2 - s^2 = 1,
#
# and d/ds is the DERIVATION D with D c = s and D s = c (u and v are constant), so D x = d := s u + c v and D d = x.
# Every statement below is an identity in the polynomial ring, proved for all values. Where it has hypotheses (u a
# point, v a unit tangent at u, c and s a cosh and sinh) it is written as a CERTIFICATE, as in space/hyperbolic/metric:
# the difference of its two sides as a sum of multiples of the hypotheses' differences, so it holds whenever they do.
#
#   THE GEODESIC        x stays on the hyperboloid and d is a unit tangent to it (the flow D keeps c^2 - s^2, since
#                       D (c^2 - s^2) = 2 c s - 2 s c);
#   ANGULAR MOMENTUM    N = x1 d2 - x2 d1 is constant along the geodesic: D N = 0, by the product rule and D d = x;
#   THE TURNING         with r the distance from the origin (cosh r = x0, sinh^2 r = x1^2 + x2^2), theta the polar
#                       angle and psi the angle between the geodesic and the radial direction:
#                         (sinh^2 r) D theta = N,   tan psi = N / M with M = D x0 = d0,
#                       so D psi = (M D N - N D M) / (M^2 + N^2) = -N x0 / (M^2 + N^2). The identity proved here is
#                         M^2 + N^2 = x1^2 + x2^2 = sinh^2 r,
#                       which makes D psi = -cosh r D theta: the geodesic turns away from the radial direction at
#                       cosh r times the rate the polar angle turns. This is the GAUSS-BONNET INTEGRAND;
#   THE DISK            the circle of radius r is traced at speed sinh r (space/hyperbolic/metric), so the area
#                       element in polar coordinates is sinh r dr dtheta, and cosh r - 1 is the antiderivative of
#                       sinh r that vanishes at r = 0 (D cosh = sinh, cosh 0 = 1): the disk area's integrand.
#
# What integration then gives, with the fundamental theorem of calculus as the one step not proved here:
#
#   the disk of radius r has area  integral over theta of integral_0^r sinh = 2 pi (cosh r - 1);
#   a triangle with a vertex at the origin, angle alpha there, and far side the geodesic, has area
#     integral_0^alpha (cosh r - 1) d theta = integral (-D psi - D theta) = psi(start) - psi(end) - alpha,
#   which is pi minus its three angles: AREA EQUALS DEFECT (Gauss-Bonnet), and every triangle is a sum of two of these.
#
# The fundamental theorem of calculus itself needs the real numbers (K4 in note/term/port/kernel-prerequisites.md):
# every algebraic step above is proved, and that one analytic step is what remains.
'''

RULES = [
    identity('the-geodesic-stays-on-the-hyperboloid', '''
# THE GEODESIC. B(x, x) - 1, for x = c u + s v, is a combination of the hypotheses' differences: it is 0 whenever u is
# a point (B(u, u) = 1), v a unit tangent (B(v, v) = -1, B(u, v) = 0) and c^2 - s^2 = 1.''', GEO,
             f'{B(x, x)} - 1', f'c * c * ({Buu} - 1) + 2 * c * s * ({Buv}) + s * s * ({Bvv} + 1) + ({pair})'),
    identity('the-geodesic-velocity-is-a-unit-vector', '''
# Its velocity d = D x = s u + c v has B(d, d) = -1: the geodesic is traced at unit speed.''', GEO,
             f'{B(d, d)} + 1', f's * s * ({Buu} - 1) + 2 * c * s * ({Buv}) + c * c * ({Bvv} + 1) - ({pair})'),
    identity('the-geodesic-velocity-is-tangent', '''
# And B(x, d) = 0: the velocity is tangent to the hyperboloid at x.''', GEO,
             f'{B(x, d)}', f'c * s * ({Buu} - 1) + (c * c + s * s) * ({Buv}) + c * s * ({Bvv} + 1)'),
    identity('angular-momentum-is-conserved', '''
# ANGULAR MOMENTUM. D N for N = x1 d2 - x2 d1, by the product rule with D x = d and D d = x, is
# (d1 d2 + x1 x2) - (d2 d1 + x2 x1) = 0.''', GEO,
             f'(({d[1]}) * ({d[2]}) + ({x[1]}) * ({x[2]})) - (({d[2]}) * ({d[1]}) + ({x[2]}) * ({x[1]}))', '0'),
    identity('the-gauss-bonnet-turning-identity', '''
# THE TURNING, for any point x and tangent d (not only on one geodesic): M^2 + N^2 - sinh^2 r, with M = d0 and
# N = x1 d2 - x2 d1, is the certificate below in h1 = B(x, x) - 1, h2 = B(d, d) + 1 and h3 = B(x, d). So where x is a
# point and d a unit tangent at it, M^2 + N^2 = x1^2 + x2^2 = sinh^2 r and D psi = -cosh r D theta.''',
             'x0 x1 x2 d0 d1 d2',
             'd0 * d0 + (x1 * d2 - x2 * d1) * (x1 * d2 - x2 * d1) - (x1 * x1 + x2 * x2)',
             '(d0 * d0 - d1 * d1 - d2 * d2 + 1) * (1 - x0 * x0 + (x0 * x0 - x1 * x1 - x2 * x2 - 1))'
             ' - (x0 * x0 - x1 * x1 - x2 * x2 - 1) * d0 * d0'
             ' + (x0 * d0 - x1 * d1 - x2 * d2) * (2 * x0 * d0 - (x0 * d0 - x1 * d1 - x2 * d2))'),
]

CONTROLS = [
    identity('control-the-geodesic-off-by-a-sign', '\n# false: the s^2 term with the wrong sign', GEO,
             f'{B(x, x)} - 1', f'c * c * ({Buu} - 1) + 2 * c * s * ({Buv}) - s * s * ({Bvv} + 1) + ({pair})'),
    identity('control-the-turning-without-h3', '\n# false: the B(x, d) part of the certificate dropped', 'x0 x1 x2 d0 d1 d2',
             'd0 * d0 + (x1 * d2 - x2 * d1) * (x1 * d2 - x2 * d1) - (x1 * x1 + x2 * x2)',
             '(d0 * d0 - d1 * d1 - d2 * d2 + 1) * (1 - x0 * x0 + (x0 * x0 - x1 * x1 - x2 * x2 - 1))'
             ' - (x0 * x0 - x1 * x1 - x2 * x2 - 1) * d0 * d0'),
    identity('control-the-tangent-with-c-squared-minus-s-squared', '\n# false: (c^2 - s^2) where (c^2 + s^2) belongs', GEO,
             f'{B(x, d)}', f'c * s * ({Buu} - 1) + (c * c - s * s) * ({Buv}) + c * s * ({Bvv} + 1)'),
]


def main():
    body = '\n'.join(HEADER.rstrip().split('\n')) + '\n' + '\n'.join(RULES) + '\n'
    open(f'{ROOT}/code/space/hyperbolic/area.tree', 'w').write(body)
    head = ('# NEGATIVE CONTROLS for space/hyperbolic/area: each perturbs one certificate and must be REFUSED. Expected: 3.\n')
    open(f'{ROOT}/test/case/hyperbolic/area-control.tree', 'w').write(head + '\n'.join(CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls')


main()
