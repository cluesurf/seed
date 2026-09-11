// The secret note: written as `host` data, read by the compiler.
//
//   pnpm exec tsx test/note.ts        (from the zone package)
//
// THE POINT OF THIS SUITE is that the note is parsed by the Term
// compiler through the mill, not by a line reader. So the cases that
// matter are the ones a line reader got wrong: several values on one
// line, a value carrying a comma or a colon, and a note a person has
// typed extra lines into.
//
// It also holds the TRANSITION. A note written in the retired
// `zone: a, b` shape still has to resolve until `term zone trim` has
// rewritten them all, and the day that stops working is the day every
// shared secret reads as missing from one of its two declarations.

// The globals `term boot` prepends, installed by hand. FIRST, before any
// import of ../host/**. See test/shim.ts.
import './shim'

const { noteZones, noteHas, noteMake, noteAdd } = await import(
  '../host/code/tool/note'
)

let failed = 0

function check(what: string, got: unknown, want: unknown) {
  const a = JSON.stringify(got)
  const b = JSON.stringify(want)

  if (a === b) {
    console.log(`  ok    ${what}`)
    return
  }

  failed += 1
  console.log(`  FAIL  ${what}`)
  console.log(`        got  ${a}`)
  console.log(`        want ${b}`)
}

console.log('\nwriting')

check('one zone', noteMake(['cluesurf']), 'list zone, <cluesurf>')
check(
  'two zones',
  noteMake(['cluesurf', 'mesh']),
  'list zone, <cluesurf>, <mesh>',
)
check('no zones', noteMake([]), 'list zone')

console.log('\nreading what it wrote')

check('one back', noteZones(noteMake(['cluesurf'])), ['cluesurf'])

// THE CASE A LINE READER LOST. zone's hand-rolled `.tree` reader kept
// ONE `<...>` per line, so a two-value line silently dropped the first.
// That bug is why `time <made>, <toss>` read as a cache with no fetch
// time. The compiler keeps every value, and this is the guard on it.
check('two back', noteZones(noteMake(['cluesurf', 'mesh'])), [
  'cluesurf',
  'mesh',
])

check('none back', noteZones(noteMake([])), [])

check('a nested path', noteZones(noteMake(['base/word.surf/star'])), [
  'base/word.surf/star',
])

console.log('\nmembership')

const two = noteMake(['cluesurf', 'mesh'])

check('names the first', noteHas(two, 'cluesurf'), true)
check('names the second', noteHas(two, 'mesh'), true)
check('does not name a third', noteHas(two, 'land'), false)

// A PREFIX IS NOT A MEMBER. `mesh` must not match `mesh/moon`, or a
// value scoped to development would be handed to production.
check('a prefix is not a member', noteHas(two, 'mes'), false)
check(
  'a longer path is not a member',
  noteHas(two, 'mesh/moon'),
  false,
)

console.log('\nadding, never replacing')

// THE SHARE CASE. One stored value can belong to two declarations, and
// rewriting the note to the single zone being filed under drops the
// other, so every shared name reads as missing on the next read from
// the other root.
check(
  'keeps what was there',
  noteZones(noteAdd(noteMake(['cluesurf']), 'mesh')),
  ['cluesurf', 'mesh'],
)

check(
  'adding twice changes nothing',
  noteZones(noteAdd(noteMake(['cluesurf', 'mesh']), 'mesh')),
  ['cluesurf', 'mesh'],
)

check('adding to an empty note', noteZones(noteAdd('', 'cluesurf')), [
  'cluesurf',
])

console.log('\nthe retired shape still resolves')

// Until `term zone trim --commit` has rewritten every stored note.
check('one zone, old shape', noteZones('zone: cluesurf'), ['cluesurf'])

check('two zones, old shape', noteZones('zone: cluesurf, mesh'), [
  'cluesurf',
  'mesh',
])

check(
  'old shape with the fields that are now dropped',
  noteZones('zone: cluesurf, mesh\nenv: ARCJET_KEY\nfrom: mesh/.env'),
  ['cluesurf', 'mesh'],
)

check('old shape membership', noteHas('zone: cluesurf, mesh', 'mesh'), true)

// MIGRATING ONE NOTE IS `noteAdd` ON IT. Reading the old shape and
// writing the new one is the whole of what `term zone trim` does per
// secret, so it is proven here rather than only in the command.
check(
  'old shape migrates to new',
  noteAdd('zone: cluesurf, mesh\nfrom: mesh/.env', 'cluesurf'),
  'list zone, <cluesurf>, <mesh>',
)

console.log('\nnotes a person typed in')

// A note is a person's field first, so anything unparseable must yield
// no zones rather than throwing. A command that dies on a note somebody
// wrote a sentence into is worse than one that reports it unowned.
check('empty', noteZones(''), [])
check('prose only', noteZones('the oauth client for sign-in'), [])
check('a colon in prose', noteZones('note: rotate this in March'), [])

console.log('')

if (failed) {
  console.log(`${failed} failed\n`)
  process.exit(1)
}

console.log('all ok\n')
