module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
        jest: true
    },
    globals: {
        Parse: 'readonly'
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        'quotes': [ 'error', 'single' ],
        'comma-dangle': [ 'error', 'always-multiline' ],
        'semi': [ 'error', 'never' ],
        'no-console': 'warn',
        'max-len': [ 'error', { 'code': 120 }],
        'keyword-spacing': [ 'error', { 'before': true, 'after': true }],
        'object-curly-spacing': [ 'error', 'always' ],
        'array-bracket-spacing': [ 'error', 'always', { 'objectsInArrays': false, 'arraysInArrays': false }],
        'space-in-parens': [ 'error', 'never' ],
        'space-before-function-paren': [ 'error', 'always' ],
        'space-infix-ops': [ 'error', { 'int32Hint': true }],
        'eqeqeq': 'error',
        'prefer-const': 'error',
        'no-shadow': 'error',
        'no-unused-vars': 'off', // We use @typescript-eslint/no-unused-vars instead
        "indent": "off",    // There is a @typescript-eslint/indent instead
        'no-prototype-builtins': 'off',
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/member-delimiter-style': [ 'error', { 'multiline': { delimiter: 'none' } }],
        '@typescript-eslint/interface-name-prefix': [ 'error', 'always' ],
        '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-use-before-define': 'on',
    }
}
