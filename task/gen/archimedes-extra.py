import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Append the coordinate Archimedean property and the line isometry to archimedes.tree, and their controls."""
import sys

sys.path.insert(0, GEN)
from order import parse  # noqa: E402
from tree import call, ind  # noqa: E402

ROOT = SEED
MARKER = '# ---- the coordinates ----'


def B(a, b):
    return f'({a[0]}) * ({b[0]}) - ({a[1]}) * ({b[1]}) - ({a[2]}) * ({b[2]})'


u = ['u0', 'u1', 'u2']
v = ['v0', 'v1', 'v2']
xs = [f'ca * {u[i]} + sa * {v[i]}' for i in range(3)]
xt = [f'cb * {u[i]} + sb * {v[i]}' for i in range(3)]


def identity(name, comment, marks, left, right):
    out = [comment.rstrip(), f'rule {name}']
    for m in marks.split():
        out.append(f'  mark {m}, like integer')
    out.append('  show hold')
    out.append(ind(call('is-equal', parse(left), parse(right)), 4))
    return '\n'.join(out)


def archimedean(name, comment, witness):
    return f'''{comment.rstrip()}
rule {name}
  mark aa, like integer
  mark cc, like integer
  have aa-is-positive
    call is-minimum
      read aa
      code 1
  find n, like integer
{ind(parse(witness), 4)}
  show hold
    call is-above
      call multiply
        read n
        read aa
      read cc'''


LINE = 'u0 u1 u2 v0 v1 v2 ca sa cb sb'
isometry = lambda rhs_tail: identity(
    'the-line-is-an-isometric-copy-of-its-parameter' if not rhs_tail.startswith('BAD') else 'control-the-line-with-a-wrong-sign',
    '', LINE, f'{B(xs, xt)} - (ca * cb - sa * sb)', rhs_tail.replace('BAD', ''))

GOOD = f'ca * cb * ({B(u, u)} - 1) + (ca * sb + sa * cb) * ({B(u, v)}) + sa * sb * ({B(v, v)} + 1)'
WRONG = f'BADca * cb * ({B(u, u)} - 1) + (ca * sb - sa * cb) * ({B(u, v)}) + sa * sb * ({B(v, v)} + 1)'

EXTRA = f'''
{MARKER}

{archimedean('the-coordinates-are-archimedean', """# THE ARCHIMEDEAN PROPERTY OF THE COORDINATES, for the integers and so for the rationals: for every A >= 1 and every
# C some n has n A > C (the witness is n = C^2 + 1, since C^2 - C + 1 > 0, written aa and cc below). For rationals x = a / b > 0 and
# y = c / d, n x > y is n (a d) > c b, this statement at A = a d and C = c b. With the growth rule above it completes
# Archimedes' axiom for the model over the rationals: some 2^k-fold of any segment passes any distance.""", 'cc * cc + 1')}

{isometry(GOOD).replace('rule the-line', """# DEDEKIND CONTINUITY reduces to the coordinates. The line through u with unit tangent v is
# x(t) = cosh(t) u + sinh(t) v, and B(x(s), x(t)) = cosh s cosh t - sinh s sinh t = cosh(s - t): the distance between
# two of its points is the difference of their parameters. So the line, with its betweenness, is an isometric copy of
# the parameter field, a cut of the line is a cut of the field, and Dedekind's axiom for the plane is exactly the
# completeness of the coordinates. (Proved as a certificate in the hypotheses B(u, u) = 1, B(v, v) = -1,
# B(u, v) = 0. Completeness itself holds for the reals and fails for the rationals, and is K4 in
# note/term/port/kernel-prerequisites.md.)
rule the-line""", 1)}
'''

CONTROLS = f'''
{archimedean('control-the-witness-c-alone', '# false: n = C fails at C = 1, A = 1', 'cc')}

{isometry(WRONG).replace('rule control', '# false: a minus sign in the B(u, v) term' + chr(10) + 'rule control', 1)}
'''


def main():
    path = f'{ROOT}/code/space/hyperbolic/archimedes.tree'
    text = open(path).read()
    if MARKER in text:
        text = text[:text.index(MARKER)].rstrip() + '\n'
    open(path, 'w').write(text.rstrip() + '\n' + EXTRA)
    # the archimedes controls fail by kernel errors, which hide a file's unproven holds, so these two (refused as
    # unproven holds) live in a file of their own
    cpath = f'{ROOT}/test/case/hyperbolic/archimedes-control.tree'
    ctext = open(cpath).read()
    cut = '\n# false: n = C fails'
    if cut in ctext:
        ctext = ctext[:ctext.index(cut)]
    ctext = ctext.replace('Expected: 7.', 'Expected: 5.')
    open(cpath, 'w').write(ctext.rstrip() + '\n')
    head = ('# NEGATIVE CONTROLS for the coordinate rules of space/hyperbolic/archimedes: each must be REFUSED. Expected: 2.\n'
            '# Run: sh deck/term/deck/seed.tree/tmp/check-continuity-control.sh\n')
    open(f'{ROOT}/test/case/hyperbolic/continuity-control.tree', 'w').write(head + CONTROLS)
    print('written')


main()
