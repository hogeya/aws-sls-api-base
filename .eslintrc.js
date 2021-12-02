module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier', 'unused-imports', 'import'],
  // add your custom rules here
  ignorePatterns: ['node_modules/**/*'],
  rules: {
    'sort-imports': 0,
    'import/order': [2, { alphabetize: { order: 'asc' } }],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
}
