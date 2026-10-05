import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/number/completeness.tree: the Cauchy completeness of the reals, as regular sequences of rationals with
a modulus, proved by instantiating universal hypotheses. Also its negative controls."""

import re
import sys

sys.path.insert(0, GEN)
from tree import call, code, ind, read  # noqa: E402

ROOT = SEED
TOKEN = re.compile(r'\s*(\d+|[a-z][a-z0-9]*|[-+*(),])')


def expr(text):
    """+ - * over integers, names, and calls name(a, b), into Term."""
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
            e = sum_()
            assert take() == ')'
            return e
        if t == '-':
            return call('subtract', code(0), atom())
        if t.isdigit():
            return code(int(t))
        if peek() == '(':
            take()
            args = [sum_()]
            while peek() == ',':
                take()
                args.append(sum_())
            assert take() == ')'
            return call(t, *args)
        return read(t)

    def product():
        e = atom()
        while peek() == '*':
            take()
            e = call('multiply', e, atom())
        return e

    def sum_():
        e = product()
        while peek() in ('+', '-'):
            op = take()
            e = call('add' if op == '+' else 'subtract', e, product())
        return e

    e = sum_()
    assert at[0] == len(tokens), text
    return e


COMPARE = {'>=': 'is-minimum', '<=': 'is-maximum', '>': 'is-above', '<': 'is-below', '==': 'is-equal'}


def prop(text):
    """`A || B`, then `A && B`, then a comparison."""
    if '||' in text:
        return '\n'.join(['meet or'] + [ind(prop(p.strip()), 2) for p in text.split('||')])
    if '&&' in text:
        return '\n'.join(['meet and'] + [ind(prop(p.strip()), 2) for p in text.split('&&')])
    for op in ('>=', '<=', '==', '>', '<'):
        if op in text:
            left, right = text.split(op)
            return call(COMPARE[op], expr(left.strip()), expr(right.strip()))
    raise ValueError(text)


FUNCTIONS = '''  mark x
    like task
      take k, like integer
      take p, like integer
      like integer
  mark e
    like task
      take t, like integer
      like integer'''


def have(name, binders, text):
    lines = [f'  have {name}']
    for b in binders.split():
        lines.append(f'    mark {b}, like integer')
    lines.append(ind(prop(text), 4))
    return '\n'.join(lines)


MODULUS = [
    have('the-modulus-is-positive', 't', 't < 1 || e(t) > 0'),
    have('the-modulus-quarters', 't', 't < 1 || 4 * e(4 * t) == e(t)'),
]
REGULAR = have('each-is-a-real', 'k p q',
               'k < 1 || p < 1 || q < 1 || x(k, p) - x(k, q) <= e(p) + e(q) && x(k, q) - x(k, p) <= e(p) + e(q)')
CAUCHY = have('they-are-a-cauchy-sequence', 'k j p',
              'k < 1 || j < 1 || p < 1 || x(k, p) - x(j, p) <= e(k) + e(j) + 2 * e(p) && x(j, p) - x(k, p) <= e(k) + e(j) + 2 * e(p)')


def rule(name, comment, hyps, marks, plain, goal):
    out = [comment.rstrip(), f'rule {name}', FUNCTIONS]
    for m in marks.split():
        out.append(f'  mark {m}, like integer')
    out.extend(hyps)
    for label, text in plain:
        out.append(f'  have {label}')
        out.append(ind(prop(text), 4))
    out.append('  show hold')
    out.append(ind(prop(goal), 4))
    return '\n'.join(out)


HEADER = '''# THE COMPLETENESS OF THE REAL NUMBERS, in Cauchy's form: a Cauchy sequence of reals converges to a real.
#
# A REAL is a regular sequence of rationals, Bishop's construction: x(p) for p = 1, 2, 3, ... with
#   |x(p) - x(q)| <= e(p) + e(q)   for all p, q >= 1,
# where e is the MODULUS: e(t) > 0 and 4 e(4 t) = e(t). The usual modulus is e(t) = 1 / t, which has both properties,
# and the theorems below hold for every modulus that does, so for that one. Two reals x, y are EQUAL when
# |x(p) - y(p)| <= 2 e(p) for every p, and |x - y| <= c as reals when |x(p) - y(p)| <= c + 2 e(p) for every p.
#
# A SEQUENCE OF REALS is x(k, p): the k-th real's p-th approximation. It is CAUCHY when
#   |x(k, p) - x(j, p)| <= e(k) + e(j) + 2 e(p)   for all k, j, p >= 1,
# which says |x_k - x_j| <= e(k) + e(j) as reals. Its LIMIT is the diagonal L(p) = x(4 p, 4 p), and the theorems are
#   THE LIMIT IS A REAL       |L(m) - L(n)| <= e(m) + e(n): L is itself a regular sequence;
#   THE SEQUENCE CONVERGES    |x(k, p) - L(p)| <= e(k) + 2 e(p): |x_k - L| <= e(k) as reals, which tends to 0.
#
# Each is a chain of triangle inequalities, and the proof is the prover INSTANTIATING the universal hypotheses
# (`have ... / mark k, like integer / ...`, each true for every value of its marks) at the terms the goal names, then
# a linear combination of the instances over an ordered field (check/product.ts, no integer rounding), so it holds
# whatever field the approximations are drawn from. x and e are quantified functions: the theorems hold for every
# sequence and every modulus satisfying the hypotheses.
#
# With the Archimedean property (space/hyperbolic/archimedes), Cauchy completeness is the completeness of an ordered
# field, and it is what Dedekind's axiom of the hyperbolic plane reduces to (archimedes.tree: the line is an isometric
# copy of its coordinates). The rationals fail it: a sequence whose limit is not rational has no limit there, which is
# why a real is a sequence and not a rational.
'''

RULES = [
    rule('the-limit-is-a-real', '''
# THE LIMIT IS A REAL: L(m) = x(4m, 4m) and L(n) = x(4n, 4n) differ by at most e(m) + e(n). Through x(4n, 4m):
# |x(4m, 4m) - x(4n, 4m)| <= 3 e(4m) + e(4n) (Cauchy at p = 4m) and |x(4n, 4m) - x(4n, 4n)| <= e(4m) + e(4n)
# (the 4n-th real is regular), summing to 4 e(4m) + 2 e(4n) = e(m) + e(n) / 2.''',
         MODULUS + [REGULAR, CAUCHY], 'm n', [('m-is-an-index', 'm >= 1'), ('n-is-an-index', 'n >= 1')],
         'x(4 * m, 4 * m) - x(4 * n, 4 * n) <= e(m) + e(n) && x(4 * n, 4 * n) - x(4 * m, 4 * m) <= e(m) + e(n)'),
    rule('the-sequence-converges-to-its-limit', '''
# THE SEQUENCE CONVERGES: the k-th real is within e(k) of the limit. Through x(k, 4p):
# |x(k, p) - x(k, 4p)| <= e(p) + e(4p) (regular) and |x(k, 4p) - x(4p, 4p)| <= e(k) + 3 e(4p) (Cauchy), summing to
# e(k) + e(p) + 4 e(4p) = e(k) + 2 e(p).''',
         MODULUS + [REGULAR, CAUCHY], 'k p', [('k-is-an-index', 'k >= 1'), ('p-is-an-index', 'p >= 1')],
         'x(k, p) - x(4 * p, 4 * p) <= e(k) + 2 * e(p) && x(4 * p, 4 * p) - x(k, p) <= e(k) + 2 * e(p)'),
]

CONTROLS = [
    rule('control-a-tighter-limit', '\n# false: half the modulus is not enough', MODULUS + [REGULAR, CAUCHY], 'm n',
         [('m-is-an-index', 'm >= 1'), ('n-is-an-index', 'n >= 1')],
         'x(4 * m, 4 * m) - x(4 * n, 4 * n) <= e(m)'),
    rule('control-without-cauchy', '\n# false: without the Cauchy hypothesis the diagonal is not a real', MODULUS + [REGULAR], 'm n',
         [('m-is-an-index', 'm >= 1'), ('n-is-an-index', 'n >= 1')],
         'x(4 * m, 4 * m) - x(4 * n, 4 * n) <= e(m) + e(n)'),
    rule('control-a-tighter-convergence', '\n# false: e(k) + e(p) is not enough', MODULUS + [REGULAR, CAUCHY], 'k p',
         [('k-is-an-index', 'k >= 1'), ('p-is-an-index', 'p >= 1')],
         'x(k, p) - x(4 * p, 4 * p) <= e(k) + e(p)'),
]


def main():
    open(f'{ROOT}/code/number/completeness.tree', 'w').write(HEADER + '\n' + '\n\n'.join(RULES) + '\n')
    head = '# NEGATIVE CONTROLS for number/completeness: each must be REFUSED. Expected: 3.\n'
    open(f'{ROOT}/test/case/number/completeness-control.tree', 'w').write(head + '\n\n'.join(CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls')


if __name__ == '__main__':
    main()
