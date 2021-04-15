const { merge } = require('webpack-merge')

/**
 * @Article React
 * ## Syntactic rules
 * ## Principles
 * ### Syntax
 * 1. As with the base config we use Prettier for familiar formatting defaults.
 * 2. Making JSX more compact. JSX is similar to HTML and tend to extend by width. We use rules which help make our markup narrower. E.g., `react/jsx-boolean-value`.
 * 3. Minimizing the count of symbols and their kinds. JSX (as HTML too) has very noisy syntax. We try to omit unnecessary and optional symbols and prefer to use more compact syntax. When we need to use some decorative symbols, we prefer more consistent syntax. E.g., `react/jsx-no-useless-fragment`, `react/jsx-tag-spacing`.
 * 4. We try not to affect the look of JSX code too much so we don't force the use of specific form of syntax. E.g., we don't use `react/jsx-sort-props`.
 */

/**
 * @Article React
 * ### Semantics
 * 1. Explicit declaration React semantics rules. React and JSX have many specific semantic rules, the violation of which leads to error. For example react hooks, lifecycle, component declarations have many implicit rules which has no meaning in Vanilla JS context. But if this rules is breaked, react will works incorrectly. Because JS interpreter(and base linting rules for JS) doesn't know anything about `state`, `props`, `lifecycle`, `hooks` and so on. We declare this rules in linting and help base lint rules(as "no-unused-vars") works with React syntax/semantics. E.g., `react-hooks/rules-of-hooks`, `react/no-typos`, `react/jsx-no-constructed-context-values`, `react/no-access-state-in-setstate`, etc.
 * 2. Prevent usage of constructions which break a11y or web security. We use config `jsx-a11y/recommended` and rule `react/no-danger`.
 * 3. Prevent usage of deprecated or unconventional API. Most of the rules covering this issue are included in recommended config, additionally we enable `react/no-unsafe`.
 * 4. Optimize React for performance. React's performance relies on change detection of props by reference. To make it work, we should avoid several constructions which lead to the generation of new references. E.g., `react/prefer-stateless-function`, `react/no-array-index-key`
 * 5. Enforce usage of `prop-types` in non-TS projects. We prefer to use `props-types` because it is a standardized way to declare component API. That's why we enable rules helping to write better prop types: e.g., `react/prop-types`, `react/forbid-prop-types`, `react/no-unused-prop-types` etc.
 * 6. Don't specify naming for React props. Though React code has typical props templates (handlers, boolean flags, etc), we don't enforce naming convention for them. Naming convention must be project-specific so we don't use rules like `react/boolean-prop-naming` or `react/jsx-handler-names`. We still use `react/jsx-pascal-case` to encourage consistent component naming between projects.
 * 7. Don't enforce conventions about structure of your project and components. All these conventions are be project-specific and must be defined by project developers. We don't use rules like `react/static-property-placement`, `react/no-multi-comp` or `react/jsx-max-depth`.
 */

const reactConfig = {
  /**
   * @Article React
   * ## React rules
   * As a base we use recommended configs from [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react) and [`eslint-plugin-react-hooks`](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks).
   */
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    // Чтобы перебить правила react
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  rules: {
    /**
     * @Article React
     * #### [react/button-has-type](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/button-has-type.md)
     * ```jsx
     * // Fail
     * return <button>Hello</button>
     *
     * // Pass
     * return <button type="button">Hello</button>
     * ```
     */
    'react/button-has-type': 'error',
    /**
     * @Article React
     * #### [react/default-props-match-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md)
     * ```js
     * // Fail
     * MyComponent.propTypes = {
     *   foo: React.PropTypes.string.isRequired,
     * }
     * MyComponent.defaultProps = {
     *   foo: "foo"
     * }
     *
     * // Pass
     * MyComponent.propTypes = {
     *   foo: React.PropTypes.string.isRequired,
     * }
     *
     * // Pass
     * MyComponent.propTypes = {
     *   foo: React.PropTypes.string,
     * }
     * MyComponent.defaultProps = {
     *   foo: "foo"
     * }
     * ```
     */
    'react/default-props-match-prop-types': 'error',
    /**
     * @Article React
     * #### [react/forbid-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md)
     * ```js
     * // Fail
     * Component.propTypes = {
     *   a: PropTypes.any,
     *   b: PropTypes.array,
     *   c: PropTypes.object
     * }
     *
     * // Pass
     * Component.propTypes = {
     *   a: PropTypes.objectOf(PropTypes.number),
     *   b: PropTypes.arrayOf(PropTypes.string),
     *   c: PropTypes.shape({
     *     c1: PropTypes.number,
     *     c2: PropTypes.string,
     *   })
     * }
     * ```
     */
    'react/forbid-prop-types': 'error',
    /**
     * @Article React
     * #### [react/function-component-definition](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md)
     * We prefer components as arrow function for the sake of homogeneity. Benefit of arrow function over function expression is inability to use `this`.
     * ```js
     * // Fail
     * export function MyComponent() {}
     *
     * // Pass
     * export const MyComponent = () => {}
     * ```
     */
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    /**
     * @Article React
     * #### [react/jsx-boolean-value](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)
     * ```jsx
     * // Fail
     * return <Component disabled={true} />
     *
     * // Pass
     * return <Component disabled />
     * ```
     */
    'react/jsx-boolean-value': 'error',
    /**
     * @Article React
     * #### [react/jsx-fragments](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md)
     * ```jsx
     * // Fail
     * return <React.Fragment>...</React.Fragment>
     *
     * // Pass
     * return <>...</>
     * return <React.Fragment key="key">...</React.Fragment>
     * ```
     */
    'react/jsx-fragments': 'error',
    /**
     * @Article React
     * #### [react/jsx-no-constructed-context-values](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md)
     * ```jsx
     * // Fail
     * return (
     *   <MyContext.Provider value={{ foo }}>
     *     ...
     *   </MyContext.Provider>
     * )
     *
     * // Pass
     * const value = useMemo(() => ({ foo }), [foo])
     * return (
     *   <MyContext.Provider value={value}>
     *     ...
     *   </MyContext.Provider>
     * )
     * ```
     */
    'react/jsx-no-constructed-context-values': 'error',
    /**
     * @Article React
     * #### [react/jsx-pascal-case](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)
     * ```jsx
     * // Fail
     * return <My_component />
     * return <MY_COMPONENT />
     *
     * // Pass
     * return <MyComponent />
     * ```
     */
    'react/jsx-pascal-case': 'error',
    /**
     * @Article React
     * #### [react/no-access-state-in-setstate](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md)
     * ```js
     * // Fail
     * this.setState({ value: this.state.value + 1 })
     *
     * // Pass
     * this.setState(state => ({ value: state.value + 1 }))
     * ```
     */
    'react/no-access-state-in-setstate': 'error',
    /**
     * @Article React
     * #### [react/no-array-index-key](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)
     * In a few cases when only index is available as a key, rule can be disabled for a specific line.
     * ```jsx
     * // Fail
     * return items.map((item, index) => (
     *   <Item key={index} />
     * ))
     *
     * // Pass
     * return items.map((item, index) => (
     *   <Item key={item.id} />
     * ))
     * ```
     */
    'react/no-array-index-key': 'error',
    /**
     * @Article React
     * #### [react/no-danger](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md)
     * ```jsx
     * // Fail
     * return <div dangerouslySetInnerHTML={{ __html: 'Hello World' }}></div>
     * ```
     */
    'react/no-danger': 'error',
    /**
     * @Article React
     * #### [react/no-typos](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-typos.md)
     * ```js
     * // Fail
     * class MyComponent extends React.Component {
     *   static PropTypes = {
     *     a: PropTypes.bol
     *   }
     *   static defaultprops = {}
     *   getDerivedStateFromProps() {}
     *   ComponentWillMount() {}
     *   componentdidupdate() {}
     * }
     *
     * // Pass
     * class MyComponent extends React.Component {
     *   static propTypes = {
     *     a: PropTypes.bool
     *   }
     *   static defaultProps = {}
     *   static getDerivedStateFromProps() {}
     *   componentWillMount() {}
     *   componentDidUpdate() {}
     * }
     * ```
     */
    'react/no-typos': 'error',
    /**
     * @Article React
     * #### [react/no-unsafe](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unsafe.md)
     * ```js
     * // Fail
     * class MyComponent extends React.Component {
     *   UNSAFE_componentWillMount() {}
     *   UNSAFE_componentWillReceiveProps() {}
     *   UNSAFE_componentWillUpdate() {}
     * }
     * ```
     */
    'react/no-unsafe': 'error',
    /**
     * @Article React
     * #### [react/no-unused-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md)
     * ```jsx
     * // Fail
     * const MyComponent = ({ firstName }) => <span>{firstName}</span>
     * MyComponent.propTypes = {
     *   firstName: PropTypes.string,
     *   lastName: PropTypes.string,
     * }
     *
     * // Pass
     * const MyComponent = ({ firstName, lastName }) => <span>{firstName} {lastName}</span>
     * MyComponent.propTypes = {
     *   firstName: PropTypes.string,
     *   lastName: PropTypes.string,
     * }
     * ```
     */
    'react/no-unused-prop-types': 'error',
    /**
     * @Article React
     * #### [react/prefer-stateless-function](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)
     * Though we prefer to use functional components with hooks over class components, we don't enforce it for all the components, only for class components with no state or lifecycle methods.
     * ```jsx
     * // Fail
     * class MyComponent extends React.Component {
     *   render() {
     *     return <span>{this.props.name}</span>
     *   }
     * }
     *
     * // Pass
     * const MyComponent = ({ name }) => <span>{name}</span>
     * ```
     */
    'react/prefer-stateless-function': 'error',
    /**
     * @Article React
     * #### [react/self-closing-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)
     * ```jsx
     * // Fail
     * return <MyComponent></MyComponent>
     *
     * // Pass
     * return <MyComponent />
     * ```
     */
    'react/self-closing-comp': 'error',

    /**
     * @Article React
     * ### Disabling recommended rules
     */
    /**
     * @Article React
     * #### [~~react/display-name~~](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md)
     * Disabled this rule as it gives false positives for render props.
     * Also we prefer named exports which guarantees that exported component functions have proper names.
     */
    'react/display-name': 'off',
    /**
     * @Article React
     * #### [~~react/react-in-jsx-scope~~](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md)
     * Disabled this rule as it is common to have React as a global variable (e.g., out-of-the-box in Next.js or via webpack's ProvidePlugin).
     */
    'react/react-in-jsx-scope': 'off',
    /**
     * @Article React
     * #### [~~react-hooks/exhaustive-deps~~](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks#advanced-configuration)
     * This rule may trigger a lot of unwanted errors when `useEffect` is used as watcher.
     * It is recommended to manually enable this rule inside files which heavily rely on memoization.
     */
    'react-hooks/exhaustive-deps': 'off',
  },
  overrides: [
    {
      // Disabling rules which can be replaced by type checking
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/no-typos': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
}

/**
 * @Article React
 * ## JSX A11y rules
 * Using `plugin:jsx-a11y/recommended` config as a starting point.
 */
const a11yConfig = {
  extends: ['plugin:jsx-a11y/recommended'],
  rules: {
    /**
     * @Article React
     * ### Disabling recommended rules
     */
    /**
     * @Article React
     * #### [~~jsx-a11y/accessible-emoji~~](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/accessible-emoji.md)
     * Deprecated
     */
    'jsx-a11y/accessible-emoji': 'off',
    /**
     * @Article React
     * #### [~~jsx-a11y/no-onchange~~](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-onchange.md)
     * Deprecated
     */
    'jsx-a11y/no-onchange': 'off',
    /**
     * @Article React
     * #### [~~jsx-a11y/label-has-associated-control~~](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md)
     * Disabled until [this issue](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/511) is fixed.
     */
    'jsx-a11y/label-has-associated-control': 'off',
    /**
     * @Article React
     * #### [~~jsx-a11y/no-autofocus~~](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-autofocus.md)
     * It may be [considered OK](https://www.brucelawson.co.uk/2009/the-accessibility-of-html-5-autofocus/) to use `autofocus` on pages which consist only of form (e.g., login page). In other cases usage of `autofocus` may lead to a confusion of a screen reader user. We leave the decision to use autofocus to developers on a case-by-case basis.
     */
    'jsx-a11y/no-autofocus': 'off',

    /**
     * @Article React
     * ### Clarifying recommended rules
     */
    /**
     * @Article React
     * #### [jsx-a11y/anchor-is-valid](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md)
     * ```jsx
     * // Fail
     * return <a onClick={foo}>Perform action</a>
     *
     * // Pass
     * return <a href="/some/valid/uri">Navigate to page</a>
     * ```
     * This rule may lead to a lot of errors when linting Next.js projects so consider either turning it off or [following these recommendations](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md#case-i-use-nextjs-and-im-getting-this-error-inside-of-links).
     */
    'jsx-a11y/anchor-is-valid': 'error',
    /**
     * @Article React
     * #### [jsx-a11y/mouse-events-have-key-events](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md)
     * If an element has some logic tied to hover it should be duplicated via focus/blur keyboard events. It is important for both purely visual changes (e.g., highlighting) and actual page changes (e.g., showing hint).
     * ```jsx
     * // Fail
     * return <div onMouseOver={() => {}} />
     *
     * // Pass
     * return (
     *   <div
     *     tabindex={0}
     *     onMouseOver={() => {}}
     *     onFocus={() => {}}
     *   />
     * )
     * ```
     */
    'jsx-a11y/mouse-events-have-key-events': 'error',
    /**
     * @Article React
     * #### [jsx-a11y/anchor-has-content](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-has-content.md)
     * This rule is always linting `<a>` tags. Additionally we configured this rule for `<Link>` component. If you have other custom link components configure this rule inside your project specifying the name of your custom link component.
     * ```jsx
     * // Fail
     * return <a />
     * return <Link />
     *
     * // Pass
     * return <a>Link content</a>
     * return <Link>Link content</Link>
     * ```
     */
    'jsx-a11y/anchor-has-content': ['error', { components: ['Link'] }],
  },
}

module.exports = merge(reactConfig, a11yConfig)
