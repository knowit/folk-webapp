module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  // plugins: ['react', 'react-hooks', '@typescript-eslint'],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
