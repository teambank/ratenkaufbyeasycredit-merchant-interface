module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:promise/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-v-html': 0,
    'vue/require-default-prop': 0,
	'no-implicit-coercion': 'error',
    'eqeqeq': ["error", "always"],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
