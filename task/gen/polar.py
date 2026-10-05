import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/space/hyperbolic/polar.tree: a geodesic seen from a point, in polar coordinates. The rates of the polar
angle theta and the turning angle psi, and the identity d(psi) = -cosh r d(theta) that area-equals-defect assumes."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

ROOT = SEED

HYPERBOLA = [
    have('the-step-is-on-the-hyperbola', '', 'cc * cc - ss * ss == 1'),
    have('the-foot-is-on-the-hyperbola', '', 'cd * cd - sd * sd == 1'),
]

HEADER = '''# A GEODESIC SEEN FROM A POINT, in polar coordinates: the computation under area = defect (integral/fundamental).
#
# On the hyperboloid B(x, x) = 1, B(x, y) = x0 y0 - x1 y1 - x2 y2 (hyperboloid.tree), put the origin at O = (1, 0, 0)
# and the geodesic at distance d from it, its foot on the x1 axis. With cd, sd = cosh d, sinh d and cc, ss = cosh t,
# sinh t at arclength t from the foot, its point and unit velocity are
#   P = (cd cc, sd cc, ss),   T = (cd ss, sd ss, cc).
#
#   THE MODEL           P is a point, T a unit tangent at it, and cosh r = B(P, O) = cd cc;
#   THE RADIAL ANGLE    the unit radial tangent u = (cosh r P - O) / sinh r has -B(T, u) sinh r = cd ss, and the part of
#                       T across it is sd, with (cd ss)^2 + sd^2 = sinh^2 r: cos psi = cd ss / sinh r, sin psi =
#                       sd / sinh r, so the complement of psi has tangent z2 = cd ss / sd;
#   THE POLAR ANGLE     P's direction from O is (sd cc, ss), so theta has tangent z = ss / (sd cc);
#   THE RATES           with radian measure the integral of f = 1 / (1 + z^2) (integral/angle) and the derivatives of
#                       z and z2 from cosh' = sinh, sinh' = cosh (integral/hyperbolic-functions, integral/derivative),
#                       theta' sinh^2 r = sd and psi_c' sinh^2 r = cd cc sd;
#   THE TURNING         so psi_c' = cosh r theta', and d(psi) = -cosh r d(theta): the hypothesis area-equals-defect
#                       takes, now a theorem of the model.
#
# Every statement is an identity of the polynomial ring with its reciprocals named, proved by the product prover.
'''

RULES = [
    rule('the-geodesic-point-is-a-point', '''
# THE MODEL: B(P, P) = 1.''', [], 'cc ss cd sd', HYPERBOLA,
         '(cd * cc) * (cd * cc) - (sd * cc) * (sd * cc) - ss * ss == 1'),
    rule('the-geodesic-velocity-is-a-unit-tangent', '''
# B(T, T) = -1 and B(T, P) = 0.''', [], 'cc ss cd sd', HYPERBOLA,
         '(cd * ss) * (cd * ss) - (sd * ss) * (sd * ss) - cc * cc == 0 - 1'
         ' && (cd * ss) * (cd * cc) - (sd * ss) * (sd * cc) - cc * ss == 0'),
    rule('the-radius-from-the-foot', '''
# cosh r = B(P, O) = cd cc, and sinh^2 r = cosh^2 r - 1 = sd^2 cc^2 + ss^2 = cd^2 ss^2 + sd^2.''', [],
         'cc ss cd sd rr2', HYPERBOLA + [
             have('rr2-is-sinh-r-squared', '', 'rr2 == cd * cd * cc * cc - 1'),
         ], 'rr2 == sd * sd * cc * cc + ss * ss && rr2 == cd * cd * ss * ss + sd * sd'),
    rule('the-radial-cosine', '''
# THE RADIAL ANGLE: sinh r u = cosh r P - O, and -B(T, sinh r u) = B(T, O) - cosh r B(T, P) = cd ss.''', [],
         'cc ss cd sd', HYPERBOLA,
         '(cd * ss) * 1 - (cd * cc) * ((cd * ss) * (cd * cc) - (sd * ss) * (sd * cc) - cc * ss) == cd * ss'),
    rule('the-polar-tangent-squared', '''
# THE POLAR ANGLE: with k = sd cc and z k = ss, ss^2 = z^2 k^2.''', [], 'z k ss sd cc', [
        have('k-is-the-foot-part', '', 'k == sd * cc'),
        have('z-is-the-tangent', '', 'z * k == ss'),
    ], 'ss * ss == z * z * k * k'),
    rule('a-rate-times-the-radius', '''
# THE RATES. An angle's rate is f z' with f g = 1, g = 1 + z^2 for its tangent z; where sinh^2 r = qq g, the rate
# times sinh^2 r is z' qq.''', [], 'th f zd g qq rr2', [
        have('f-inverts', '', 'f * g == 1'),
        have('th-is-the-rate', '', 'th == f * zd'),
        have('the-radius', '', 'rr2 == qq * g'),
    ], 'th * rr2 == zd * qq'),
    rule('the-polar-rate', '''
# THE POLAR ANGLE has tangent z = tanh t / sd, so z' k cc = 1 with k = sd cc, and sinh^2 r = k^2 (1 + z^2): theta'
# sinh^2 r = z' k^2 = sd.''', [], 'th zd k cc sd rr2', [
        have('the-rate-times-the-radius', '', 'th * rr2 == zd * (k * k)'),
        have('zd-is-the-rate-of-z', '', 'zd * k * cc == 1'),
        have('k-is-the-foot-part', '', 'k == sd * cc'),
    ], 'th * rr2 == sd'),
    rule('the-radius-in-the-polar-tangent', '''
# The radius in the polar tangent: sinh^2 r = k^2 + ss^2 = k^2 (1 + z^2).''', [], 'z k ss rr2', [
        have('the-radius', '', 'rr2 == k * k + ss * ss'),
        have('the-tangent-squared', '', 'ss * ss == z * z * k * k'),
    ], 'rr2 == k * k * (1 + z * z)'),
    rule('the-radius-in-the-turning-tangent', '''
# The complement of psi has tangent z2 = cd ss / sd, so sd z2 = cd ss and sinh^2 r = cd^2 ss^2 + sd^2 =
# sd^2 (1 + z2^2).''', [], 'z2 ss cd sd rr2', [
        have('the-radius', '', 'rr2 == cd * cd * ss * ss + sd * sd'),
        have('z2-is-the-tangent', '', 'sd * z2 == cd * ss'),
    ], 'rr2 == sd * sd * (1 + z2 * z2)'),
    rule('the-turning-rate', '''
# THE TURNING ANGLE's complement has tangent z2 = cd sinh t / sd, so sd z2' = cd cc, and sinh^2 r = sd^2 (1 + z2^2):
# psi_c' sinh^2 r = z2' sd^2 = cd cc sd.''', [], 'pc zd2 cc cd sd rr2', [
        have('the-rate-times-the-radius', '', 'pc * rr2 == zd2 * (sd * sd)'),
        have('zd2-is-the-rate-of-z2', '', 'sd * zd2 == cd * cc'),
    ], 'pc * rr2 == cd * cc * sd'),
    rule('the-turning-is-cosh-r-times-the-polar-rate', '''
# THE TURNING: from theta' sinh^2 r = sd and psi_c' sinh^2 r = cosh r sd, with sinh^2 r > 0, psi_c' = cosh r theta'.''',
         [], 'th pc ch sd rr2', [
             have('the-polar-rate', '', 'th * rr2 == sd'),
             have('the-turning-rate', '', 'pc * rr2 == ch * sd'),
             have('the-radius-is-positive', '', 'rr2 > 0'),
         ], 'pc == ch * th'),
    rule('the-integrand-at-the-reciprocal', '''
# THE COMPLEMENT: psi = pi/2 - psi_c, as angle(z) + angle(1/z) has rate 0. First, with yy = y^2 and zz = z^2 for
# y = 1/z, y^2 f2 = f1 for f1 (1 + z^2) = 1 and f2 (1 + y^2) = 1.''', [],
         'yy zz f1 f2', [
             have('the-squares-invert', '', 'yy * zz == 1'),
             have('zz-is-not-negative', '', 'zz >= 0'),
             have('f1-inverts', '', 'f1 * (1 + zz) == 1'),
             have('f2-inverts', '', 'f2 * (1 + yy) == 1'),
         ], 'yy * f2 == f1'),
    rule('complementary-angles-have-opposite-rates', '''
# With y' = -z' y^2 (the reciprocal rule), f1 z' + f2 y' = 0, so by the fundamental theorem the sum is constant and
# d(psi) = -d(psi_c).''', [], 'zd yd yy f1 f2', [
        have('yd-is-the-rate-of-y', '', 'yd == 0 - zd * yy'),
        have('the-integrand-at-the-reciprocal', '', 'yy * f2 == f1'),
    ], 'f1 * zd + f2 * yd == 0'),
    rule('the-swept-area-is-squeezed', '''
# THE AREA ELEMENT: the region swept from O as theta moves by dth > 0 lies between the sectors of radii r and r + dr,
# whose areas are (cosh r - 1) dth and (cosh (r + dr) - 1) dth (the disk, integral/fundamental, by rotation), so with
# area monotone its increment da is (cosh r - 1) dth up to the change dch of cosh r times dth.''', [],
         'da dth ch dch', [
             have('the-area-is-between-the-sectors', '', 'da >= (ch - 1) * dth && da <= (ch + dch - 1) * dth'),
             have('the-angle-moves-forward', '', 'dth >= 0'),
             have('cosh-r-grows', '', 'dch >= 0'),
         ], 'da - (ch - 1) * dth <= dch * dth && (ch - 1) * dth - da <= dch * dth'),
]

CONTROLS = [
    rule('control-the-radius-without-the-foot', '\n# false: sinh^2 r carries sd^2 cc^2, not cc^2', [],
         'cc ss cd sd rr2', HYPERBOLA + [
             have('rr2-is-sinh-r-squared', '', 'rr2 == cd * cd * cc * cc - 1'),
         ], 'rr2 == cc * cc + ss * ss'),
    rule('control-the-turning-equals-the-polar-rate', '\n# false: the turning is cosh r times the polar rate', [],
         'th pc ch sd rr2', [
             have('the-polar-rate', '', 'th * rr2 == sd'),
             have('the-turning-rate', '', 'pc * rr2 == ch * sd'),
             have('the-radius-is-positive', '', 'rr2 > 0'),
         ], 'pc == th'),
    rule('control-the-polar-rate-without-the-foot', '\n# false: theta\' sinh^2 r is sd, not 1', [],
         'th zd k cc sd rr2', [
             have('the-rate-times-the-radius', '', 'th * rr2 == zd * (k * k)'),
             have('zd-is-the-rate-of-z', '', 'zd * k * cc == 1'),
             have('k-is-the-foot-part', '', 'k == sd * cc'),
         ], 'th * rr2 == 1'),
    rule('control-complementary-angles-have-equal-rates', '\n# false: the rates are opposite', [], 'zd yd yy f1 f2', [
        have('yd-is-the-rate-of-y', '', 'yd == 0 - zd * yy'),
        have('the-integrand-at-the-reciprocal', '', 'yy * f2 == f1'),
    ], 'f1 * zd - f2 * yd == 0'),
]


def main():
    open(f'{ROOT}/code/space/hyperbolic/polar.tree', 'w').write(HEADER + '\n' + '\n\n'.join(RULES) + '\n')
    head = '# NEGATIVE CONTROLS for space/hyperbolic/polar: each must be REFUSED. Expected: 4.\n'
    open(f'{ROOT}/test/case/hyperbolic/polar-control.tree', 'w').write(head + '\n\n'.join(CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls')


if __name__ == '__main__':
    main()
