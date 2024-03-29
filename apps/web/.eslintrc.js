module.exports = {
  extends: ['eslint-config-folk', 'plugin:react-hooks/recommended'],
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prefer-template': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  root: true,
  env: {
    es2021: true,
    node: true,
    commonjs: true,
  },
}
