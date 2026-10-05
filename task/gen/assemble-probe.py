import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Write tmp/assemble-probe.tree: cosh's addition up to the error of E's, the cosh rule with that error, and the FTC with
a per-step tolerance."""
import sys

sys.path.insert(0, GEN)
from calculus import have, rule  # noqa: E402

addition = rule('probe-cosh-addition-up-to-the-error-of-e', '\n# probe', [], 'ex ew es rs pp q dd delta', [
    have('dd-is-the-error-of-e', '', 'dd == ex * ew - es'),
    have('the-reciprocal-difference', '', 'rs - pp == q * dd'),
    have('the-error-scaled', '', 'q * dd <= delta && 0 - q * dd <= delta'),
    have('the-error-is-small', '', 'dd <= delta && 0 - dd <= delta'),
], '(es + rs) - (ex * ew + pp) <= 2 * delta && (ex * ew + pp) - (es + rs) <= 2 * delta')

cosh_rule = rule('probe-cosh-has-derivative-sinh-up-to-an-error', '\n# probe', [], 'cx sx cw sw cs w big delta', [
    have('the-addition-up-to-delta', '', 'cs - (cx * cw + sx * sw) <= delta && (cx * cw + sx * sw) - cs <= delta'),
    have('cosh-near-zero', '', 'cw - 1 >= 0 && cw - 1 <= w * w'),
    have('sinh-near-zero', '', 'sw - w >= 0 && sw - w <= w * w * w'),
    have('the-step-is-small', '', 'w >= 0 && w <= 1'),
    have('cosh-is-bounded-here', '', 'cx >= 0 && cx <= big'),
    have('sinh-is-bounded-here', '', 'sx >= 0 && sx <= big'),
    have('the-bound-is-not-negative', '', 'big >= 0'),
], 'cs - cx - sx * w <= big * w * w + big * w * w * w + delta && cs - cx - sx * w >= 0 - delta')

ftc = rule('probe-the-riemann-sums-with-a-tolerance', '\n# probe', [('bigf', 1), ('f', 1), ('pt', 1), ('sum', 1)], 'n w tol', [
    have('bigf-steps-like-f', 'i',
         'i < 0 || bigf(pt(i + 1)) - bigf(pt(i)) - f(pt(i)) * w <= tol && f(pt(i)) * w - (bigf(pt(i + 1)) - bigf(pt(i))) <= tol'),
    have('the-riemann-sum-starts-at-zero', '', 'sum(0) == 0'),
    have('the-riemann-sum-adds-a-strip', 'i', 'i < 0 || sum(i + 1) == sum(i) + f(pt(i)) * w'),
    have('the-tolerance-is-not-negative', '', 'tol >= 0'),
    have('n-is-a-count', '', 'n >= 0'),
], 'sum(n) - (bigf(pt(n)) - bigf(pt(0))) <= n * tol && bigf(pt(n)) - bigf(pt(0)) - sum(n) <= n * tol', 'n')

open(_os.path.join(SEED, 'tmp/assemble-probe.tree'), 'w').write(
    '\n\n'.join([addition, cosh_rule, ftc]) + '\n')
print('written')
