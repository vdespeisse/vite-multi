module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'jest/globals': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  plugins: [
    'jest',
  ],
  // add your custom rules here
  rules: {
    camelcase: 'off',
    'no-console': 'off',
    'arrow-parens': 'off',
    'comma-dangle': ['warn', 'only-multiline'],
    curly: ['error', 'multi-line'],
    quotes: ['warn', 'single', {
      avoidEscape: true
    }],
    'space-before-function-paren': 'off',
    'vue/html-indent': ['warn', 2, {
      baseIndent: 0,
    }],
    'vue/max-attributes-per-line': 'off',
    'quote-props': ['error', 'as-needed'],
  }
}
