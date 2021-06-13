module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    'quotes': [ 'error', 'single' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'semi': [ 'error', 'always' ],
    'no-extra-semi': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    '@typescript-eslint/no-explicit-any': [ 'off' ],
    'no-empty-interface': [ 'off' ],
    '@typescript-eslint/no-empty-interface': [ 'off' ],
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
};