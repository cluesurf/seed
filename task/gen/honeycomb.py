import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/vibe/honeycomb.tree: Gram determinants of Coxeter chains, from a determinant defined by Laplace."""
import sys
sys.path.insert(0, GEN)
from tree import call, read, code, ind

out = ['''# Which geometry a regular honeycomb lives in, decided by one determinant. A regular polytope or honeycomb {p, q, r, ...}
# is cut out by mirrors whose Coxeter diagram is a chain; mirrors i and i + 1 meet at angle pi / m_i, the rest at
# right angles. Its Gram matrix G has 1 on the diagonal and -cos(pi / m_i) beside it. For a chain, 2G has 2 on the
# diagonal and -u_i beside it with u_i^2 = x_i = 4 cos^2(pi / m_i), which is RATIONAL for the labels that occur here:
#
#   m = 2: x = 0     m = 3: x = 1     m = 4: x = 2     m = 6: x = 3
#
# and the determinant of a chain depends only on the x_i. Sylvester's criterion reads the geometry off the leading
# minors: all positive is the sphere, positive then a zero is flat space, and exactly one sign change in the sequence
# of minors is one negative eigenvalue, the hyperbolic signature (n, 1).
#
# This file DEFINES the determinant by Laplace expansion (3 x 3 by Sarrus' rule, 4 x 4 and 5 x 5 along the first row)
# and PROVES, for all integer entries, that the determinant of a tridiagonal 2G is the continuant
#
#   D0 = 1,  D1 = 2,  Dk = 2 D(k-1) - x(k-1) D(k-2),
#
# then evaluates the minors of the cell {3,4,3}, the vertex figure {4,3,4}, and the model's space {3,4,3,4}:
#
#   {3,4,3}     2, 3, 2, 1          spherical: the 24-cell is a finite polytope, det G = 1/16
#   {4,3,4}     2, 2, 2, 0          flat: the cusp is tiled by cubes, the horosphere is Euclidean 3-space
#   {3,4,3,4}   2, 3, 2, 1, -2      one sign change: hyperbolic 4-space, det G = -2 / 32 = -1/16
#
# With a spherical cell and a flat vertex figure the honeycomb has finite cells and ideal vertices (paracompact). The
# Cartan determinants of the root systems the dock meets come from the same continuant: A4 is 5, B4 is 2, F4 is 1.
# The plane criterion "1/p + 1/q > 1/2 exactly when (p - 2)(q - 2) < 4" is proved as a polynomial identity.''']

out.append('''load @term/form/code/vibe/warp
  find determinant-three''')

M4 = [[f'a{i}{j}' for j in range(1, 5)] for i in range(1, 5)]
M5 = [[f'a{i}{j}' for j in range(1, 6)] for i in range(1, 6)]


def minor(M, col):
    return [row[:col] + row[col + 1:] for row in M[1:]]


def laplace(M, det_name):
    terms = []
    for col in range(len(M)):
        sub = minor(M, col)
        t = call('multiply', read(M[0][col]), call(det_name, *[read(x) for row in sub for x in row]))
        terms.append(t)
    acc = terms[0]
    for n, t in enumerate(terms[1:], start=1):
        acc = call('subtract' if n % 2 == 1 else 'add', acc, t)
    return acc


def task(name, args, body, comment):
    lines = [comment, f'task {name}'] + [f'  take {a}, like integer' for a in args] + ['  like integer', '  send back', ind(body, 4)]
    return '\n'.join(lines)


out.append(task('determinant-four', [x for r in M4 for x in r], laplace(M4, 'determinant-three'),
                '# The 4 x 4 determinant, expanded along the first row.'))
out.append(task('determinant-five', [x for r in M5 for x in r], laplace(M5, 'determinant-four'),
                '# The 5 x 5 determinant, expanded along the first row.'))

# continuants
cont = {}
cont[0] = code(1)
cont[1] = code(2)
args = []
for k in range(2, 6):
    args = [f'x{i}' for i in range(1, k)]
    prev1 = call(f'chain-{k-1}', *[read(f'x{i}') for i in range(1, k - 1)]) if k - 1 >= 2 else code(2)
    prev2 = call(f'chain-{k-2}', *[read(f'x{i}') for i in range(1, k - 2)]) if k - 2 >= 2 else (code(2) if k - 2 == 1 else code(1))
    body = call('subtract', call('multiply', code(2), prev1), call('multiply', read(f'x{k-1}'), prev2))
    out.append(task(f'chain-{k}', args, body,
                    f'# The continuant of a chain of {k} mirrors: det 2G with x_i = 4 cos^2(pi / m_i).'))


def tridiagonal(n):
    """Entries of 2G for a chain with off-diagonal -u_i, as expression strings."""
    rows = []
    for i in range(n):
        row = []
        for j in range(n):
            if i == j:
                row.append(code(2))
            elif j == i + 1:
                row.append(call('subtract', code(0), read(f'u{i+1}')))
            elif i == j + 1:
                row.append(call('subtract', code(0), read(f'u{j+1}')))
            else:
                row.append(code(0))
        rows.append(row)
    return rows


def rule(name, lhs, rhs, marks=(), comment=None, kind='integer'):
    head = [comment] if comment else []
    body = [f'rule {name}'] + [f'  mark {m}, like {kind}' for m in marks] + ['  show hold', '    call is-equal', ind(lhs, 6), ind(rhs, 6)]
    return '\n'.join(head + body)


for n, det in ((3, 'determinant-three'), (4, 'determinant-four'), (5, 'determinant-five')):
    T = tridiagonal(n)
    us = [f'u{i}' for i in range(1, n)]
    sq = [call('multiply', read(u), read(u)) for u in us]
    out.append(rule(f'the-determinant-of-a-chain-of-{n}-is-its-continuant', call(det, *[x for r in T for x in r]),
                    call(f'chain-{n}', *sq), marks=us,
                    comment=f'# THE DETERMINANT OF A CHAIN OF {n} MIRRORS IS ITS CONTINUANT, for every set of off-diagonal entries.'))


def ev(name, k, xs, value, comment=None):
    return rule(name, call(f'chain-{k}', *[code(x) for x in xs]), code(value), comment=comment)


out.append(ev('the-24-cell-chain-of-two-is-three', 2, [1], 3,
              '# THE 24-CELL {3,4,3}: minors 2, 3, 2, 1, all positive, so its mirrors bound a sphere chamber.'))
out.append(ev('the-24-cell-chain-of-three-is-two', 3, [1, 2], 2))
out.append(ev('the-24-cell-chain-of-four-is-one', 4, [1, 2, 1], 1))
out.append(ev('the-cubic-chain-of-two-is-two', 2, [2], 2,
              '# THE CUBIC HONEYCOMB {4,3,4}: minors 2, 2, 2 then 0, flat. This is the horosphere at every vertex of {3,4,3,4}.'))
out.append(ev('the-cubic-chain-of-three-is-two', 3, [2, 1], 2))
out.append(ev('the-cubic-chain-of-four-is-zero', 4, [2, 1, 2], 0))
out.append(ev('the-mesh-chain-of-five-is-minus-two', 5, [1, 2, 1, 2], -2,
              '# THE MESH {3,4,3,4}: the first four minors are those of {3,4,3} (2, 3, 2, 1), the fifth is -2. One sign change:\n# signature (4, 1), hyperbolic 4-space, and det G = -2 / 2^5 = -1/16.'))
out.append(ev('the-five-cell-has-cartan-determinant-five', 4, [1, 1, 1], 5,
              '# THE CARTAN DETERMINANTS: A4 (the 5-cell {3,3,3}) is 5, B4 (the tesseract {4,3,3}) is 2, F4 is 1 (above).'))
out.append(ev('the-tesseract-has-cartan-determinant-two', 4, [2, 1, 1], 2))

out.append(rule('the-distance-between-adjacent-cells-has-cosh-three',
                call('multiply', code(2), call('chain-4', code(1), code(2), code(1))),
                call('subtract', code(0), call('chain-5', code(1), code(2), code(1), code(2))),
                comment='''# THE DISTANCE BETWEEN NEIGHBOURING CELLS. For the mirror opposite the cell, (G^-1)_55 = det G_1234 / det G
# = (D4 / 2^4) / (D5 / 2^5) = 2 D4 / D5, which is -1 here, so cosh d = 1 - 2 / (G^-1)_55 = 3 and d = 1.7627...'''))

out.append(rule('the-plane-criterion', call('subtract', call('add', call('multiply', code(2), read('p')), call('multiply', code(2), read('q'))),
                                                        call('multiply', read('p'), read('q'))),
                call('subtract', code(4), call('multiply', call('subtract', read('p'), code(2)), call('subtract', read('q'), code(2)))),
                marks=('p', 'q'),
                comment='''# THE PLANE CRITERION: 2pq (1/p + 1/q - 1/2) = 2q + 2p - pq = 4 - (p - 2)(q - 2). So {p, q} tiles the sphere,
# the plane or the hyperbolic plane as (p - 2)(q - 2) is below, at or above 4: {7,3} gives 5, hyperbolic.'''))

print('\n\n'.join(out) + '\n')
