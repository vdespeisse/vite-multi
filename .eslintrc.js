module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: "babel-eslint",
    "sourceType": "module"
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    camelcase: 'off',
    'no-console': 'off',
    'arrow-parens': 'off',
    'comma-dangle': ['warn', 'only-multiline'],
    curly: ['error', 'multi-line'],
    'space-before-function-paren': 'off',
    'vue/html-indent': ['warn', 2, {
      baseIndent: 0,
    }],
    'vue/max-attributes-per-line': 'off',
  }
}
