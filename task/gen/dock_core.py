import os as _os

GEN = _os.path.dirname(_os.path.abspath(__file__))
SEED = _os.path.dirname(_os.path.dirname(GEN))

"""Generate the slot-to-unit search of code/vibe/dock.tree: the Q8 core whose turned unit lands on a given slot."""

CORES = [('positive', 'real-axis'), ('negative', 'real-axis'), ('positive', 'i-axis'), ('negative', 'i-axis'),
         ('positive', 'j-axis'), ('negative', 'j-axis'), ('positive', 'k-axis'), ('negative', 'k-axis')]


def level(n, depth):
    pad = '  ' * depth
    sign, axis = CORES[n]
    core = f'call q8-of\n{pad}      make {sign}\n{pad}      make {axis}'
    if n == len(CORES) - 1:
        return f'{pad}send back\n{pad}  {core}'
    test = (f'{pad}fork case\n'
            f'{pad}  call same-tetrad\n'
            f'{pad}    call unit-slot\n'
            f'{pad}      call hurwitz-of\n'
            f'{pad}        call q8-of\n'
            f'{pad}          make {sign}\n'
            f'{pad}          make {axis}\n'
            f'{pad}        read t\n'
            f'{pad}    read r\n'
            f'{pad}  case yes\n'
            f'{pad}    send back\n'
            f'{pad}      call q8-of\n'
            f'{pad}        make {sign}\n'
            f'{pad}        make {axis}\n'
            f'{pad}  case no\n')
    return test + level(n + 1, depth + 2)


print('''task core-of-slot
  take t, like tone
  take r, like tetrad
  like q8''')
print(level(0, 1))
