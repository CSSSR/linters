/**
 * @Article React
 * ## Syntactic rules
 * ### Principles
 * 1. Making JSX is more compact. JSX is similar to HTML and tend to extend by width. We use rules which help make our markup narrower. Related rules: `react/self-closing-comp`, `react/jsx-closing-tag-location`, `react/jsx-closing-bracket-location`, `react/jsx-first-prop-new-line`, `react/jsx-fragments`, `react/jsx-max-props-per-line`, `react/jsx-one-expression-per-line`
 * 2. Minimization the count of symbols and their kinds. JSX(as HTML too) has very noisy syntax. We try to omit unnecessary and optional symbols and prefer to use more compact syntax. When we need to use some decorative symbols, we prefer use to more consistent syntax. Related rules: `react/jsx-curly-brace-presence`, `react/jsx-curly-newline`, `react/jsx-curly-spacing`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/jsx-indent-props`, `react/jsx-no-useless-fragment`, `react/jsx-tag-spacing`. We don't use: `react/jsx-wrap-multilines`
 * 3. We don't fix decoration and view of jsx code. We don't force to use specific form of syntax, which can limit of programmist's abilities for express of nuances of meaning. We don't use: `react/jsx-sort-props`, `react/function-component-definition`, `react/jsx-newline`
 *
 */

/**
 * @Article React
 * ## Semantic rules
 * ### Principles
 * 1. Explicit declaration React semantics rules. React and JSX have many specific semantic rules, the violation of which leads to error. For example react hooks, lifecycle, component declarations have many implicit rules which has no meaning in Vanilla JS context. But if this rules is breaked, react will works incorrectly. Because JS interpreter(and base linting rules for JS) doesn't know anything about `state`, `props`, `lifecycle`, `hooks` and so on. We declare this rules in linting and help base lint rules(as "no-unused-vars") works with React syntax/semantics. Related rules: `react-hooks/rules-of-hooks`, `react/display-name`, `react/no-access-state-in-setstate`, `react/no-did-mount-set-state`, `react/no-did-update-set-state`, `react/no-direct-mutation-state`, `react/no-is-mounted`, ` react/no-this-in-sfc`, `react/no-typos`, `react/no-redundant-should-component-update`, `react/no-unescaped-entities`, `react/no-unused-state`, `react/no-will-update-set-state`, `react/react-in-jsx-scope`, `react/require-render-return`, `react/void-dom-elements-no-children`,  `react/jsx-no-duplicate-props`, `react/jsx-no-comment-textnodes`, `react/jsx-no-constructed-context-values`, `react/jsx-no-undef`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/no-unknown-property`
 * 2. Prevent usage of constructions which break a11y or web-security. We use `jsx-a11y/strict`, `plugin:no-unsanitized/DOM` and next rules: `react/no-danger`, `react/no-danger-with-children`, , `react/jsx-no-target-blank`, `react/style-prop-object`, `jsx-no-script-url`
 * 3. Prevent usage deprecate or unconvential API. Related rules: `react/no-children-prop`, `react/no-deprecated`,  `react/no-find-dom-node`, `react/no-render-return-value`, `react/no-string-refs`, `react/no-unsafe`, `react/prefer-es6-class`
 * 4. Optimization react perfomance. React perfomance rely on change detection references of props of components. To make it work, we should avoid several constructions which leads to the generation new refs. Also we should use correct key for list. Related rules: `react/prefer-stateless-function`, `react/jsx-key`, `react/jsx-no-bind`, `react/no-array-index-key`, `react-perf/jsx-no-new-object-as-prop`, `react-perf/jsx-no-new-array-as-prop`, `react-perf/jsx-no-jsx-as-prop`, `react-redux/mapStateToProps-prefer-hoisted`, `react-hooks/exhaustive-deps`
 * 5. Forcing to use `prop-types`. We prefer to use `props-types` because it is standardized way for declaration component API. Related rules: `react/default-props-match-prop-types`, `react/forbid-foreign-prop-types`, `react/forbid-prop-types`, `react/prop-types`
 * 6. Don't specificate naming for react props. React code has typical props templates(for example: handlers, boolean flags etc). But we doesn't fixing naming convetion for its, because naming convention must be project-specific. We don't use next rules: `react/jsx-pascal-case`, `react/boolean-prop-naming`, `react/forbid-component-props`, `react/forbid-dom-props`, `react/forbid-elements`, `react/jsx-handler-names`
 * 7. Not fixing convention about structure of components and project. All this conventions must be project-specific and define by programmers from concrete project. We don't use next rules: `react/state-in-constructor`, `react/static-property-placement`, `react/no-multi-comp`, `react-redux/prefer-separate-component-file`, `react/sort-comp`, `react/sort-prop-types`, `react/jsx-sort-default-props`, `react/jsx-filename-extension`, `react/jsx-props-no-spreading`, `react/jsx-max-depth`, `react/no-set-state`
 */

// TODO сделать конфиг для eslint

// todo см. https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app

// todo react-hooks plugin

// todo add eslint-plugin-jsx-a11y (with React?)