module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["google", "plugin:prettier/recommended", "eslint-config-prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: { newIsCap: false },
};
