# Base

## Syntactic rules
### Principles
1. Using Prettier for better formatting.
2. Syntactic homogeneity. Semantically identical construction must be implemented by syntactic identical construction, except in cases of using shorthand techniques which helps to avoid extra syntactic noise. We fix spacings, paddings, quotes and shorthand techniques. Related rules: `curly`, `dot-notation`, `operator-assignment`, `padding-line-between-statements`, `prefer-const`, `object-shorthand`, `import-index`
Иногда этот принцип может конфликтовать с explicitness (no-undef-init, no-useless-undefined), в таком случае предпочтение отдаётся explicitness
3. Minimization of git diffs, when code is being changed or refactored. Code changing or extending must change minimal count of symbols which aren't connected with change of logic. Related rules: `prettier/prettier`
4. Minimization of disabling eslint rules. Rules shouldn't interfere with writing code. Rules should never be permanently switched off. Disabling rules is possible only as an exception and a temporary measure. Because of this, we don't use next rules: `no-mixed-operators`, `prefer-arrow/*`, `prefer-arrow-callback`, `no-useless-return`, etc.
5. All kinds of undesirable constructions must be fixed. Because of it, we can't use warnings. Warnings may not be corrected very long time. It adds noise to the result of building project. Warnings can be allowed only in situation of long refactoring as a temporary measure.
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L4-L12)

## Semantic rules
### Principles
1. Explicit is better than implicit. JS has many implicit defaults. We strictly prefer using explicit semantic construction and not using ambiguous construction. Also, when it can make our code longer. E.g.: `radix`, `no-bitwise`, `no-implicit-coercion`, `promise/no-return-wrap`, `promise/no-new-statics`, `no-new-wrappers`.
2. Minimization of possibility of errors. JavaScript is an interpreted language. Because of it, many incorrect or meaningless constructions can be detected only during execution. We try to minimize the amount of constructions that can lead to runtime errors or can be unpredictable in run-time. E.g.: `guard-for-in`, `eqeqeq`, `import/no-cycle`, `no-throw-literal`, `no-var`, `promise/catch-or-return`.
3. Reasonable limitation of the programmer at work. We don't want to restrict the programmer's ability to describe programme logic. We try to restrict semantic constructions which made it extremely difficult to analyze code. E.g. we don't use next rules: `complexity`, `max-nested-callbacks`, `max-lines`, `max-depth`, etc. But we still use rules like `max-params` and `no-nested-ternary`.
4. If code is checked by linter, code will be ready to deployment on production environment. Code can't contain temporary or debug construction. E.g.: `no-eval`, `no-console`, `no-debugger`, `no-unused-expressions`, `no-unused-var`, `unicorn/no-abusive-eslint-disable`
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L16-L22)

## Rules overview
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L26-L27)

### Prettier
[`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier) is used for integration of Prettier and ESLint.

[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) turns off all the rules from ESLint and its plugins that might conflict with Prettier.
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L31-L35)

### ESLint rules
We are using `eslint:recommended` as starting point. You can see list of included rules [here](https://eslint.org/docs/rules/) marked with a check mark.
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L42-L44)

#### [camelcase](https://eslint.org/docs/rules/camelcase)
```js
// Fail
const my_var = { prop_name: 1 }

// Pass
const myVar = { propName: 1 }
```
Names starting with `UNSAFE_` are allowed to support React's legacy lifecycle methods:
```js
class MyComponent extends React.Component {
UNSAFE_componentWillUpdate() {}
}
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L50-L64)

#### [curly](https://eslint.org/docs/rules/curly)
```js
// Fail
if (true) return null

// Pass
if (true) { return null }
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L73-L81)

#### [default-param-last](https://eslint.org/docs/rules/default-param-last)
```js
// Fail
function f(foo = 0, bar) {}

// Pass
function f(bar, foo = 0) {}
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L85-L93)

#### [dot-notation](https://eslint.org/docs/rules/dot-notation)
```js
// Fail
obj['param']

// Pass
obj.param
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L97-L105)

#### [eqeqeq](https://eslint.org/docs/rules/eqeqeq)
Prefer strict equals to avoid implicit checks.
```js
// Fail
if (x == null) {}

// Pass
const isNil = (v) => v === null || v === undefined

if (isNil(x)) {}
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L109-L120)

#### [guard-for-in](https://eslint.org/docs/rules/guard-for-in)
For iterating over object keys use `Object.keys` instead of `for ... in` as it returns object's **own** property names and ignores inherited ones.
```js
// Fail
for (key in obj) { }

// Pass
Object.keys(obj).forEach((key) => {})
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L124-L133)

#### [max-params](https://eslint.org/docs/rules/max-params)
Functions may have maximum 3 parameters:
```js
// Fail
const myFn = (a, b, c, d) => {}

// Pass
const myFn = ({ a, b, c, d }) => {}
```
If you're using [`reselect`](https://github.com/reduxjs/reselect) and errors are reported for `createSelector` with too many params, switch to `createStructuredSelector`.
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L137-L147)

#### [no-bitwise](https://eslint.org/docs/rules/no-bitwise)
Quite often bitwise operator is just a typo in logical operator:
```js
// Fail
const x = y | z

// Pass
const x = y || z
```
If you need to use bitwise operators, disable this rule for the lines containing them.
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L151-L161)

#### [no-console](https://eslint.org/docs/rules/no-console)
Remove `console.log` from production code:
```js
// Fail
console.log('Debug info')

// Pass
console.info('Info')
console.warn('Warning')
console.error('Error')
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L165-L176)

#### [no-eval](https://eslint.org/docs/rules/no-eval)
Forbid usages of `eval` as potentially dangerous:
```js
// Fail
eval("var a = 0")
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L185-L191)

#### [no-implicit-coercion](https://eslint.org/docs/rules/no-implicit-coercion)
All implicit coercions except `!!` are disallowed:
```js
// Fail
+foo
1 * foo
'' + foo
`${foo}`
~foo.indexOf(bar)

// Pass
!!foo
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L195-L208)

#### [no-nested-ternary](https://eslint.org/docs/rules/no-nested-ternary)
```js
// Fail
return a ? b ? c : d : e

// Pass
if (a) {
return b ? c : d
} else {
return e
}
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L218-L230)

#### [no-new-wrappers](https://eslint.org/docs/rules/no-new-wrappers)
```js
// Fail
const n = new Number(1)

// Pass
const n = 1
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L234-L242)

#### [no-param-reassign](https://eslint.org/docs/rules/no-param-reassign)
```js
// Fail
function f(foo) {
foo++
}

// Pass
function f(foo) {
const bar = foo + 1
}
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L246-L258)

#### [no-shadow](https://eslint.org/docs/rules/no-shadow)
```js
// Fail
rows.forEach((item) => {
item.columns.forEach((item) => {
// `item` is shadowed
})
})

// Pass
rows.forEach((row) => {
item.columns.forEach((column) => {
})
})
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L262-L277)

#### [no-template-curly-in-string](https://eslint.org/docs/rules/no-template-curly-in-string)
```js
// Fail
"Hello, ${name}"

// Pass
`Hello, ${name}`
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L281-L289)

#### [no-throw-literal](https://eslint.org/docs/rules/no-throw-literal)
```js
// Fail
throw 'Error'

// Pass
throw new Error('Error')
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L293-L301)

#### [no-undef-init](https://eslint.org/docs/rules/no-undef-init)
```js
// Fail
let foo = undefined

// Pass
let foo
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L305-L313)

#### [no-underscore-dangle](https://eslint.org/docs/rules/no-underscore-dangle)
```js
// Fail
const _private = 1

// Pass
items.map((_item, idx) => idx)
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L317-L325)

#### [no-unneeded-ternary](https://eslint.org/docs/rules/no-unneeded-ternary)
```js
// Fail
const isYes = answer === 1 ? true : false

// Pass
const isYes = answer === 1
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L334-L342)

#### [no-unused-expressions](https://eslint.org/docs/rules/no-unused-expressions)
```js
// Fail
a || b
(function f() {})

// Pass
a && b()
a ? b() : c()
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L346-L356)

#### [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars)
```js
// Fail
const { foo, bar } = props
console.log(foo)

// Pass
const { foo } = props
console.log(foo)
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L368-L378)

Hanging unused parameters in functions are not allowed:
```js
// Fail
function f(a, b, c, d) {
console.log(b)
}

// Pass
function f(a, b) {
console.log(b)
}
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L385-L397)

Omitted params in object destructuring can be left unused:
```js
// Pass
const { foo, ...rest } = props
console.log(rest)
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L401-L407)

#### [no-var](https://eslint.org/docs/rules/no-var)
```js
// Fail
var foo

// Pass
let foo
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L413-L421)

#### [object-shorthand](https://eslint.org/docs/rules/object-shorthand)
```js
// Fail
const a = { x : x }

// Pass
const a = { x }
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L425-L433)

#### [one-var](https://eslint.org/docs/rules/one-var)
```js
// Fail
let foo, bar

// Pass
let foo
let bar
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L437-L446)

#### [operator-assignment](https://eslint.org/docs/rules/operator-assignment)
```js
// Fail
x = x + y

// Pass
x += y
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L450-L458)

#### [padding-line-between-statements](https://eslint.org/docs/rules/padding-line-between-statements)
We only configure paddings between exports and other statements to emphasize exported values. You may customize this rule in your project depending on your needs.
```js
// Fail
const a = 1
export const b = 2

// Pass
const a = 1

export const b =2
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L462-L474)

#### [prefer-const](https://eslint.org/docs/rules/prefer-const)
```js
// Fail
let a = 3

// Pass
const a = 3
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L483-L491)

#### [radix](https://eslint.org/docs/rules/radix)
ES5 no longer treats strings with leading 0 as octal literal, so there's no need to pass the radix 10:
```js
// Fail
const n = parseInt('071', 10)

// Pass
const n = parseInt('071')
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L495-L504)

### Disabled rules
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L509-L510)

#### [~~no-irregular-whitespace~~](https://eslint.org/docs/rules/no-irregular-whitespace)
We disable this rule as it can't properly allow using non-breaking whitespaces inside JSX tags.
It forces to use `&nbsp;` instead:
```jsx
<>Push the&nbsp;button</>
```
Which leads to a problem when converting JSX text node to a string:
```jsx
<>{'Push the&nbsp;button'}</>
```
If developer don't pay attention or text is too big to look through it properly, `&nbsp;` moves into string without any warning and shows up in UI as a group of symbols, not a whitespace.
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L513-L524)

#### [~~no-use-before-define~~](https://eslint.org/docs/rules/no-use-before-define)
We don't enable this rule as it is often more practical to place usages before definitions. E.g. in React component it is better to place component code first and helper functions below. That way the most important thing in the file comes first.
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L528-L530)

## Unicorn
Additional rules from [`eslint-config-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn).
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L537-L539)

#### [unicorn/explicit-length-check](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md)
Checking for `.length` of an empty array can lead to rendering `0` instead of not rendering anything. This rule forces to always explicitly check for array length by comparing it:
```jsx
// Fail
return items.length && <Items />

// Pass
return items.length > 0 && <Items />
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L545-L554)

#### [unicorn/filename-case](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md)
```
// Fail
my-component.js
my_component.js

// Pass
myComponent.js
MyComponent.js
en-US.js
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L558-L569)

#### [unicorn/no-abusive-eslint-disable](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-abusive-eslint-disable.md)
```js
// Fail
// eslint-disable-next-line
console.log(message);

// Pass
// eslint-disable-next-line no-console
console.log(message);
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L585-L595)

#### [unicorn/throw-new-error](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md)
By design `Error(msg)` and `new Error(msg)` can be used interchangeably but for the sake of homogeneity it is better to always use only one form.
```js
// Fail
throw Error()

// Pass
throw new Error()
```
We prefer `new Error` for consistency with custom subclassed errors which cannot be created without `new`:
```js
class MyError extends Error {}
throw MyError() // Uncaught TypeError
throw new MyError() // OK
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L599-L614)

## Rules for asynchronous code
Using [`eslint-config-promise`](https://github.com/xjamundx/eslint-plugin-promise).
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L621-L623)

#### [prefer-promise-reject-errors](https://eslint.org/docs/rules/prefer-promise-reject-errors)
```js
// Fail
Promise.reject('Error')

// Pass
Promise.reject(new Error('Error'))
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L629-L637)

#### [require-await](https://eslint.org/docs/rules/require-await)
```js
// Fail
async function f() {
doSomethingSynchronously()
}

// Pass
async function f() {
await doSomethingAsynchronously()
}
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L641-L653)

#### [promise/catch-or-return](https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/catch-or-return.md)
```js
// Fail
myPromise.then(doSomething)

// Pass
myPromise.then(doSomething).catch(handleError)
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L657-L665)

#### [promise/no-return-in-finally](https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/no-return-in-finally.md)
```js
// Fail
myPromise.finally(() => {
return 'done'
})

// Pass
myPromise.finally(() => {
alert('done')
})
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L675-L687)

#### [promise/no-return-wrap](https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/no-return-wrap.md)
```js
// Fail
myPromise.then((val) => Promise.resolve(val * 2))
myPromise.then(() => Promise.reject(new Error()))

// Pass
myPromise.then((val) => val * 2)
myPromise.then(() => {
throw new Error()
})
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L691-L703)

#### [promise/param-names](https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/param-names.md)
```js
// Fail
new Promise((reject, resolve) => {})

// Pass
new Promise((resolve, reject) => {})
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L707-L715)

## Import rules
Using [`eslint-config-import`](https://github.com/benmosher/eslint-plugin-import) and [`eslint-config-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn).
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L723-L725)

Extending [`plugin:import/errors`](https://github.com/benmosher/eslint-plugin-import/blob/master/config/errors.js).
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L729-L730)

#### [import/no-duplicates](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md)
```js
// Fail
import { App } from './App'
import { SOME_CONST } from './App'

// Pass
import { App, SOME_CONST } from './App'
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L735-L744)

#### [import/first](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)
```js
// Fail
init()
import { App } from './App'

// Pass
import { App } from './App'
init()
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L748-L758)

#### [import/newline-after-import](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md)
```js
// Fail
import { App } from './App'
render(App)

// Pass
import { App } from './App'

render(App)
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L762-L773)

#### [import/no-cycle](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md)
```js
// Fail

// a.js
import { b } from './b'
export const a = 1

// b.js
import { a } from './a'
export const b = 2
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L777-L789)

#### [import/no-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md)
```js
// Fail
export default function foo() {}

// Pass
export function foo() {}
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L793-L801)

#### [import/order](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md)
Group imports by module type and sort them alphabetically inside a group.

Order of import groups:
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L805-L809)

1. `builtin`
```js
import * from 'path'
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L821-L825)

2. `external`
```js
import * from 'lodash'
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L829-L833)

3. `internal`
```js
import * from 'src/utils'
import * from '@/utils'
import * from '~/utils'
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L837-L843)

4. `parent`
```js
import * from '../'
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L847-L851)

5. `sibling`
```js
import * from './sibling'
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L855-L859)

6. `index`
```js
import * from '.'
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L863-L867)

#### [sort-imports](https://eslint.org/docs/rules/sort-imports)
Sort import members:
```js
// Fail
import { c, a, b } from 'module'

// Pass
import { a, b, c } from 'module'
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L885-L894)

#### [unicorn/import-index](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-index.md)
```js
// Fail
import * from './index'

// Pass
import * from '.'
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L904-L912)

## Rules for regular expressions
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L919-L920)

#### [prefer-named-capture-group](https://eslint.org/docs/rules/prefer-named-capture-group)
We use named capture groups as they are more explicit while matching or replacing:
```js
// Fail
const regexp = /(ba[rz])/
const groupResult = regexp.exec('bar')[1] // 'bar'
'foobar'.replace(regexp, '($1)') // 'foo(bar)'

// Pass
const regexp = /(?<named>ba[rz])/
const groupResult = regexp.exec('bar').groups.named // 'bar'
'foobar'.replace(regexp, '($<named>)') // 'foo(bar)'
```
If you don't need the result of capturing, mark group as a non-capturing:
```js
// Pass
const regexp = /(?:ba[rz])/
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L928-L946)

#### [prefer-regex-literals](https://eslint.org/docs/rules/prefer-regex-literals)
```js
// Fail
new RegExp("abc")

// Pass
/abc/
new RegExp(someVariable)
new RegExp(`${prefix}abc`)
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L950-L960)

#### [unicorn/better-regex](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md)
```js
// Fail
/[0-9]/

// Pass
/\d/
```
[[~]](https://github.com/CSSSR/csssr-base-lint/blob/master/eslint/base.js#L964-L972)
