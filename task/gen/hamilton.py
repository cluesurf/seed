import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate the Hamilton-product section of code/vibe/hurwitz.tree."""
import sys
sys.path.insert(0, GEN)
from tree import call, read, code, num, hamilton, rule, ind

COORDS = ('real', 'i', 'j', 'k')
out = []

out.append('''# THE HAMILTON PRODUCT over the integers, coordinate by coordinate, for (a0 + a1 i + a2 j + a3 k)(b0 + b1 i + b2 j + b3 k).
# The relations below use doubled coordinates, so 2 w = -1 + i + j + k is an integer quaternion.''')

FORMULAS = {
    'real': [('+', 'a0', 'b0'), ('-', 'a1', 'b1'), ('-', 'a2', 'b2'), ('-', 'a3', 'b3')],
    'i': [('+', 'a0', 'b1'), ('+', 'a1', 'b0'), ('+', 'a2', 'b3'), ('-', 'a3', 'b2')],
    'j': [('+', 'a0', 'b2'), ('-', 'a1', 'b3'), ('+', 'a2', 'b0'), ('+', 'a3', 'b1')],
    'k': [('+', 'a0', 'b3'), ('+', 'a1', 'b2'), ('-', 'a2', 'b1'), ('+', 'a3', 'b0')],
}


def sum_of(terms):
    """Fold signed products left to right with add / subtract."""
    sign, x, y = terms[0]
    acc = call('multiply', read(x), read(y))
    for sign, x, y in terms[1:]:
        acc = call('add' if sign == '+' else 'subtract', acc, call('multiply', read(x), read(y)))
    return acc


for c in COORDS:
    body = [f'task hamilton-{c}']
    for v in ('a0', 'a1', 'a2', 'a3', 'b0', 'b1', 'b2', 'b3'):
        body.append(f'  take {v}, like integer')
    body.append('  like integer')
    body.append('  send back')
    body.append(ind(sum_of(FORMULAS[c]), 4))
    out.append('\n'.join(body))

out.append('''task quaternion-norm
  take a0, like integer
  take a1, like integer
  take a2, like integer
  take a3, like integer
  like integer
  send back
    call add
      call add
        call multiply
          read a0
          read a0
        call multiply
          read a1
          read a1
      call add
        call multiply
          read a2
          read a2
        call multiply
          read a3
          read a3''')

A = [read(f'a{n}') for n in range(4)]
B = [read(f'b{n}') for n in range(4)]
C = [read(f'c{n}') for n in range(4)]
marks = [f'{x}{n}' for x in 'abc' for n in range(4)]

out.append('# THE HAMILTON PRODUCT IS ASSOCIATIVE, for all integer quaternions, coordinate by coordinate.')
ab = hamilton(A, B)
bc = hamilton(B, C)
left = hamilton(ab, C)
right = hamilton(A, bc)
for n, c in enumerate(COORDS):
    out.append(rule(f'the-hamilton-product-is-associative-{c}', left[n], right[n], marks))

out.append('# THE NORM IS MULTIPLICATIVE (Euler\'s four-square identity), so a product of unit quaternions is a unit.')
out.append(rule('the-quaternion-norm-is-multiplicative', call('quaternion-norm', *hamilton(A, B)),
                call('multiply', call('quaternion-norm', *A), call('quaternion-norm', *B)),
                [f'{x}{n}' for x in 'ab' for n in range(4)]))

# relations, doubled coordinates
ONE = (1, 0, 0, 0)
I = (0, 1, 0, 0)
J = (0, 0, 1, 0)
K = (0, 0, 0, 1)
W = (-1, 1, 1, 1)
WI = (-1, -1, -1, -1)


def q(t):
    return [code(x) for x in t]


def check(name, product, expected, comment=None):
    if comment:
        out.append(comment)
    for n, c in enumerate(COORDS):
        out.append(rule(f'{name}-{c}', product[n], code(expected[n])))


check('i-times-i-is-minus-one', hamilton(q(I), q(I)), (-1, 0, 0, 0),
      '# THE DEFINING RELATIONS OF Q8 in the quaternions: i i = -1, i j = k, j k = i, k i = j.')
check('i-times-j-is-k', hamilton(q(I), q(J)), K)
check('j-times-k-is-i', hamilton(q(J), q(K)), I)
check('k-times-i-is-j', hamilton(q(K), q(I)), J)
check('omega-has-order-three', hamilton(hamilton(q(W), q(W)), q(W)), (8, 0, 0, 0),
      '# w^3 = 1: (2w)^3 = 8. And 2w (2w^-1) = 4 with 2w^-1 = -1 - i - j - k.')
check('omega-times-its-inverse', hamilton(q(W), q(WI)), (4, 0, 0, 0))
check('omega-turns-i-to-k', hamilton(hamilton(q(W), q(I)), q(WI)), (0, 0, 0, 4),
      '# THE TURN IS CONJUGATION BY w: w i w^-1 = k, w j w^-1 = i, w k w^-1 = j (times 4 in doubled coordinates).')
check('omega-turns-j-to-i', hamilton(hamilton(q(W), q(J)), q(WI)), (0, 4, 0, 0))
check('omega-turns-k-to-j', hamilton(hamilton(q(W), q(K)), q(WI)), (0, 0, 4, 0))

print('\n\n'.join(out))
