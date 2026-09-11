// The SDK wrapper, against a fake SDK.
//
//   pnpm exec tsx test/sdk.ts
//
// A real token would test Bitwarden. This tests OUR code: that the value
// travels as an argument and never anywhere else, that an existing name is
// updated rather than duplicated, that a missing project is refused before
// anything is written, and that delete removes only what was asked for.
//
// The fake records every call, so "the value was never put in a string" is
// asserted rather than assumed.
import Module, { createRequire } from 'node:module'

const real = createRequire(import.meta.url)
const need = ((r: string) => (r === '@bitwarden/sdk-napi' ? fake : real(r))) as NodeJS.Require

type Call = { what: string; args: unknown[] }

const calls: Call[] = []
let projects = [{ id: 'p-base', name: 'base' }]
let secrets: Array<{
  id: string
  key: string
  value: string
  note?: string
  projectId?: string
}> = []

const fake = {
  BitwardenClient: class {
    auth() {
      return {
        loginAccessToken: async (token: string) => {
          calls.push({ what: 'login', args: [token] })

          if (token === 'bad') {
            throw new Error('401 Unauthorized')
          }
        },
      }
    }

    projects() {
      return { list: async () => ({ data: projects }) }
    }

    secrets() {
      return {
        // METADATA ONLY, AND NO NOTE. That is the real SDK's shape: the
        // note comes back on the fetch, not the listing. The fake used
        // to hand one over here, which made a `notes` that read the
        // listing alone look correct while returning every note empty
        // against the real provider.
        list: async () => ({
          data: secrets.map(one => ({
            id: one.id,
            key: one.key,
            projectId: one.projectId ?? '',
          })),
        }),
        getByIds: async (ids: string[]) => ({
          data: secrets.filter(one => ids.includes(one.id)),
        }),
        get: async (id: string) => secrets.find(one => one.id === id),
        create: async (org: string, key: string, value: string, note: string, ids: string[]) => {
          calls.push({ what: 'create', args: [org, key, value, note, ids] })
          const made = { id: `s-${secrets.length}`, key, value, note, projectId: ids[0] }
          secrets.push(made)
          return made
        },
        update: async (org: string, id: string, key: string, value: string, note: string, ids: string[]) => {
          calls.push({ what: 'update', args: [org, id, key, value, note, ids] })
          const at = secrets.findIndex(one => one.id === id)
          secrets[at] = { id, key, value, note, projectId: ids[0] }
          return secrets[at]
        },
        delete: async (ids: string[]) => {
          calls.push({ what: 'delete', args: [ids] })
          secrets = secrets.filter(one => !ids.includes(one.id))
          return {}
        },
      }
    }
  },
}

// hand the fake to the wrapper in place of the real module
const load = (Module as unknown as { _load: (...a: unknown[]) => unknown })._load
;(Module as unknown as { _load: (...a: unknown[]) => unknown })._load = (
  request: unknown,
  ...rest: unknown[]
) => (request === '@bitwarden/sdk-napi' ? fake : load(request, ...rest))

// the shim under test, loaded the way `term boot` would prepend it
import { readFileSync } from 'node:fs'
import { transformSync } from 'esbuild'

const source = readFileSync('code/hold/runtime/vault.ts', 'utf8')
const js = transformSync(source, { loader: 'ts', format: 'cjs' }).code
const vault = new Function('require', `${js}; return vault`)(need) as {
  put: (
    t: string,
    o: string,
    bank: string,
    note: string,
    n: string,
    v: string,
  ) => Promise<string>
  drop: (t: string, o: string, p: string, n: string) => Promise<boolean>
  one: (t: string, o: string, n: string) => Promise<string>
  note: (t: string, o: string, n: string) => Promise<string>
  notes: (t: string, o: string) => Promise<Array<{ name: string; note: string }>>
  mark: (t: string, o: string, n: string, note: string) => Promise<boolean>
}

// `bank` is the PROJECT NAME to file under, and `note` is the finished
// note. Neither is the zone path any more: `put` used to take the path
// alone and look a project up by it, which is `project` mode's rule
// applied unconditionally, so on a `note` mode declaration it halted
// with "No project called <zone>" and the only per-name write in the
// system was unusable.
const put = (a: any) =>
  vault.put(
    a.token,
    a.organizationId,
    a.bank ?? a.path,
    a.note ?? '',
    a.name,
    a.value,
  )
const drop = (a: any) => vault.drop(a.token, a.organizationId, a.path, a.name)
const one = (a: any) => vault.one(a.token, a.organizationId, a.name)

let pass = 0
let fail = 0
const ok = (w: string) => { console.log(`  ok    ${w}`); pass += 1 }
const no = (w: string) => { console.log(`  FAIL  ${w}`); fail += 1 }

const SECRET = 'the-actual-secret-value'

const NOTE = 'list zone, <cluesurf>'

// 1. a new name is created, in the right project, with its note
const first = await put({
  token: 'tok', organizationId: 'org', bank: 'base', note: NOTE,
  name: 'database-url', value: SECRET,
})

first === 'made' ? ok('a new name is created') : no(`got ${first}`)

const made = calls.find(c => c.what === 'create')
made?.args[2] === SECRET ? ok('the value is passed as an argument') : no('value not passed')
made?.args[4] && (made.args[4] as string[])[0] === 'p-base'
  ? ok('into the project it was told')
  : no('wrong project')

// THE NOTE IS WRITTEN. `put` used to pass `''` here, which in `note`
// mode files a secret with nothing saying which zone owns it: present
// at the provider and invisible to every reader, which is worse than
// either outcome alone.
made?.args[3] === NOTE
  ? ok('the note is written with it')
  : no(`note was ${JSON.stringify(made?.args[3])}`)

// 2. an existing name is updated, not duplicated, and keeps its note
const again = await put({
  token: 'tok', organizationId: 'org', bank: 'base', note: NOTE,
  name: 'database-url', value: 'a-new-value',
})

again === 'grew' ? ok('an existing name is updated') : no(`got ${again}`)
secrets.length === 1 ? ok('and not duplicated') : no(`${secrets.length} secrets exist`)

const grew = calls.find(c => c.what === 'update')
grew?.args[4] === NOTE
  ? ok('an update carries the note too')
  : no(`update note was ${JSON.stringify(grew?.args[4])}`)

// 3. the value never appears anywhere but that one argument
const everywhere = JSON.stringify(
  calls.filter(c => c.what !== 'create' && c.what !== 'update'),
)

everywhere.includes(SECRET)
  ? no('the value leaked into another call')
  : ok('the value appears in no other call')

// 4. a missing project is refused before anything is written
projects = []
const before = secrets.length
let refused = false
const exit = process.exit
;(process as unknown as { exit: (c?: number) => void }).exit = () => {
  refused = true
  throw new Error('exited')
}

try {
  await put({ token: 'tok', organizationId: 'org', bank: 'nowhere', name: 'x', value: 'y' })
} catch {
  // the fake exit throws
}

;(process as unknown as { exit: typeof exit }).exit = exit
refused ? ok('a missing project is refused') : no('it wrote into no project')
secrets.length === before ? ok('and nothing was written') : no('it wrote anyway')

// 5. delete removes only what was named
projects = [{ id: 'p-base', name: 'base' }]
secrets.push({ id: 's-9', key: 'other', value: 'keep' })
const gone = await drop({ token: 'tok', organizationId: 'org', path: 'base', name: 'database-url' })

gone ? ok('delete reports what it removed') : no('delete said nothing went')
secrets.length === 1 && secrets[0]?.key === 'other'
  ? ok('and removed only that one')
  : no('it removed the wrong thing')

// 6. reading one name back
const got = await one({ token: 'tok', organizationId: 'org', name: 'other' })
got === 'keep' ? ok('one name reads back') : no(`read ${got}`)

// 7. `notes` lists names and notes, and NO VALUES
secrets = [
  { id: 's-a', key: 'alpha', value: 'AAA', note: 'list zone, <cluesurf>', projectId: 'p-base' },
  { id: 's-b', key: 'beta', value: 'BBB', note: 'zone: mesh', projectId: 'p-base' },
]

const listed = await vault.notes('tok', 'org')

listed.length === 2 ? ok('notes lists every secret') : no(`listed ${listed.length}`)
listed.find(o => o.name === 'beta')?.note === 'zone: mesh'
  ? ok('notes carries the note')
  : no('notes lost the note')

// THE NOTE MUST SURVIVE THE ROUND TRIP. `list` does NOT carry notes in
// this SDK, only the fetch does, and a version of `notes` that read the
// listing alone returned every note empty. `term zone wash` then
// reported all 878 secrets as naming no zone, which reads as a
// migration with nothing left to do rather than one that saw nothing.
// Added, not replacing: the `mark` checks below need `beta` to exist.
secrets.push({
  id: 's-c',
  key: 'gamma',
  value: 'CCC',
  note: 'list zone, <land>',
  projectId: 'p-base',
})

const fetched = await vault.notes('tok', 'org')
const gamma = fetched.find(one => one.name === 'gamma')

gamma?.note === 'list zone, <land>'
  ? ok('notes reads a note the listing does not carry')
  : no(`notes lost a fetch-only note: ${JSON.stringify(gamma?.note)}`)

// It returns names and notes and nothing else. Values cross the
// function because the fetch is the only thing that carries the note,
// but none of them come back out.
JSON.stringify(fetched).includes('CCC')
  ? no('notes returned a value')
  : ok('notes returns no value')

// 8. `mark` rewrites the note and leaves the value byte for byte
const marked = await vault.mark('tok', 'org', 'beta', 'list zone, <mesh>')

marked ? ok('mark reports what it changed') : no('mark said nothing changed')

const after = secrets.find(o => o.key === 'beta')

after?.note === 'list zone, <mesh>'
  ? ok('mark rewrote the note')
  : no(`note is ${JSON.stringify(after?.note)}`)

// THE VALUE SURVIVES. `update` replaces the whole secret, so a `mark`
// that did not read the value first would erase it.
after?.value === 'BBB'
  ? ok('mark left the value untouched')
  : no(`value became ${JSON.stringify(after?.value)}`)

// AND SO DOES THE PROJECT. `update` replaces those too, so passing none
// would unfile the secret and hide it from every reader.
after?.projectId === 'p-base'
  ? ok('mark left the project untouched')
  : no(`project became ${JSON.stringify(after?.projectId)}`)

const absent = await vault.mark('tok', 'org', 'not-there', 'x')
absent === false ? ok('mark on a missing name is not an error') : no('mark invented one')

// 9. a rate limit is waited out, and nothing else is
//
// BITWARDEN 429s AT ABOUT SIXTY WRITES, and `term zone wash --commit`
// makes two calls per secret across nine hundred of them. Without the
// backoff it dies a minute in with the migration half done.
let refusals = 2
const realUpdate = fake.BitwardenClient.prototype.secrets

fake.BitwardenClient.prototype.secrets = function () {
  const inner = realUpdate.call(this)
  const update = inner.update

  inner.update = async (...args: any[]) => {
    if (refusals > 0) {
      refusals -= 1
      throw new Error('429 Too Many Requests')
    }

    return update(...args)
  }

  return inner
}

secrets.push({ id: 's-d', key: 'delta', value: 'DDD', note: 'zone: mesh', projectId: 'p-base' })

const waited = await vault.mark('tok', 'org', 'delta', 'list zone, <mesh>')

waited && refusals === 0
  ? ok('mark waits out a rate limit and then writes')
  : no(`mark gave up: waited=${waited} refusals left=${refusals}`)

secrets.find(o => o.key === 'delta')?.note === 'list zone, <mesh>'
  ? ok('and the write landed after the wait')
  : no('the retry did not actually write')

// A CREDENTIAL FAILURE IS AN ANSWER, not something to retry six times.
// Retrying it turns a clear refusal into a slow one.
refusals = 99
let gaveUp = false

try {
  await vault.mark('tok', 'org', 'delta', 'x')
} catch {
  gaveUp = true
}

gaveUp ? ok('a persistent failure still gives up') : no('it retried forever')

fake.BitwardenClient.prototype.secrets = realUpdate

console.log('')
console.log(fail === 0 ? '  every sdk check passed' : `  ${fail} failed`)
process.exit(fail === 0 ? 0 : 1)
