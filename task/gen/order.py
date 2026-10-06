import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/space/hyperbolic/order.tree: the ordered-field steps of hyperbolic geometry, each proved by the product
prover (check/product.ts) from its hypotheses. Expressions are written as arithmetic strings and printed as Term."""

import re
import sys

sys.path.insert(0, GEN)
from tree import call, code, ind, read  # noqa: E402

TOKEN = re.compile(r'\s*(\d+|[a-z][a-z0-9]*|[-+*()])')


def parse(text):
    """+ - * over integers and names, left associative, into Term `call add / subtract / multiply`."""
    tokens = TOKEN.findall(text)
    assert ''.join(tokens) == text.replace(' ', ''), text
    at = [0]

    def peek():
        return tokens[at[0]] if at[0] < len(tokens) else None

    def take():
        at[0] += 1
        return tokens[at[0] - 1]

    def atom():
        t = take()
        if t == '(':
            e = expr()
            assert take() == ')'
            return e
        if t == '-':
            return call('subtract', code(0), atom())
        return code(int(t)) if t.isdigit() else read(t)

    def term():
        e = atom()
        while peek() == '*':
            take()
            e = call('multiply', e, atom())
        return e

    def expr():
        e = term()
        while peek() in ('+', '-'):
            op = take()
            e = call('add' if op == '+' else 'subtract', e, term())
        return e

    e = expr()
    assert at[0] == len(tokens), text
    return e


COMPARE = {'>=': 'is-minimum', '<=': 'is-maximum', '>': 'is-above', '<': 'is-below', '==': 'is-equal'}


def claim(text):
    """`L op R`, or `A || B` for a disjunction."""
    if '||' in text:
        parts = [claim(p.strip()) for p in text.split('||')]
        return '\n'.join(['meet or'] + [ind(p, 2) for p in parts])
    for op in ('>=', '<=', '==', '>', '<'):
        if op in text:
            left, right = text.split(op)
            return call(COMPARE[op], parse(left.strip()), parse(right.strip()))
    raise ValueError(text)


def rule(name, comment, marks, haves, show):
    out = [comment.rstrip(), f'rule {name}']
    for m in marks.split():
        out.append(f'  seat {m}, like integer')
    for i, (label, h) in enumerate(haves):
        out.append(f'  have {label}')
        out.append(ind(claim(h), 4))
    out.append('  show hold')
    out.append(ind(claim(show), 4))
    return '\n'.join(out)


HEADER = '''# The ORDERED-FIELD steps of hyperbolic geometry: the inequalities that turn the identities of
# space/hyperbolic/metric into the theorems they are about. metric proves, as polynomial identities, that the Gram
# determinant of three points is a square and that it equals (p^2 - 1)(q^2 - 1) - (r - p q)^2. What is left is
# ORDER: from a squared inequality to the inequality, from a product's sign to its factors' signs, from a
# non-negative discriminant to a meeting point. Each rule below is proved by the product prover (check/product.ts), a
# degree-two Positivstellensatz: the hypotheses and the negated goal are multiplied in pairs (and with squares and
# monomials), and an exact simplex finds non-negative multipliers whose combination is identically a negative
# constant, or zero with a strict part. That combination is the proof, replayed by a checker. No integer rounding is
# used, so every rule holds in every ORDERED FIELD, the real numbers included, though the variables are typed integer.
#
# Notation, as in metric: a distance d is carried by its cosh. For two sides of a triangle, p = cosh a and q = cosh b,
# with s = sinh a and t = sinh b given by their defining equations s^2 = p^2 - 1, t^2 = q^2 - 1 and signs s, t >= 0.
# Then cosh(a + b) = p q + s t and cosh(a - b) = p q - s t, and r = cosh c is the third side's.
#
#   ORDERED FIELD   the square-root step, the sign of a factor, products of signs;
#   ADDITION        (p q + s t, p t + q s) is again a (cosh, sinh) pair, so p q + s t IS cosh(a + b), and it is >= 1;
#   TRIANGLE        cosh(a - b) <= cosh c <= cosh(a + b), from the Gram determinant, and the upper bound is attained
#                   only when the Gram determinant is 0, which metric shows is det(x, y, z)^2: the points are collinear;
#   PASCH (II.4)    with u, v, w the signs B(a, n), B(b, n), B(c, n) of a triangle's corners against a line n missing
#                   c: if the line crosses a b (u v < 0) it crosses exactly one of a c and b c;
#   CONTINUITY      Tarski's elementary (line-circle) continuity, in the Klein disk: a line through a point inside a
#                   circle meets it, because the meeting point's quadratic has a non-negative discriminant;
#
# What this file does not give: CONTINUITY in Dedekind's second-order form, and the ARCHIMEDEAN property. Both hold
# for the real numbers and fail in some ordered fields, so no ordered-field proof can reach them. They need the real
# numbers as a complete ordered field, which the kernel does not have yet (note/term/hyperbolic-geometry.md). The
# meeting point itself is the root (-B + sqrt(disc)) / 2A, which exists in any field with square roots of its
# non-negatives (a Euclidean field). That existence is the one field axiom the continuity rule leans on.
'''

RULES = [
    ('square-root-step',
     '''
# ORDERED FIELD. A squared inequality between a quantity and a non-negative one gives the inequality itself: from
# y >= 0 and x^2 <= y^2, x <= y. (With x = -2, y = 1 the sign hypothesis is what fails: it cannot be dropped.)''',
     'x y', [('y-is-non-negative', 'y >= 0'), ('squares', 'x * x <= y * y')], 'x <= y'),
    ('sign-of-a-factor',
     '''
# A positive product with one positive factor has a positive other factor.''',
     'a b', [('product-is-positive', 'a * b > 0'), ('a-is-positive', 'a > 0')], 'b > 0'),
    ('opposite-signs-give-a-negative-product',
     '''
# Opposite signs multiply to a negative.''',
     'a b', [('a-is-positive', 'a > 0'), ('b-is-negative', 'b < 0')], 'a * b < 0'),
    ('the-sum-of-two-distances-is-on-the-hyperbola',
     '''
# ADDITION. (p, s) and (q, t) are points of the hyperbola X^2 - Y^2 = 1, and so is their product
# (p q + s t, p t + q s): the hyperbolic addition law, so p q + s t is the cosh of a distance, the sum of the two.''',
     'p q s t', [('first-pair', 'p * p - s * s == 1'), ('second-pair', 'q * q - t * t == 1')],
     '(p * q + s * t) * (p * q + s * t) - (p * t + q * s) * (p * t + q * s) == 1'),
    ('the-cosh-of-a-sum-is-at-least-one',
     '''
# And it is at least 1, as a cosh must be: from p, q >= 1 (a cosh) and s, t >= 0.''',
     'p q s t', [('p-is-a-cosh', 'p >= 1'), ('q-is-a-cosh', 'q >= 1'), ('s-is-a-sinh', 's >= 0'), ('t-is-a-sinh', 't >= 0')],
     'p * q + s * t >= 1'),
    ('the-triangle-inequality',
     '''
# THE TRIANGLE INEQUALITY, d(x, z) <= d(x, y) + d(y, z): cosh c <= cosh(a + b) = p q + s t. Its hypothesis is the
# Gram determinant's sign, (p^2 - 1)(q^2 - 1) - (r - p q)^2 >= 0, which metric proves for any three points (it is
# det(x, y, z)^2). Since cosh is increasing on the distances, this is the inequality of the distances.''',
     'p q r s t',
     [('s-is-a-sinh', 's >= 0'), ('t-is-a-sinh', 't >= 0'),
      ('s-squared', 's * s == p * p - 1'), ('t-squared', 't * t == q * q - 1'),
      ('gram-is-a-square', '(p * p - 1) * (q * q - 1) - (r - p * q) * (r - p * q) >= 0')],
     'r <= p * q + s * t'),
    ('the-reverse-triangle-inequality',
     '''
# And the other side, cosh(a - b) = p q - s t <= cosh c: a side is at least the difference of the other two.''',
     'p q r s t',
     [('s-is-a-sinh', 's >= 0'), ('t-is-a-sinh', 't >= 0'),
      ('s-squared', 's * s == p * p - 1'), ('t-squared', 't * t == q * q - 1'),
      ('gram-is-a-square', '(p * p - 1) * (q * q - 1) - (r - p * q) * (r - p * q) >= 0')],
     'r >= p * q - s * t'),
    ('equality-in-the-triangle-inequality-is-degenerate',
     '''
# EQUALITY: when cosh c = cosh(a + b) the Gram determinant is 0, which metric shows is det(x, y, z)^2, so the three
# points are collinear and y lies between: the triangle inequality is strict for every genuine triangle.''',
     'p q r s t',
     [('s-squared', 's * s == p * p - 1'), ('t-squared', 't * t == q * q - 1'), ('equality', 'r == p * q + s * t')],
     '(p * p - 1) * (q * q - 1) - (r - p * q) * (r - p * q) == 0'),
    ('pasch-the-line-does-not-cross-both-other-sides',
     '''
# PASCH'S AXIOM (II.4), the sign step. A line n crosses the side a b when B(a, n) and B(b, n) have opposite signs
# (u v < 0, and metric shows B is linear along the segment, so the crossing point is on it). With c off the line
# (w^2 > 0) it cannot cross both a c and b c: that would make u w < 0 and v w < 0, hence u v w^2 > 0, so u v > 0.''',
     'u v w',
     [('crosses-a-c', 'u * w < 0'), ('crosses-b-c', 'v * w < 0'), ('c-is-off-the-line', 'w * w > 0')],
     'u * v > 0'),
    ('pasch-the-line-crosses-one-other-side',
     '''
# And it crosses at least one: if it crosses a b and c is off the line, it crosses a c or b c.''',
     'u v w',
     [('crosses-a-b', 'u * v < 0'), ('c-is-off-the-line', 'w * w > 0')],
     'u * w < 0 || v * w < 0'),
    ('line-circle-continuity',
     '''
# CONTINUITY, line and circle (Tarski's elementary continuity). By homogeneity (hyperboloid) the circle's center is
# the origin of the Klein disk, where a circle of radius r is the Euclidean circle |k|^2 = m with m = tanh^2 r. The
# line through a = (a1, a2) in direction v = (v1, v2) meets it where |a + l v|^2 = m, a quadratic in l whose
# quarter discriminant is m |v|^2 - (a1 v2 - a2 v1)^2. When a is inside (|a|^2 <= m) it is >= 0, so the root exists.
# The proof is Lagrange's identity |a|^2 |v|^2 = d^2 + (a1 v2 - a2 v1)^2 with d = a . v, then |a|^2 <= m.''',
     'a1 a2 v1 v2 m d',
     [('a-is-inside', 'a1 * a1 + a2 * a2 <= m'), ('d-is-the-dot-product', 'd == a1 * v1 + a2 * v2')],
     'm * (v1 * v1 + v2 * v2) - (a1 * v2 - a2 * v1) * (a1 * v2 - a2 * v1) >= 0'),
]


CONTROLS = [
    ('control-square-root-without-the-sign', '\n# false: x = 1, y = -1', 'x y',
     [('squares', 'x * x <= y * y')], 'x <= y'),
    ('control-square-root-strict', '\n# false: x = y', 'x y',
     [('y-is-non-negative', 'y >= 0'), ('squares', 'x * x <= y * y')], 'x < y'),
    ('control-sign-of-a-factor-without-a-sign', '\n# false: a = b = -1', 'a b',
     [('product-is-positive', 'a * b > 0')], 'b > 0'),
    ('control-addition-wrong-sign', '\n# false: the difference pair is (p q - s t, p t - q s), not this', 'p q s t',
     [('first-pair', 'p * p - s * s == 1'), ('second-pair', 'q * q - t * t == 1')],
     '(p * q + s * t) * (p * q + s * t) - (p * t - q * s) * (p * t - q * s) == 1'),
    ('control-triangle-without-the-gram-sign', '\n# false: a third side longer than the sum', 'p q r s t',
     [('s-is-a-sinh', 's >= 0'), ('t-is-a-sinh', 't >= 0'),
      ('s-squared', 's * s == p * p - 1'), ('t-squared', 't * t == q * q - 1')],
     'r <= p * q + s * t'),
    ('control-triangle-strict', '\n# false: a degenerate triangle attains it', 'p q r s t',
     [('s-is-a-sinh', 's >= 0'), ('t-is-a-sinh', 't >= 0'),
      ('s-squared', 's * s == p * p - 1'), ('t-squared', 't * t == q * q - 1'),
      ('gram-is-a-square', '(p * p - 1) * (q * q - 1) - (r - p * q) * (r - p * q) >= 0')],
     'r < p * q + s * t'),
    ('control-triangle-without-the-sinh-sign', '\n# false: s = -sinh a reverses the bound', 'p q r s t',
     [('t-is-a-sinh', 't >= 0'),
      ('s-squared', 's * s == p * p - 1'), ('t-squared', 't * t == q * q - 1'),
      ('gram-is-a-square', '(p * p - 1) * (q * q - 1) - (r - p * q) * (r - p * q) >= 0')],
     'r <= p * q + s * t'),
    ('control-pasch-with-c-on-the-line', '\n# false: w = 0', 'u v w',
     [('crosses-a-b', 'u * v < 0')], 'u * w < 0 || v * w < 0'),
    ('control-continuity-from-outside', '\n# false: a point outside, a line missing the circle', 'a1 a2 v1 v2 m d',
     [('d-is-the-dot-product', 'd == a1 * v1 + a2 * v2')],
     'm * (v1 * v1 + v2 * v2) - (a1 * v2 - a2 * v1) * (a1 * v2 - a2 * v1) >= 0'),
]


def main():
    parts = [HEADER.rstrip()]
    for name, comment, marks, haves, show in RULES:
        parts.append(rule(name, comment, marks, haves, show))
    out = '\n'.join(parts) + '\n'
    path = _os.path.join(SEED, 'code/space/hyperbolic/order.tree')
    open(path, 'w').write(out)
    print(f'wrote {path}, {len(RULES)} rules, {out.count(chr(10))} lines')
    control = ['# NEGATIVE CONTROLS for space/hyperbolic/order: each rule drops a hypothesis or tightens the goal, and each must be'
               '\n# REFUSED. A prover that accepted these would prove nothing. Expected: 9 refusals.']
    for name, comment, marks, haves, show in CONTROLS:
        control.append(rule(name, comment, marks, haves, show))
    path = _os.path.join(SEED, 'test/case/hyperbolic/order-control.tree')
    open(path, 'w').write('\n'.join(control) + '\n')
    print(f'wrote {path}, {len(CONTROLS)} controls')


if __name__ == '__main__':
    main()
