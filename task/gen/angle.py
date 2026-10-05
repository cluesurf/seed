import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/integral/angle.tree: radian measure as the integral of 1 / (1 + s^2), its Riemann sums squeezed
between lower and upper sums, and its uniform derivative. Also its negative controls."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

ROOT = SEED
F, PT = ('f', 1), ('pt', 1)

HEADER = '''# RADIAN MEASURE, as the integral of 1 / (1 + s^2): the angle whose tangent is t is
#   theta(t) = integral from 0 to t of f,   f(s) = 1 / (1 + s^2),
# the arctangent, built from Riemann sums with no series and no trigonometric function assumed. Every bound is a
# polynomial inequality once the reciprocal is named (f (1 + s^2) = 1), so the product prover decides each step.
#
#   THE INTEGRAND FALLS   on s >= 0, f(s + h) <= f(s), and slowly: f(s) - f(s + h) <= (2 s + h) h;
#   THE SUMS SQUEEZE      for a falling f on the grid pt(i + 1) = pt(i) + w, the upper sum (left points) minus the
#                         lower sum (right points) telescopes to (f(pt(0)) - f(pt(n))) w, which tends to 0 with w;
#   REFINEMENT            halving the mesh raises the lower sum and lowers the upper one, so the sums at meshes
#                         w / 2^k are nested intervals, and number/completeness makes their limit a real: theta;
#   THE INCREMENT         every Riemann sum over [t, t + h] lies in [h f(t + h), h f(t)], so the limit does;
#   THE DERIVATIVE        so |theta(t + h) - theta(t) - f(t) h| <= (2 t + h) h^2: theta is uniformly differentiable
#                         with derivative f on every [0, R], the hypothesis integral/fundamental's area-equals-defect
#                         takes of the polar angle.
#
# Every certificate is the product prover's, replayed (check/product.ts), over an ordered field.
'''

RULES = [
    rule('the-integrand-difference', '''
# THE INTEGRAND FALLS: with f1 (1 + s^2) = 1 and f2 (1 + (s + h)^2) = 1, f1 - f2 = f1 f2 (2 s h + h^2).''', [],
         's h f1 f2', [
             have('f1-inverts', '', 'f1 * (1 + s * s) == 1'),
             have('f2-inverts', '', 'f2 * (1 + (s + h) * (s + h)) == 1'),
         ], 'f1 - f2 == f1 * f2 * (2 * s * h + h * h)'),
    rule('the-growth-is-not-negative', '''
# The factor 2 s h + h^2 is not negative on s, h >= 0.''', [], 's h g', [
        have('g-is-the-growth', '', 'g == 2 * s * h + h * h'),
        have('s-and-h-are-not-negative', '', 's >= 0 && h >= 0'),
    ], 'g >= 0'),
    rule('the-integrand-falls', '''
# So, with pp = f1 f2 > 0 and g = 2 s h + h^2 >= 0, f2 <= f1.''', [], 'f1 f2 pp g', [
        have('the-integrand-difference', '', 'f1 - f2 == pp * g'),
        have('pp-is-positive', '', 'pp > 0'),
        have('g-is-not-negative', '', 'g >= 0'),
    ], 'f2 <= f1'),
    rule('the-integrand-is-at-most-one', '''
# and 0 < f <= 1.''', [], 's f1', [
        have('f1-inverts', '', 'f1 * (1 + s * s) == 1'),
        have('f1-is-positive', '', 'f1 > 0'),
    ], 'f1 <= 1'),
    rule('the-product-of-two-integrands-is-at-most-one', '''
# and their product pp = f1 f2 is in (0, 1].''', [], 'f1 f2 pp', [
        have('pp-is-the-product', '', 'pp == f1 * f2'),
        have('f1-is-in-the-unit-interval', '', 'f1 > 0 && f1 <= 1'),
        have('f2-is-in-the-unit-interval', '', 'f2 > 0 && f2 <= 1'),
    ], 'pp > 0 && pp <= 1'),
    rule('the-integrand-falls-slowly', '''
# so it falls slowly: f1 - f2 = pp g <= g = (2 s + h) h.''', [], 'f1 f2 pp g', [
        have('the-integrand-difference', '', 'f1 - f2 == pp * g'),
        have('pp-is-at-most-one', '', 'pp > 0 && pp <= 1'),
        have('g-is-not-negative', '', 'g >= 0'),
    ], 'f1 - f2 <= g'),
    rule('the-upper-sum-minus-the-lower-sum-telescopes', '''
# THE SUMS SQUEEZE: with fl(i) = f(pt(i)), up(i + 1) = up(i) + fl(i) w and lo(i + 1) = lo(i) + fl(i + 1) w, from 0,
# differ by (fl(0) - fl(n)) w, by induction on n.''', [('fl', 1), ('up', 1), ('lo', 1)], 'n w', [
        have('up-starts-at-zero', '', 'up(0) == 0'),
        have('lo-starts-at-zero', '', 'lo(0) == 0'),
        have('up-adds-a-left-strip', 'i', 'i < 0 || up(i + 1) == up(i) + fl(i) * w'),
        have('lo-adds-a-right-strip', 'i', 'i < 0 || lo(i + 1) == lo(i) + fl(i + 1) * w'),
        have('n-is-a-count', '', 'n >= 0'),
    ], 'up(n) - lo(n) == (fl(0) - fl(n)) * w', 'n'),
    rule('two-half-strips-make-a-strip', '''
# REFINEMENT. At mesh w / 2 a sum adds f(q(j + 1)) w / 2 per strip (written doubled), so two half strips add
# (f(q(2 i + 1)) + f(q(2 i + 2))) w / 2.''', [F, ('q', 1), ('mm', 1)], 'i w', [
        have('mm-adds-a-half-strip', 'j', 'j < 0 || 2 * mm(j + 1) == 2 * mm(j) + f(q(j + 1)) * w'),
        have('i-is-a-count', '', 'i >= 0'),
    ], '2 * mm(2 * i + 2) == 2 * mm(2 * i) + (f(q(2 * i + 1)) + f(q(2 * i + 2))) * w'),
    rule('a-falling-strip-scales', '''
# A value of f at least another stays so times the width w >= 0.''', [], 'fo fp w', [
        have('fo-is-at-least-fp', '', 'fo >= fp'),
        have('the-width-is-not-negative', '', 'w >= 0'),
    ], 'fo * w >= fp * w'),
    rule('halving-the-mesh-raises-the-lower-sum', '''
# Indexed by the coarse strip i: the lower sum ll at mesh w adds fp(i + 1) = f(p(i + 1)) w, and the refined sum
# mm(i) = the sum at mesh w / 2 up to q(2 i) adds (fo(i) + fe(i)) w / 2, with fo(i) = f(q(2 i + 1)) and
# fe(i) = f(q(2 i + 2)) = fp(i + 1), as q(2 i + 2) = p(i + 1), written in. As f falls, fp(i + 1) <= fo(i). So
# ll(n) <= mm(n), by induction on n. The fall enters as fo(i) w >= fp(i + 1) w (a-falling-strip-scales), so each step
# is linear.''', [('fp', 1), ('fo', 1), ('ll', 1), ('mm', 1)], 'n w', [
        have('ll-adds-a-strip', 'i', 'i < 0 || ll(i + 1) == ll(i) + fp(i + 1) * w'),
        have('mm-adds-two-half-strips', 'i', 'i < 0 || 2 * mm(i + 1) == 2 * mm(i) + fo(i) * w + fp(i + 1) * w'),
        have('the-odd-strip-is-at-least-the-right-end', 'i', 'i < 0 || fo(i) * w >= fp(i + 1) * w'),
        have('ll-starts-at-zero', '', 'll(0) == 0'),
        have('mm-starts-at-zero', '', 'mm(0) == 0'),
        have('the-width-is-not-negative', '', 'w >= 0'),
        have('n-is-a-count', '', 'n >= 0'),
    ], 'll(n) <= mm(n)', 'n'),
    rule('halving-the-mesh-lowers-the-upper-sum', '''
# and the upper sum uu (left points, fp(i)) is at least the refined upper sum vv, which adds (fp(i) + fo(i)) w / 2, as
# f(q(2 i)) = fp(i), with fo(i) w <= fp(i) w as f falls. By induction on n.''',
         [('fp', 1), ('fo', 1), ('uu', 1), ('vv', 1)], 'n w', [
             have('uu-adds-a-strip', 'i', 'i < 0 || uu(i + 1) == uu(i) + fp(i) * w'),
             have('vv-adds-two-half-strips', 'i', 'i < 0 || 2 * vv(i + 1) == 2 * vv(i) + fp(i) * w + fo(i) * w'),
             have('the-odd-strip-is-at-most-the-left-end', 'i', 'i < 0 || fo(i) * w <= fp(i) * w'),
             have('uu-starts-at-zero', '', 'uu(0) == 0'),
             have('vv-starts-at-zero', '', 'vv(0) == 0'),
             have('the-width-is-not-negative', '', 'w >= 0'),
             have('n-is-a-count', '', 'n >= 0'),
         ], 'vv(n) <= uu(n)', 'n'),
    rule('the-refined-sums-are-nested', '''
# THE LIMIT: the lower sums lo(k) and upper sums up(k) at mesh w / 2^k are nested, lo rising, up falling, lo <= up.
# So for every j, lo(n) <= lo(n + j) <= up(n + j) <= up(n), by induction on j: the sums past n stay within the gap
# up(n) - lo(n) = (f(t) - f(t + h)) h / 2^n of each other, a regular sequence, and number/completeness gives its
# limit, theta(t + h) - theta(t).''', [('lo', 1), ('up', 1)], 'n j', [
        have('lo-rises', 'k', 'k < 0 || lo(k) <= lo(k + 1)'),
        have('up-falls', 'k', 'k < 0 || up(k + 1) <= up(k)'),
        have('lo-is-below-up', 'k', 'k < 0 || lo(k) <= up(k)'),
        have('n-is-a-count', '', 'n >= 0'),
        have('j-is-a-count', '', 'j >= 0'),
    ], 'lo(n) <= lo(n + j) && lo(n + j) <= up(n + j) && up(n + j) <= up(n)', 'j'),
    rule('the-refined-sums-are-regular', '''
# and REGULAR: with the gap (up(n) - lo(n)) p(n) = G, p(n) = 2^n >= n + 1, any later lower sum lo(m) is within G / n
# of lo(n). That is completeness.tree's regular sequence with modulus G / n, so its limit is a real.''', [], 'n lon lom upn pn gg', [
        have('the-sums-are-nested', '', 'lon <= lom && lom <= upn'),
        have('the-gap-halves', '', '(upn - lon) * pn == gg'),
        have('the-power-passes-the-count', '', 'pn >= n + 1'),
        have('n-is-a-precision', '', 'n >= 1'),
    ], 'n * (lom - lon) <= gg && n * (lom - lon) >= 0'),
    rule('a-riemann-sum-lies-between-its-ends', '''
# THE INCREMENT: a Riemann sum of a falling f over the first n of m strips of [t, t + h], at any points q(i) in the
# strips, lies between n w f(t + h) and n w f(t), written fb and fa, by induction on n. At n = m, n w = h.''',
         [F, ('q', 1), ('sum', 1)], 'n m w fa fb', [
        have('f-at-a-strip-point-is-within-the-ends', 'i',
             'i < 0 || i >= m || f(q(i)) <= fa && f(q(i)) >= fb'),
        have('the-sum-starts-at-zero', '', 'sum(0) == 0'),
        have('the-sum-adds-a-strip', 'i', 'i < 0 || sum(i + 1) == sum(i) + f(q(i)) * w'),
        have('the-width-is-not-negative', '', 'w >= 0'),
        have('n-is-a-count', '', 'n >= 0'),
        have('n-is-within-the-strips', '', 'n <= m'),
    ], 'sum(n) <= n * w * fa && sum(n) >= n * w * fb', 'n'),
    rule('the-angle-has-derivative-the-integrand', '''
# THE DERIVATIVE: an increment dt of theta over [t, t + h] within [h f2, h f1], with f1 - f2 <= (2 t + h) h, is
# f1 h up to (2 t + h) h^2.''', [], 't h f1 f2 dt', [
        have('the-increment-is-squeezed', '', 'dt <= h * f1 && dt >= h * f2'),
        have('the-integrand-falls-slowly', '', 'f1 - f2 <= (2 * t + h) * h && f2 <= f1'),
        have('h-is-not-negative', '', 'h >= 0'),
    ], 'dt - f1 * h <= (2 * t + h) * h * h && f1 * h - dt <= (2 * t + h) * h * h'),
]

CONTROLS = [
    rule('control-the-integrand-rises', '\n# false: 1 / (1 + s^2) falls on s >= 0', [], 'f1 f2 pp g', [
        have('the-integrand-difference', '', 'f1 - f2 == pp * g'),
        have('pp-is-positive', '', 'pp > 0'),
        have('g-is-not-negative', '', 'g >= 0'),
    ], 'f1 <= f2'),
    rule('control-the-integrand-falls-by-at-most-half-the-growth', '\n# false: pp may be near 1', [], 'f1 f2 pp g', [
        have('the-integrand-difference', '', 'f1 - f2 == pp * g'),
        have('pp-is-at-most-one', '', 'pp > 0 && pp <= 1'),
        have('g-is-not-negative', '', 'g >= 0'),
    ], '2 * (f1 - f2) <= g'),
    rule('control-the-upper-sum-equals-the-lower-sum', '\n# false: at n = 0 both sums are 0, so the difference is not the fall plus 1', [('fl', 1), ('up', 1), ('lo', 1)], 'n w', [
        have('up-starts-at-zero', '', 'up(0) == 0'),
        have('lo-starts-at-zero', '', 'lo(0) == 0'),
        have('up-adds-a-left-strip', 'i', 'i < 0 || up(i + 1) == up(i) + fl(i) * w'),
        have('lo-adds-a-right-strip', 'i', 'i < 0 || lo(i + 1) == lo(i) + fl(i + 1) * w'),
        have('n-is-a-count', '', 'n >= 0'),
    ], 'up(n) - lo(n) == (fl(0) - fl(n)) * w + 1', 'n'),
    rule('control-the-angle-with-a-first-order-error', '\n# false without the slow fall: the increment may sit at h f2', [],
         't h f1 f2 dt', [
             have('the-increment-is-squeezed', '', 'dt <= h * f1 && dt >= h * f2'),
             have('h-is-not-negative', '', 'h >= 0'),
         ], 'f1 * h - dt <= (2 * t + h) * h * h'),
    rule('control-halving-the-mesh-lowers-the-lower-sum', '\n# false: at n = 0 both sums are 0, and refining never lowers the lower sum',
         [('fp', 1), ('fo', 1), ('ll', 1), ('mm', 1)], 'n w', [
             have('ll-adds-a-strip', 'i', 'i < 0 || ll(i + 1) == ll(i) + fp(i + 1) * w'),
             have('mm-adds-two-half-strips', 'i', 'i < 0 || 2 * mm(i + 1) == 2 * mm(i) + fo(i) * w + fp(i + 1) * w'),
             have('the-odd-strip-is-at-least-the-right-end', 'i', 'i < 0 || fo(i) * w >= fp(i + 1) * w'),
             have('ll-starts-at-zero', '', 'll(0) == 0'),
             have('mm-starts-at-zero', '', 'mm(0) == 0'),
             have('the-width-is-not-negative', '', 'w >= 0'),
             have('n-is-a-count', '', 'n >= 0'),
         ], 'mm(n) + 1 <= ll(n)', 'n'),
]


# the same two induction controls, false only in the STEP. The fast refusal in check/product.ts (plainlyInfeasible)
# refuses each in minutes, and the exact search alone takes hours, so they live in their own file.
STEP_CONTROLS = [
    rule('control-the-upper-sum-equals-the-lower-sum-at-every-n', '\n# false: the sums differ by the fall of f times w',
         [('fl', 1), ('up', 1), ('lo', 1)], 'n w', [
             have('up-starts-at-zero', '', 'up(0) == 0'),
             have('lo-starts-at-zero', '', 'lo(0) == 0'),
             have('up-adds-a-left-strip', 'i', 'i < 0 || up(i + 1) == up(i) + fl(i) * w'),
             have('lo-adds-a-right-strip', 'i', 'i < 0 || lo(i + 1) == lo(i) + fl(i + 1) * w'),
             have('n-is-a-count', '', 'n >= 0'),
         ], 'up(n) == lo(n)', 'n'),
    rule('control-halving-the-mesh-lowers-the-lower-sum-at-every-n', '\n# false: refining raises the lower sum',
         [('fp', 1), ('fo', 1), ('ll', 1), ('mm', 1)], 'n w', [
             have('ll-adds-a-strip', 'i', 'i < 0 || ll(i + 1) == ll(i) + fp(i + 1) * w'),
             have('mm-adds-two-half-strips', 'i', 'i < 0 || 2 * mm(i + 1) == 2 * mm(i) + fo(i) * w + fp(i + 1) * w'),
             have('the-odd-strip-is-at-least-the-right-end', 'i', 'i < 0 || fo(i) * w >= fp(i + 1) * w'),
             have('ll-starts-at-zero', '', 'll(0) == 0'),
             have('mm-starts-at-zero', '', 'mm(0) == 0'),
             have('the-width-is-not-negative', '', 'w >= 0'),
             have('n-is-a-count', '', 'n >= 0'),
         ], 'mm(n) <= ll(n)', 'n'),
]


def main():
    open(f'{ROOT}/code/integral/angle.tree', 'w').write(HEADER + '\n' + '\n\n'.join(RULES) + '\n')
    head = '# NEGATIVE CONTROLS for integral/angle: each must be REFUSED. Expected: 5.\n'
    open(f'{ROOT}/control/number/angle-control.tree', 'w').write(head + '\n\n'.join(CONTROLS) + '\n')
    head = ('# NEGATIVE CONTROLS for integral/angle, false only in the induction step: each must be REFUSED. Expected: 2.\n'
            '# Needs the fast refusal in check/product.ts in the build that runs it.\n')
    open(f'{ROOT}/control/number/angle-step-control.tree', 'w').write(head + '\n\n'.join(STEP_CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls', len(STEP_CONTROLS), 'step controls')


if __name__ == '__main__':
    main()
