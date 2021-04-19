# TypeScript

We are using [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint) and its [recommended configs](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs) as a starting point.
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L2-L3)

## Rules overview
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L17-L18)

### Upgrading warnings from recommended config to errors
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L22-L23)

#### [@typescript-eslint/explicit-module-boundary-types](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md)
    Exported functions should have return type declared explicitly to avoid unexpected changes in return type.
    In case you want all functions to have return type specified, use rule `@typescript-eslint/explicit-function-return-type`.
    ```ts
    // Fail
    export const getString = () => 'string'
     *
    // Pass
    export const getString = (): string => 'string'
    const getString = () => 'string'
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L27-L38)

#### [@typescript-eslint/no-explicit-any](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md)
    ```ts
    // Fail
    let a: any
     *
    // Pass
    let a: unknown
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L42-L50)

#### [@typescript-eslint/no-non-null-assertion](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md)
    ```ts
    // Fail
    return foo!.bar
     *
    // Pass
    return foo?.bar
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L54-L62)

### Clarifying recommended rules
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L67-L68)

#### [@typescript-eslint/no-floating-promises](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md)
    If function returns promise but we want to ignore this promise it should be explicitly shown that this is an async function call. Add `void` before such function calls to distinguish them from synchronous ones.
    ```ts
    const asyncSideEffect = async () => { await doSomething() }
     *
    // Fail
    asyncSideEffect()
     *
    // Pass
    await asyncSideEffect() // wait for result
    void asyncSideEffect() // ignore and don't wait
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L72-L84)

#### [@typescript-eslint/restrict-template-expressions](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md)
    Avoid `null` or `undefined` being included in a string:
    ```ts
    // Fail
    const print = (a?: string | null) => `a: ${a}`
     *
    // Pass
    const print = (a?: string | null) => `a: ${a ?? 'empty'}`
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L88-L97)

### Disabling recommended rules
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L102-L103)

#### [~~@typescript-eslint/no-unsafe-assignment~~](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md)
    #### [~~@typescript-eslint/no-unsafe-call~~](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md)
    #### [~~@typescript-eslint/no-unsafe-member-access~~](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md)
    #### [~~@typescript-eslint/no-unsafe-return~~](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md)
    Disabled this group of rules as they flag usages of external libraries which typings contain `any.`
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L107-L112)

#### [~~@typescript-eslint/unbound-method~~](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md)
    Disabled as it flags usages of unbound methods from external libraries (e.g., `_.noop` from Lodash)
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L119-L121)

### Enabling new rules
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L126-L127)

#### [@typescript-eslint/array-type.md](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md#array-simple)
    Use `T[]` for primitives and type references and `Array<T>` for other cases:
    ```ts
    // Fail
    type A = Array<string>
    type B = { param: string }[]
    type C = (string | number)[]
     *
    // Pass
    type A = string[]
    type B = Array<{ param: string }>
    type C = Array<string | number>
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L131-L144)

#### [@typescript-eslint/consistent-indexed-object-style](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-indexed-object-style.md)
    ```ts
    // Fail
    type A = { [key: Key]: Value }
     *
    // Pass
    type A = Record<Key, Value>
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L148-L156)

#### [@typescript-eslint/consistent-type-assertions](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md)
    To prevent conflicts with JSX:
    ```ts
    // Fail
    const a = <T>b
     *
    // Pass
    const a = b as T
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L160-L169)

#### [@typescript-eslint/consistent-type-definitions](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md)
    Prefer `type` to `interface`:
    * `type` can be used for any type variations (objects, arrays, unions, primitives and so on) while `interface` is only for object shapes. So for the sake of consistency it is better to use `type` everywhere and not mix it with `interface`.
    * `type` can only be defined once, while `interface` can be defined multiple times and these definitions [will merge](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces).
    ```ts
    // Fail
    interface A {
      foo: string
    }
     *
    // Pass
    type A = {
      foo: string
    }
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L173-L188)

#### [@typescript-eslint/consistent-type-imports](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md)
    Prefer [type imports](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/#type-only-imports-exports): it helps to better distinguish types from similarly named variables and avoid `import/no-cycle` errors when importing types.
    `import type { T } from 'lib'`
    ```ts
    // Fail
    import { T } from 'lib'
     *
    // Pass
    import type { T } from 'lib'
    ```
    There are [some cases](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md#when-not-to-use-it) when you might need to disable this rule (e.g. with NestJS).
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L192-L203)

#### [@typescript-eslint/method-signature-style](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md)
    ```ts
    // Fail
    type A = {
      method(): void
    }
     *
    // Pass
    type A = {
      method: () => void
    }
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L207-L219)

#### [@typescript-eslint/naming-convention](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md)
    The only common naming convention we enforce is PascalCase for types.
    You may add more naming conventions based on your project needs.
    ```ts
    // Fail
    type myType = {}
     *
    // Pass
    type MyType = {}
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L223-L233)

#### [@typescript-eslint/prefer-nullish-coalescing](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md)
    Prefer `??` to `!!` as `??` will not fallback if value is falsy (`0`, `''`, false, etc.):
    ```ts
    const a: number | null | undefined = 0
     *
    // Fail
    const b = a || 999 // result: 999
     *
    // Pass
    const b = a ?? 999 // result: 0
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L243-L254)

#### [@typescript-eslint/prefer-optional-chain](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md)
    ```ts
    const a: {
      b? : Array<{
        c?: () => void
      }>
    } | undefined = {}
     *
    // Fail
    a && a.b && a.b[0] && a.b[0].c && a.b[0].c()
     *
    // Pass
    a?.b?.[0]?.c?.()
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L258-L272)

#### [@typescript-eslint/prefer-reduce-type-parameter](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md)
    Provide result type for `Array#reduce` calls when it can't be properly inferred from initial value.
    ```ts
    // Fail
    [1, 2, 3].reduce((arr, num) => arr.concat(num2), [] as number[])
     *
    // Pass
    [1, 2, 3].reduce<number[]>((arr, num) => arr.concat(num2), [])
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L276-L285)

#### [@typescript-eslint/prefer-ts-expect-error](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md)
    ```ts
    // Fail
    // @ts-ignore
    const str: string = 1
     *
    // Pass
    // @ts-expect-error: I know what I'm doing
    const str: string = 1
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L289-L299)

#### [@typescript-eslint/require-array-sort-compare](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md)
    ```ts
    // Fail
    [1, 5, 10].sort() // [1, 10, 5]
     *
    // Pass
    [1, 5, 10].sort((a, b) => a - b) // [1, 5, 10]
    ['c', 'a', 'b'].sort()
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L303-L312)

### TS alternatives to JS rules
    Some ESLint rules have better alternatives in `@typescript-eslint` so we enable them instead of ESLint rules.
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L322-L324)

#### [@typescript-eslint/default-param-last](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md)
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L328-L329)

#### [@typescript-eslint/dot-notation](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md)
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L334-L335)

#### [@typescript-eslint/init-declarations](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/init-declarations.md)
    In TS instead of `no-undef-init` we enable opposite rule `init-declarations` to avoid runtime errors with `let` variables:
    ```ts
    // Fail
    let str: string // Actually it's `undefined`, but TS sees it as a `string`
     *
    // Pass
    let str: string | undefined = undefined
    ```
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L340-L349)

#### [@typescript-eslint/no-duplicate-imports](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-duplicate-imports.md)
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L355-L356)

#### [@typescript-eslint/no-shadow](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md)
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L362-L363)

#### [@typescript-eslint/no-throw-literal](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md)
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L368-L369)

#### [@typescript-eslint/no-unused-expressions](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md)
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L374-L375)

#### [@typescript-eslint/no-useless-constructor](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md)
[[~]](https://github.com/CSSSR/linters/blob/master/eslint/typescript.js#L388-L389)
