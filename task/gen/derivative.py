import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate code/integral/derivative.tree: the product, reciprocal and chain rules for increments with explicit
errors, the calculus the polar angle and the turning angle along a geodesic are differentiated with. Also controls."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

ROOT = SEED


def within(x, e):
    return f'{x} <= {e} && 0 - ({x}) <= {e}'


HEADER = '''# THE RULES OF DIFFERENTIATION, for increments with explicit errors. A quantity a with derivative a' moves over a
# step h by da, and da - a' h is within an error ea. Each rule below states how the errors combine, as a polynomial
# inequality the product prover decides, so a derivative computed with these rules carries its own bound.
#
#   THE PRODUCT RULE      d(a b) - (a' b + a b') h is within M eb + M ea + DA DB, for |a|, |b| <= M and |da| <= DA,
#                         |db| <= DB: the exact identity d(a b) = a db + b da + da db;
#   THE RECIPROCAL RULE   for c, c + dc >= 1 and q = 1/c, q2 = 1/(c + dc): d(1/c) + c' h / c^2 is within
#                         ec + |c'| h DC, from c^2 (c + dc) (q2 - q + c' h q^2) = -(dc - c' h) c + c' h dc;
#   THE CHAIN RULE        an increment of the angle at z, within (2 z + dz) dz^2 of f(z) dz (integral/angle), with dz
#                         within ez of z' h, is within ez + (2 Z + DZ) DZ^2 of f(z) z' h, as 0 < f <= 1.
#
# Every certificate is the product prover's, replayed (check/product.ts), over an ordered field.
'''

RULES = [
    rule('the-product-rule', '''
# THE PRODUCT RULE.''', [], 'a b da db ad bd h ea eb m ba bb', [
        have('da-follows-the-derivative', '', within('da - ad * h', 'ea')),
        have('db-follows-the-derivative', '', within('db - bd * h', 'eb')),
        have('a-is-bounded', '', within('a', 'm')),
        have('b-is-bounded', '', within('b', 'm')),
        have('da-is-bounded', '', within('da', 'ba')),
        have('db-is-bounded', '', within('db', 'bb')),
    ], within('(a + da) * (b + db) - a * b - (ad * b + a * bd) * h', 'm * eb + m * ea + ba * bb')),
    rule('the-reciprocal-identity', '''
# THE RECIPROCAL RULE, first as an identity: c^2 (c + dc) (q2 - q + c' h q^2) = -(dc - c' h) c + c' h dc.''', [],
         'c dc cd h q q2', [
             have('q-inverts', '', 'q * c == 1'),
             have('q2-inverts', '', 'q2 * (c + dc) == 1'),
         ], 'c * c * (c + dc) * (q2 - q + cd * h * q * q) == 0 - (dc - cd * h) * c + cd * h * dc'),
    rule('the-reciprocal-numerator-is-small', '''
# then as a bound. The right side nn is within c ec + bc, for |dc - c' h| <= ec and |c' h dc| <= bc.''', [],
         'c dc cd h ec bc nn', [
             have('nn-is-the-numerator', '', 'nn == 0 - (dc - cd * h) * c + cd * h * dc'),
             have('dc-follows-the-derivative', '', within('dc - cd * h', 'ec')),
             have('cd-h-dc-is-bounded', '', within('cd * h * dc', 'bc')),
             have('c-is-at-least-one', '', 'c >= 1'),
         ], within('nn', 'c * ec + bc')),
    rule('the-reciprocal-denominator-is-at-least-c', '''
# The left side's factor kk = c^2 (c + dc), named m e with m = c^2 and e = c + dc >= 1, is at least c.''', [],
         'c m e kk', [
             have('kk-is-the-denominator', '', 'kk == m * e'),
             have('m-is-c-squared', '', 'm == c * c'),
             have('c-is-at-least-one', '', 'c >= 1'),
             have('e-is-at-least-one', '', 'e >= 1'),
         ], 'kk >= c'),
    rule('the-reciprocal-rule', '''
# So kk dd = nn with kk >= c >= 1 puts dd = d(1/c) + c' h / c^2 within ec + bc.''', [], 'c kk dd nn ec bc', [
        have('the-reciprocal-identity', '', 'kk * dd == nn'),
        have('nn-is-small', '', within('nn', 'c * ec + bc')),
        have('kk-is-at-least-c', '', 'kk >= c'),
        have('c-is-at-least-one', '', 'c >= 1'),
        have('the-errors-are-not-negative', '', 'ec >= 0 && bc >= 0'),
    ], within('dd', 'ec + bc')),
    rule('the-chain-rule-through-the-angle', '''
# THE CHAIN RULE through the angle: dth within (2 z + dz) dz^2 of f dz, dz within ez of z' h.''', [],
         'f z dz zd h ez dth bz bdz', [
             have('the-angle-increment', '', within('dth - f * dz', '(2 * bz + bdz) * bdz * bdz')),
             have('dz-follows-the-derivative', '', within('dz - zd * h', 'ez')),
             have('f-is-in-the-unit-interval', '', 'f > 0 && f <= 1'),
         ], within('dth - f * zd * h', 'ez + (2 * bz + bdz) * bdz * bdz')),
]

CONTROLS = [
    rule('control-the-product-rule-without-the-cross-term', '\n# false: d(a b) carries da db', [],
         'a b da db ad bd h ea eb m ba bb', [
             have('da-follows-the-derivative', '', within('da - ad * h', 'ea')),
             have('db-follows-the-derivative', '', within('db - bd * h', 'eb')),
             have('a-is-bounded', '', within('a', 'm')),
             have('b-is-bounded', '', within('b', 'm')),
             have('da-is-bounded', '', within('da', 'ba')),
             have('db-is-bounded', '', within('db', 'bb')),
         ], within('(a + da) * (b + db) - a * b - (ad * b + a * bd) * h', 'm * eb + m * ea')),
    rule('control-the-reciprocal-identity-with-the-wrong-sign', '\n# false: the derivative of 1/c is -c\'/c^2', [],
         'c dc cd h q q2', [
             have('q-inverts', '', 'q * c == 1'),
             have('q2-inverts', '', 'q2 * (c + dc) == 1'),
         ], 'c * c * (c + dc) * (q2 - q - cd * h * q * q) == 0 - (dc - cd * h) * c + cd * h * dc'),
    rule('control-the-chain-rule-without-the-derivative-error', '\n# false: the error of dz passes through', [],
         'f z dz zd h ez dth bz bdz', [
             have('the-angle-increment', '', within('dth - f * dz', '(2 * bz + bdz) * bdz * bdz')),
             have('dz-follows-the-derivative', '', within('dz - zd * h', 'ez')),
             have('f-is-in-the-unit-interval', '', 'f > 0 && f <= 1'),
         ], within('dth - f * zd * h', '(2 * bz + bdz) * bdz * bdz')),
]


def main():
    open(f'{ROOT}/code/integral/derivative.tree', 'w').write(HEADER + '\n' + '\n\n'.join(RULES) + '\n')
    head = '# NEGATIVE CONTROLS for integral/derivative: each must be REFUSED. Expected: 3.\n'
    open(f'{ROOT}/control/number/derivative-control.tree', 'w').write(head + '\n\n'.join(CONTROLS) + '\n')
    print(len(RULES), 'rules', len(CONTROLS), 'controls')


if __name__ == '__main__':
    main()
