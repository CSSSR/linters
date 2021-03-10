module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    // "plugin:@typescript-eslint/recommended",
    // todo нужно? vvv
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
    'plugin:import/typescript',
  ],
  plugins: [
    // todo посмотреть правила
    '@typescript-eslint',
  ],
  rules: {
    // Отключения
    // todo: обнуляется в recommended?
    'no-unused-vars': 'off',
    /*
     * TS сам хорошо справляется
     * */
    'import/no-unresolved': 'off',
  },
}
