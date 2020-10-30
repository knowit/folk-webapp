module.exports = {
  extends: ['airbnb-typescript-prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react/jsx-props-no-spreading': 0,
  },
};
