import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/vibe/design.tree: the spherical-design moment identities of the dock's 24 roots and the husk."""
import sys
sys.path.insert(0, GEN)
from tree import call, read, code, ind

out = ['''# Why averages over the dock's 24 directions are round. A set of directions is a spherical t-DESIGN when averaging any
# polynomial of degree at most t over it gives the same answer as averaging over the whole sphere. For the moments of a
# linear form k . r that means: the odd moments vanish, and each even moment up to t is a fixed multiple of |k|^n, the
# same for every k (it cannot depend on the direction of k, because the sphere has no preferred direction).
#
# This file writes each moment as the literal sum over the 24 roots +-e_i +-e_j (six pairs of axes, four signs each)
# and PROVES, for all integers k:
#
#   sum (k . r)^2 = 12 |k|^2,   sum (k . r)^4 = 12 |k|^4,   sum (k . r)^odd = 0   so the 24 roots are a 5-design,
#   sum (k . r)^6 is 12 at k = e1 (|k|^6 = 1) and 144 at k = e1 + e2 (|k|^6 = 8)   so they are NOT a 6-design,
#   one frame (8 roots, a 16-cell) has sum (k . r)^2 = 4 |k|^2 but an anisotropic fourth moment   a 3-design only.
#
# The 5-design is what the rule leans on: inverse masses are isotropic, a massless walker's mean squared step along any
# unit direction is |r|^2 / 4 = 1/2 (speed c/2), and no lattice anisotropy can show before the sixth power of k,
# which is where the invariant of degree 6 of W(F4) first appears.
#
# The husk, the flat 3d face of the mesh, sees 9 weighted directions: the 3 axes (weight 2) and the 6 face diagonals
# (weight 1). For them sum g (k . u)^2 = 6 |k|^2, sum g (k . u)^4 = 6 |k|^4 and sum g (k . u)^6 = 30 p4 p2 - 24 p6,
# where p_n = sum k_i^n. The first fixes the long-range field of a point charge at 1/(4 pi 6 r) = 1/(24 pi r), the
# second says the next correction to the husk's symbol is isotropic, so the potential has no 1/r^3 term.''']

POWERS = {n: None for n in range(2, 7)}


def power(n, x):
    """x^n as nested multiplies."""
    e = read(x)
    for _ in range(n - 1):
        e = call('multiply', read(x), e)
    return e


for n in range(2, 7):
    out.append(f'''task power-{n}
  take x, like integer
  like integer
  send back
{ind(power(n, 'x'), 4)}''')

SIGNS = [(1, 1), (1, -1), (-1, 1), (-1, -1)]


def signed(x, y, sx, sy):
    a = read(x) if sx == 1 else call('subtract', code(0), read(x))
    b = read(y) if sy == 1 else call('subtract', code(0), read(y))
    return call('add', a, b)


for n in range(2, 7):
    terms = [call(f'power-{n}', signed('x', 'y', sx, sy)) for sx, sy in SIGNS]
    acc = terms[0]
    for t in terms[1:]:
        acc = call('add', acc, t)
    out.append(f'''# The four roots +-e_i +-e_j of one pair of axes, x = k_i, y = k_j: sum of (+-x +-y)^{n}.
task pair-moment-{n}
  take x, like integer
  take y, like integer
  like integer
  send back
{ind(acc, 4)}''')

PAIRS = [('k1', 'k2'), ('k1', 'k3'), ('k1', 'k4'), ('k2', 'k3'), ('k2', 'k4'), ('k3', 'k4')]
K4 = [f'  take {k}, like integer' for k in ('k1', 'k2', 'k3', 'k4')]
for n in range(2, 7):
    terms = [call(f'pair-moment-{n}', read(a), read(b)) for a, b in PAIRS]
    acc = terms[0]
    for t in terms[1:]:
        acc = call('add', acc, t)
    out.append(f'''# sum over all 24 roots of (k . r)^{n}.
task root-moment-{n}
''' + '\n'.join(K4) + f'''
  like integer
  send back
{ind(acc, 4)}''')

# frame {12|34}
for n in (2, 4):
    acc = call('add', call(f'pair-moment-{n}', read('k1'), read('k2')), call(f'pair-moment-{n}', read('k3'), read('k4')))
    out.append(f'''# sum over the 8 roots of the frame {{12|34}} of (k . r)^{n}.
task frame-moment-{n}
''' + '\n'.join(K4) + f'''
  like integer
  send back
{ind(acc, 4)}''')

out.append('''task norm-squared
  take k1, like integer
  take k2, like integer
  take k3, like integer
  take k4, like integer
  like integer
  send back
    call add
      call add
        call power-2
          read k1
        call power-2
          read k2
      call add
        call power-2
          read k3
        call power-2
          read k4''')

KS = [read(k) for k in ('k1', 'k2', 'k3', 'k4')]
NORM = call('norm-squared', *KS)


def rule(name, lhs, rhs, marks=('k1', 'k2', 'k3', 'k4'), comment=None):
    head = [comment] if comment else []
    body = [f'rule {name}'] + [f'  mark {m}, like integer' for m in marks] + [
        '  show hold', '    call is-equal', ind(lhs, 6), ind(rhs, 6)]
    return '\n'.join(head + body)


out.append(rule('the-second-moment-of-the-roots-is-isotropic', call('root-moment-2', *KS),
                call('multiply', code(12), NORM),
                comment='# THE SECOND MOMENT IS ISOTROPIC: sum (k . r)^2 = 12 |k|^2.'))
out.append(rule('the-fourth-moment-of-the-roots-is-isotropic', call('root-moment-4', *KS),
                call('multiply', code(12), call('multiply', NORM, NORM)),
                comment='# THE FOURTH MOMENT IS ISOTROPIC: sum (k . r)^4 = 12 |k|^4. With the vanishing odd moments, a 5-design.'))
out.append(rule('the-third-moment-of-the-roots-vanishes', call('root-moment-3', *KS), code(0),
                comment='# THE ODD MOMENTS VANISH (the roots come in opposite pairs).'))
out.append(rule('the-fifth-moment-of-the-roots-vanishes', call('root-moment-5', *KS), code(0)))
out.append(rule('the-sixth-moment-along-an-axis-is-twelve', call('root-moment-6', code(1), code(0), code(0), code(0)),
                code(12), marks=(),
                comment='# NOT A 6-DESIGN: along e1 the sixth moment is 12 |k|^6, along e1 + e2 it is 144 = 18 |k|^6.'))
out.append(rule('the-sixth-moment-along-a-root-is-one-hundred-forty-four',
                call('root-moment-6', code(1), code(1), code(0), code(0)), code(144), marks=()))
out.append(rule('one-frame-has-an-isotropic-second-moment', call('frame-moment-2', *KS),
                call('multiply', code(4), NORM),
                comment='# ONE FRAME IS ONLY A 3-DESIGN: its second moment is 4 |k|^2, but its fourth is 4 along e1 and 32 = 8 |k|^4\n# along e1 + e2.'))
out.append(rule('one-frame-has-fourth-moment-four-along-an-axis',
                call('frame-moment-4', code(1), code(0), code(0), code(0)), code(4), marks=()))
out.append(rule('one-frame-has-fourth-moment-thirty-two-along-a-root',
                call('frame-moment-4', code(1), code(1), code(0), code(0)), code(32), marks=()))

# husk: 3 axes weight 2, 6 face diagonals weight 1 (= pair-moment over two signs, i.e. half of pair-moment)
for n in (2, 4, 6):
    axes = call('multiply', code(2), call('add', call('add', call(f'power-{n}', read('k1')), call(f'power-{n}', read('k2'))),
                                         call(f'power-{n}', read('k3'))))
    diag = []
    for a, b in (('k1', 'k2'), ('k1', 'k3'), ('k2', 'k3')):
        diag.append(call('add', call(f'power-{n}', call('add', read(a), read(b))),
                         call(f'power-{n}', call('subtract', read(a), read(b)))))
    acc = call('add', axes, call('add', call('add', diag[0], diag[1]), diag[2]))
    out.append(f'''# sum over the husk's 9 weighted directions of g (k . u)^{n}.
task husk-moment-{n}
  take k1, like integer
  take k2, like integer
  take k3, like integer
  like integer
  send back
{ind(acc, 4)}''')

K3 = [read(k) for k in ('k1', 'k2', 'k3')]


def psum(n):
    return call('add', call('add', call(f'power-{n}', read('k1')), call(f'power-{n}', read('k2'))),
                call(f'power-{n}', read('k3')))


out.append(rule('the-husk-second-moment-is-six-k-squared', call('husk-moment-2', *K3),
                call('multiply', code(6), psum(2)), marks=('k1', 'k2', 'k3'),
                comment='# THE HUSK: sum g (k . u)^2 = 6 |k|^2, the coefficient that sets the potential 1/(24 pi r).'))
out.append(rule('the-husk-fourth-moment-is-isotropic', call('husk-moment-4', *K3),
                call('multiply', code(6), call('multiply', psum(2), psum(2))), marks=('k1', 'k2', 'k3'),
                comment='# sum g (k . u)^4 = 6 |k|^4: the quartic correction is isotropic, so no 1/r^3 term.'))
out.append(rule('the-husk-sixth-moment', call('husk-moment-6', *K3),
                call('subtract', call('multiply', code(30), call('multiply', psum(4), psum(2))),
                     call('multiply', code(24), psum(6))), marks=('k1', 'k2', 'k3'),
                comment='# sum g (k . u)^6 = 30 p4 p2 - 24 p6: the first anisotropic term, the 1/r^5 correction.'))

print('\n\n'.join(out) + '\n')
