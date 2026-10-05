import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/space/hyperbolic/metric.tree: congruence, the triangle inequality, betweenness, isometry classes,
the Cayley map, the angle of parallelism and the circle, on the hyperboloid model of space/hyperbolic/hyperboloid."""
import sys
sys.path.insert(0, GEN)
from tree import call, read, code, ind


def num(v):
    return code(v) if isinstance(v, int) else (read(v) if ' ' not in v and '\n' not in v else v)


def B(x, y):
    return call('lorentz-form', *[num(a) for a in x], *[num(b) for b in y])


def sub(a, b):
    return call('subtract', a, b)


def add(a, b):
    return call('add', a, b)


def mul(a, b):
    return call('multiply', a, b)


def rule(name, lhs, rhs, marks=(), haves=(), comment=None):
    out = [comment] if comment else []
    out.append(f'rule {name}')
    for m in marks:
        out.append(f'  mark {m}, like integer')
    for hn, (hl, hr) in haves:
        out += [f'  have {hn}', '    call is-equal', ind(hl, 6), ind(hr, 6)]
    out += ['  show hold', '    call is-equal', ind(lhs, 6), ind(rhs, 6)]
    return '\n'.join(out)


def vec(name):
    return [f'{name}0', f'{name}1', f'{name}2']


out = ['''# The metric geometry of the hyperbolic plane, on the hyperboloid model of space/hyperbolic/hyperboloid (a point is x
# with B(x, x) = 1, cosh of a distance is B(x, y)). Every theorem is a polynomial identity proved for all real values.
# Where a theorem has hypotheses, it is stated as a CERTIFICATE: the difference of its two sides written as a sum of
# multiples of the hypotheses' differences. The kernel proves the certificate outright, and under the hypotheses every
# term vanishes, which is the theorem. (This is how a linear-combination tactic proves a conditional identity.)
#
#   CONGRUENCE     side-angle-side and side-side-side for two triangles, by one certificate;
#   THE TRIANGLE INEQUALITY   the Gram determinant of three vectors is det(x, y, z)^2. For points it reads
#                  (p^2 - 1)(q^2 - 1) - (r - p q)^2 = det^2 >= 0 with p, q, r the three cosh's, so
#                  cosh d(x, z) <= cosh(d(x, y) + d(y, z)), with equality exactly when det = 0;
#   COLLINEARITY   three points on one line have det = 0 (Cramer's identity), so for them the triangle inequality is
#                  an equality: one distance is the sum of the other two;
#   BETWEENNESS    for y = l x + m z, r B(y, y) - p q = l m (r^2 - B(x, x) B(z, z)): when y lies on the segment
#                  (l, m >= 0) the distances ADD, d(x, z) = d(x, y) + d(y, z), and between is additivity;
#   ISOMETRY CLASSES  a Mobius map of trace t has fixed points with discriminant t^2 - 4 (for determinant 1): two inside
#                  the half plane's closure as conjugates when t^2 < 4 (ELLIPTIC, a rotation), one double point at
#                  infinity when t^2 = 4 (PARABOLIC), two boundary points when t^2 > 4 (HYPERBOLIC, a translation);
#   THE CAYLEY MAP w = (z - i) / (z + i) carries the upper half plane onto the disk: 1 - |w|^2 = 4 Im z / |z + i|^2,
#                  and it scales differences by 2 i / ((z1 + i)(z2 + i)), so the two distance formulas agree;
#   THE ANGLE OF PARALLELISM  for a point at distance d from a line, the limiting parallel meets the perpendicular at
#                  the angle P with cos P = tanh d (Lobachevsky);
#   PASCH          a line crossing one side of a triangle crosses exactly one other (signs of B(., n));
#   AREA           the angle defect pi - (angle sum) is additive under cutting a triangle;
#   THE CIRCLE     a circle of radius r is traced at speed sinh r, so its circumference is 2 pi sinh r.''']

out.append('''load @term/seed/code/space/hyperbolic/hyperboloid
  find lorentz-form
  find lorentz-cross-t
  find lorentz-cross-x
  find lorentz-cross-y''')

# ---- SAS / SSS certificate
a, b, c, p, q, r = vec('a'), vec('b'), vec('c'), vec('p'), vec('q'), vec('r')


def tangent(t, v):
    return [sub(read(t[i]), mul(B(t, v), read(v[i]))) for i in range(3)]


angA = B(tangent(b, a), tangent(c, a))
angP = B(tangent(q, p), tangent(r, p))
cert = sub(add(add(sub(angA, angP), add(mul(B(a, b), sub(B(a, c), B(p, r))), mul(B(p, r), sub(B(a, b), B(p, q))))),
               mul(mul(B(p, q), B(p, r)), sub(B(p, p), code(1)))),
           mul(mul(B(a, b), B(a, c)), sub(B(a, a), code(1))))
out.append(rule('side-angle-side-and-side-side-side', sub(B(b, c), B(q, r)), cert, a + b + c + p + q + r,
                comment='''# CONGRUENCE, Hilbert's group III. For triangles (a, b, c) and (p, q, r), with the angle at a read as the tangent
# product angle(a) = B(b - B(b, a) a, c - B(c, a) a):
#
#   B(b, c) - B(q, r) = [angle(a) - angle(p)] + B(a, b) [B(a, c) - B(p, r)] + B(p, r) [B(a, b) - B(p, q)]
#                       - B(a, b) B(a, c) [B(a, a) - 1] + B(p, q) B(p, r) [B(p, p) - 1].
#
# SIDE-ANGLE-SIDE: if a and p are points and the triangles agree in the two sides at a and p and in the angle between
# them, every bracket is 0 and the third sides agree. SIDE-SIDE-SIDE: read for the angles, three equal sides make the
# angle difference 0.'''))

# ---- Gram determinant
x, y, z = vec('x'), vec('y'), vec('z')
out.append('''# The determinant of three vectors by Sarrus' rule, and of a symmetric 3 x 3 matrix with diagonal (a, g, c) and
# off-diagonal p (row 1 col 2), r (row 1 col 3), q (row 2 col 3).
task coordinate-determinant
  take x0, like integer
  take x1, like integer
  take x2, like integer
  take y0, like integer
  take y1, like integer
  take y2, like integer
  take z0, like integer
  take z1, like integer
  take z2, like integer
  like integer
  send back
''' + ind(sub(add(add(mul(read('x0'), mul(read('y1'), read('z2'))), mul(read('x1'), mul(read('y2'), read('z0')))), mul(read('x2'), mul(read('y0'), read('z1')))),
                add(add(mul(read('x2'), mul(read('y1'), read('z0'))), mul(read('x1'), mul(read('y0'), read('z2')))), mul(read('x0'), mul(read('y2'), read('z1'))))), 4))

sym = sub(add(mul(read('ga'), mul(read('gg'), read('gc'))), mul(code(2), mul(read('gp'), mul(read('gq'), read('gr'))))),
          add(add(mul(read('ga'), mul(read('gq'), read('gq'))), mul(read('gg'), mul(read('gr'), read('gr')))), mul(read('gc'), mul(read('gp'), read('gp')))))
out.append('''task gram-determinant
  take ga, like integer
  take gg, like integer
  take gc, like integer
  take gp, like integer
  take gq, like integer
  take gr, like integer
  like integer
  send back
''' + ind(sym, 4))

D = call('coordinate-determinant', *[read(v) for v in x + y + z])
G = call('gram-determinant', B(x, x), B(y, y), B(z, z), B(x, y), B(y, z), B(x, z))
out.append(rule('the-gram-determinant-is-the-square-of-the-determinant', G, mul(D, D), x + y + z,
                comment='''# THE GRAM DETERMINANT of three vectors under B is det(x, y, z)^2 (det J = 1), for all vectors.'''))
pp, qq, rr = B(x, y), B(y, z), B(x, z)
tri = sub(mul(sub(mul(pp, pp), code(1)), sub(mul(qq, qq), code(1))), mul(sub(rr, mul(pp, qq)), sub(rr, mul(pp, qq))))
out.append(rule('the-triangle-inequality', tri, mul(D, D), x + y + z,
                haves=[('x-point', (B(x, x), code(1))), ('y-point', (B(y, y), code(1))), ('z-point', (B(z, z), code(1)))],
                comment='''# THE TRIANGLE INEQUALITY. For three points, with p = cosh d(x, y), q = cosh d(y, z), r = cosh d(x, z):
# (p^2 - 1)(q^2 - 1) - (r - p q)^2 = det(x, y, z)^2 >= 0, so r <= p q + sqrt((p^2 - 1)(q^2 - 1)) = cosh(d(x, y) + d(y, z)),
# and d(x, z) <= d(x, y) + d(y, z) since cosh increases on [0, oo). Equality exactly when det = 0.'''))

# Cramer: det(x,y,z) * (J n) = B(x,n)(y x z) + B(y,n)(z x x) + B(z,n)(x x y), Euclidean cross products
n = vec('n')
def ecross(u, v):
    return [sub(mul(read(u[1]), read(v[2])), mul(read(u[2]), read(v[1]))),
            sub(mul(read(u[2]), read(v[0])), mul(read(u[0]), read(v[2]))),
            sub(mul(read(u[0]), read(v[1])), mul(read(u[1]), read(v[0])))]
yz, zx, xy = ecross(y, z), ecross(z, x), ecross(x, y)
Jn = [read('n0'), sub(code(0), read('n1')), sub(code(0), read('n2'))]
for i, cc in enumerate(('t', 'x', 'y')):
    rhs = add(add(mul(B(x, n), yz[i]), mul(B(y, n), zx[i])), mul(B(z, n), xy[i]))
    out.append(rule(f'three-points-on-a-line-have-zero-determinant-{cc}', mul(D, Jn[i]), rhs, x + y + z + n,
                    comment=None if i else '''# COLLINEARITY: Cramer's identity det(x, y, z) J n = B(x, n) (y x z) + B(y, n) (z x x) + B(z, n) (x x y). Three
# points on the line n make every B(., n) zero, so det(x, y, z) J n = 0 and det = 0: for collinear points the triangle
# inequality is an equality, one distance the sum of the other two.'''))

# betweenness additivity
l, m = 'lam', 'mu'
yv = [add(mul(read(l), read(x[i])), mul(read(m), read(z[i]))) for i in range(3)]
out.append(rule('between-is-additive', sub(mul(B(x, z), B(yv, yv)), mul(B(x, yv), B(yv, z))),
                mul(mul(read(l), read(m)), sub(mul(B(x, z), B(x, z)), mul(B(x, x), B(z, z)))), x + z + [l, m],
                comment='''# BETWEENNESS IS ADDITIVITY. For y = l x + m z: r B(y, y) - p q = l m (r^2 - B(x, x) B(z, z)), with p = B(x, y),
# q = B(y, z), r = B(x, z). For points on the segment (B(y, y) = 1, l, m >= 0) the right side is >= 0, so r >= p q,
# which with the collinear equality (r - p q)^2 = (p^2 - 1)(q^2 - 1) makes r = cosh(d(x, y) + d(y, z)): the distance
# from x to z through y is the sum. Hilbert's II.1 (y between x and z exactly when between z and x) is the symmetry
# of this identity in (x, l) and (z, m).'''))

# isometry classes
A, Bm, C, Dm, Z = 'ma', 'mb', 'mc', 'md', 'z'
out.append(rule('a-mobius-fixed-point-solves-a-quadratic', sub(add(mul(read(A), read(Z)), read(Bm)), mul(read(Z), add(mul(read(C), read(Z)), read(Dm)))),
                sub(code(0), sub(add(mul(read(C), mul(read(Z), read(Z))), mul(sub(read(Dm), read(A)), read(Z))), read(Bm))),
                [A, Bm, C, Dm, Z],
                comment='''# ISOMETRY CLASSES. A fixed point of z -> (a z + b) / (c z + d) solves c z^2 + (d - a) z - b = 0, and the
# discriminant of that quadratic is (a + d)^2 - 4 (a d - b c), the trace squared minus four for a determinant-1 map.'''))
out.append(rule('the-fixed-point-discriminant-is-the-trace-squared-minus-four',
                add(mul(sub(read(Dm), read(A)), sub(read(Dm), read(A))), mul(code(4), mul(read(Bm), read(C)))),
                sub(mul(add(read(A), read(Dm)), add(read(A), read(Dm))), mul(code(4), sub(mul(read(A), read(Dm)), mul(read(Bm), read(C))))),
                [A, Bm, C, Dm]))

# Cayley
z1, z2, ii = 'z1', 'z2', 'i'
out.append(rule('the-cayley-map-scales-differences',
                sub(mul(sub(read(z1), read(ii)), add(read(z2), read(ii))), mul(sub(read(z2), read(ii)), add(read(z1), read(ii)))),
                mul(mul(code(2), read(ii)), sub(read(z1), read(z2))), [z1, z2, ii],
                comment='''# THE CAYLEY MAP w = (z - i) / (z + i). (z1 - i)(z2 + i) - (z2 - i)(z1 + i) = 2 i (z1 - z2), so
# w1 - w2 = 2 i (z1 - z2) / ((z1 + i)(z2 + i)). And with z = x + i y, |z + i|^2 - |z - i|^2 = 4 y, so
# 1 - |w|^2 = 4 Im z / |z + i|^2: the upper half plane goes into the disk. Put together,
# 2 |w1 - w2|^2 / ((1 - |w1|^2)(1 - |w2|^2)) = |z1 - z2|^2 / (2 Im z1 Im z2): the disk's distance formula
# (space/hyperbolic/hyperboloid) becomes the half plane's, so the Cayley map is an isometry.'''))
X1, Y1 = 'u', 'v'
out.append(rule('the-cayley-map-sends-the-half-plane-into-the-disk',
                sub(add(mul(read(X1), read(X1)), mul(add(read(Y1), code(1)), add(read(Y1), code(1)))),
                    add(mul(read(X1), read(X1)), mul(sub(read(Y1), code(1)), sub(read(Y1), code(1))))),
                mul(code(4), read(Y1)), [X1, Y1]))

# Lobachevsky
ch, sh, co, si = 'ch', 'sh', 'co', 'si'
o = [1, 0, 0]
nline = [read(sh), read(ch), code(0)]
mpar = [code(0), read(co), read(si)]
mperp = [0, 0, 1]
haves_d = [('hyperbolic-unit', (sub(mul(read(ch), read(ch)), mul(read(sh), read(sh))), code(1)))]
out.append(rule('the-line-at-distance-d-is-a-line', B(nline, nline), code(-1), [ch, sh], haves=haves_d,
                comment='''# THE ANGLE OF PARALLELISM. Put the point at o = (1, 0, 0) and the line at distance d with normal
# n = (sinh d, cosh d, 0): a line (B(n, n) = -1), at distance d (B(o, n) = sinh d). The perpendicular from o is the line
# (0, 0, 1). A line through o has normal (0, cos t, sin t), and it is the limiting parallel when B(m, n)^2 = 1, that is
# cosh^2 d cos^2 t = 1. Then the angle P it makes with the perpendicular has cos P = |B(m, m_perp)| = |sin t|, and
# cosh^2 d sin^2 t = sinh^2 d: cos P = tanh d, Lobachevsky's formula (equivalently tan(P / 2) = e^-d).'''))
out.append(rule('the-point-is-at-distance-d-from-the-line', B(o, nline), read(sh), [ch, sh]))
out.append(rule('the-perpendicular-from-the-point-meets-the-line-at-right-angles', B(mperp, nline), code(0), [ch, sh]))
out.append(rule('the-perpendicular-passes-through-the-point', B(mperp, o), code(0)))
lob_cert = add(sub(mul(mul(read(ch), read(ch)), sub(add(mul(read(si), read(si)), mul(read(co), read(co))), code(1))),
                   sub(mul(mul(read(ch), read(ch)), mul(read(co), read(co))), code(1))),
               sub(sub(mul(read(ch), read(ch)), mul(read(sh), read(sh))), code(1)))
out.append(rule('lobachevsky-cos-of-the-angle-of-parallelism-is-tanh-d',
                sub(mul(mul(read(ch), read(ch)), mul(read(si), read(si))), mul(read(sh), read(sh))), lob_cert, [ch, sh, co, si],
                comment='''# The certificate: cosh^2 d sin^2 t - sinh^2 d = cosh^2 d [sin^2 t + cos^2 t - 1] - [cosh^2 d cos^2 t - 1]
# + [cosh^2 d - sinh^2 d - 1]. Under the three hypotheses (unit direction, limiting, cosh^2 - sinh^2 = 1) every bracket
# is 0, so cosh^2 d sin^2 t = sinh^2 d and cos P = |sin t| = tanh d.'''))

# circle
cr_, sr_ = 'cr', 'sr'
pt = [read(cr_), mul(read(sr_), read(co)), mul(read(sr_), read(si))]
tg = [code(0), sub(code(0), mul(read(sr_), read(si))), mul(read(sr_), read(co))]
out.append(rule('a-circle-of-radius-r-lies-on-the-plane', B(pt, pt), code(1), [cr_, sr_, co, si],
                haves=[('hyperbolic-unit', (sub(mul(read(cr_), read(cr_)), mul(read(sr_), read(sr_))), code(1))),
                       ('unit-direction', (add(mul(read(co), read(co)), mul(read(si), read(si))), code(1)))],
                comment='''# THE CIRCLE OF RADIUS r about o: x(f) = (cosh r, sinh r cos f, sinh r sin f), on the plane, at distance r from o.
# Its velocity (0, -sinh r sin f, sinh r cos f) has squared length -B = sinh^2 r: it is traced at speed sinh r, so its
# circumference is 2 pi sinh r (and a disk's area, the integral of that, is 2 pi (cosh r - 1)).'''))
out.append(rule('a-circle-of-radius-r-is-at-distance-r', B(o, pt), read(cr_), [cr_, sr_, co, si]))
out.append(rule('a-circle-is-traced-at-speed-sinh-r', sub(code(0), B(tg, tg)), mul(read(sr_), read(sr_)), [sr_, co, si],
                haves=[('unit-direction', (add(mul(read(co), read(co)), mul(read(si), read(si))), code(1)))]))


# ---- Pasch's axiom and the segment
av, bv, cv, nv = vec('a'), vec('b'), vec('c'), vec('n')
lam, mu = 'lam', 'mu'
seg = [add(mul(read(lam), read(av[i])), mul(read(mu), read(bv[i]))) for i in range(3)]
out.append(rule('a-point-of-a-segment-sits-between-its-ends-sides', B(seg, nv), add(mul(read(lam), B(av, nv)), mul(read(mu), B(bv, nv))),
                av + bv + nv + [lam, mu],
                comment='''# ORDER: PASCH'S AXIOM. A point of the segment from a to b is l a + m b with l, m > 0, and its side of the line n is
# B(l a + m b, n) = l B(a, n) + m B(b, n). So the segment crosses the line exactly when B(a, n) and B(b, n) have
# opposite signs (the sign of B(x, n) is the side of n the point x is on).'''))
out.append(rule('pasch', mul(mul(B(av, nv), B(bv, nv)), mul(mul(B(av, nv), B(cv, nv)), mul(B(bv, nv), B(cv, nv)))),
                mul(mul(mul(B(av, nv), B(bv, nv)), B(cv, nv)), mul(mul(B(av, nv), B(bv, nv)), B(cv, nv))),
                av + bv + cv + nv,
                comment='''# The three side products multiply to a square: (ab)(ac)(bc) = (abc)^2 >= 0, writing ab = B(a, n) B(b, n) and so on.
# If the line crosses side ab (ab < 0) and misses c (c not on it), then (ac)(bc) <= 0 with neither zero, so exactly one
# of the sides ac, bc is crossed: a line entering a triangle through one side leaves through exactly one other.'''))

# ---- area: the defect is additive
al, be1, be2, ga, de1, de2, pi = 'alpha', 'beta-one', 'beta-two', 'gamma', 'delta-one', 'delta-two', 'pi'
def defect(x1, x2, x3):
    return sub(read(pi), add(add(read(x1), read(x2)), read(x3)))
out.append(rule('the-angle-defect-is-additive',
                add(defect(al, be1, de1), defect(ga, be2, de2)),
                sub(defect(al, 'beta', ga), sub(add(read(de1), read(de2)), read(pi))),
                [al, be1, be2, ga, de1, de2, pi, 'beta'],
                haves=[('split-angle', (read('beta'), add(read(be1), read(be2))))],
                comment='''# AREA. Cut a triangle with angles alpha, beta, gamma by a segment from the vertex at beta to the opposite side: the
# angle beta splits as beta1 + beta2 and the two angles at the foot add to pi (delta1 + delta2 = pi). Then the defects
# (pi minus the angle sum) of the two pieces add to the defect of the whole, plus (delta1 + delta2 - pi), which is 0:
# the defect is additive, and it is invariant under isometries (they keep angles), which are the defining properties of
# an area. Up to scale it is the hyperbolic area (Gauss-Bonnet, curvature -1).'''))

print('\n\n'.join(out) + '\n')
