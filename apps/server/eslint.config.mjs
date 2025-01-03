import eslintConfigFolk from 'eslint-config-folk'

/** @type {import('eslint').Linter.Config[]} */
export default [...eslintConfigFolk, { files: ['**/*.{js,mjs,cjs,ts}'] }]
