module.exports = {
    root: true,
    env: {
        node: true,
    },
    globals: {
        InlineEditor: 'readonly',
    },
    extends: [
        'eslint:recommended'
    ],
    rules: {
        'quotes': [ 'error', 'single' ],
        'comma-dangle': [ 'error', 'always-multiline' ],
        'semi': [ 'error', 'never' ],
        'no-console': 'error',
        'max-len': [ 'error', { 'code': 120 }],
        'keyword-spacing': [ 'error', { 'before': true, 'after': true }],
        'object-curly-spacing': [ 'error', 'always' ],
        'array-bracket-spacing': [ 'error', 'always', { 'objectsInArrays': false, 'arraysInArrays': false }],
        'space-in-parens': [ 'error', 'never' ],
        'space-before-function-paren': [ 'error', 'always' ],
        'space-infix-ops': [ 'error', { 'int32Hint': true }],
        'prefer-const': 'error',
        'no-shadow': 'error',
    }
}
