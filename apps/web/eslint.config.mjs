import eslintConfigFolk from 'eslint-config-folk'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginHooks from 'eslint-plugin-react-hooks'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...eslintConfigFolk,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    plugins: {
      'react-hooks': pluginHooks,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      ...pluginHooks.configs.recommended.rules,
    },
  },
  {
    ignores: ['build/', '.vite/'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: { globals: globals.browser },
  },

  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'warn',
      'no-constant-binary-expression': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
      'react/prop-types': 'warn',
      'react/jsx-key': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      'no-undef': 'warn',
    },
  },
]
