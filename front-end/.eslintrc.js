module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  'globals': {
    'Atomics': 'readonly',
    'sharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'react/display-name': [ 'off' ],
    'react/prop-types': [ 'off' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'prefer-const': [ 'error' ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { 
        'ignoreRestSiblings': true,
        'argsIgnorePattern': '^_',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 0,
  },
  settings: {
    react: {
      version: require('./package.json').dependencies.react,
    },
  },
};