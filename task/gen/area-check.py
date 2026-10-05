import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Oracle for area.tree: check every certificate identity with sympy before it is written as a rule."""
from collections import Counter


class P:
    """An exact polynomial over the integers: a map from a sorted tuple of variable names to a coefficient."""

    def __init__(self, terms=None):
        self.t = {k: c for k, c in (terms or {}).items() if c}

    @staticmethod
    def var(name):
        return P({(name,): 1})

    @staticmethod
    def lift(x):
        return x if isinstance(x, P) else P({(): x})

    def __add__(self, o):
        o = P.lift(o)
        out = Counter(self.t)
        out.update(o.t)
        return P(dict(out))

    __radd__ = __add__

    def __neg__(self):
        return P({k: -c for k, c in self.t.items()})

    def __sub__(self, o):
        return self + (-P.lift(o))

    def __rsub__(self, o):
        return P.lift(o) - self

    def __mul__(self, o):
        o = P.lift(o)
        out = Counter()
        for a, ca in self.t.items():
            for b, cb in o.t.items():
                out[tuple(sorted(a + b))] += ca * cb
        return P(dict(out))

    __rmul__ = __mul__

    def __pow__(self, n):
        out = P({(): 1})
        for _ in range(n):
            out = out * self
        return out

    def diff(self, name):
        out = Counter()
        for k, c in self.t.items():
            n = k.count(name)
            if n:
                rest = list(k)
                rest.remove(name)
                out[tuple(rest)] += c * n
        return P(dict(out))

    def zero(self):
        return not self.t


class sp:
    @staticmethod
    def symbols(names):
        parts = [P.var(n) for n in names.split()]
        return parts if len(parts) > 1 else parts[0]

    @staticmethod
    def diff(e, x):
        name = next(iter(x.t))[0]
        return P.lift(e).diff(name)

    @staticmethod
    def expand(e):
        return 0 if P.lift(e).zero() else e


c, s = sp.symbols('c s')
u = sp.symbols('u0 u1 u2')
v = sp.symbols('v0 v1 v2')
B = lambda a, b: a[0] * b[0] - a[1] * b[1] - a[2] * b[2]
x = [c * u[i] + s * v[i] for i in range(3)]
d = [s * u[i] + c * v[i] for i in range(3)]
Buu, Bvv, Buv = B(u, u), B(v, v), B(u, v)
pair = c * c - s * s - 1

checks = {
    'on the hyperboloid': B(x, x) - 1 - (c**2 * (Buu - 1) + 2 * c * s * Buv + s**2 * (Bvv + 1) + pair),
    'unit velocity': B(d, d) + 1 - (s**2 * (Buu - 1) + 2 * c * s * Buv + c**2 * (Bvv + 1) - pair),
    'tangent velocity': B(x, d) - (c * s * (Buu - 1) + (c**2 + s**2) * Buv + c * s * (Bvv + 1)),
    # the derivation D c = s, D s = c sends x to d and d to x
    'D x is d': sum((sp.diff(x[i], c) * s + sp.diff(x[i], s) * c - d[i]) ** 2 for i in range(3)),
    'D d is x': sum((sp.diff(d[i], c) * s + sp.diff(d[i], s) * c - x[i]) ** 2 for i in range(3)),
}

N = x[1] * d[2] - x[2] * d[1]
DN = (d[1] * d[2] + x[1] * x[2]) - (d[2] * d[1] + x[2] * x[1])
checks['angular momentum constant (product rule)'] = DN
checks['DN by the derivation'] = sp.diff(N, c) * s + sp.diff(N, s) * c

X = sp.symbols('x0 x1 x2')
Dv = sp.symbols('d0 d1 d2')
h1 = X[0]**2 - X[1]**2 - X[2]**2 - 1
h2 = Dv[0]**2 - Dv[1]**2 - Dv[2]**2 + 1
h3 = X[0] * Dv[0] - X[1] * Dv[1] - X[2] * Dv[2]
M = Dv[0]
Nf = X[1] * Dv[2] - X[2] * Dv[1]
E = M**2 + Nf**2 - (X[1]**2 + X[2]**2)
checks['turning identity certificate'] = E - (h2 * (1 - X[0]**2 + h1) - h1 * Dv[0]**2 + h3 * (2 * X[0] * Dv[0] - h3))

# the line is an isometric copy of its parameter: B(x(s), x(t)) = C1 C2 - S1 S2, a certificate in the u, v hypotheses
C1, S1, C2, S2 = sp.symbols('ca sa cb sb')
xs = [C1 * u[i] + S1 * v[i] for i in range(3)]
xt = [C2 * u[i] + S2 * v[i] for i in range(3)]
checks['the line is isometric to its parameter'] = B(xs, xt) - (C1 * C2 - S1 * S2) - (C1 * C2 * (Buu - 1) + (C1 * S2 + S1 * C2) * Buv + S1 * S2 * (Bvv + 1))

for name, expr in checks.items():
    print(f'{"ok  " if sp.expand(expr) == 0 else "BAD "} {name}')
