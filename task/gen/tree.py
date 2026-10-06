import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Small helpers that print Term `.tree` expressions, for long arithmetic that is tedious and error-prone by hand."""


def ind(text, n):
    return '\n'.join((' ' * n + line) if line else line for line in text.split('\n'))


def call(name, *args):
    """A call with each argument on its own indented line. Arguments are expression strings."""
    out = [f'call {name}']
    for a in args:
        out.append(ind(a, 2))
    return '\n'.join(out)


def read(name):
    return f'read {name}'


def code(n):
    return f'code {n}'


def num(x):
    """An integer argument: a variable name, or an int literal."""
    return code(x) if isinstance(x, int) else read(x)


def hamilton(a, b):
    """The four coordinates of the Hamilton product of two coordinate 4-tuples of expression strings."""
    return [call(f'hamilton-{c}', *a, *b) for c in ('real', 'i', 'j', 'k')]


def rule(name, lhs, rhs, marks=(), kind='integer', tactic=None):
    out = [f'rule {name}']
    for m in marks:
        out.append(f'  seat {m}, like {kind}')
    out.append('  show hold')
    out.append('    call is-equal')
    out.append(ind(lhs, 6))
    out.append(ind(rhs, 6))
    if tactic:
        out.append(f'  {tactic}')
    return '\n'.join(out)
