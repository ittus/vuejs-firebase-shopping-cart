module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  "parserOptions": {
    // "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  rules: {
    "no-console": "off"
  }
}
