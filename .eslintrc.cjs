module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    rules: {
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-useless-catch": "off",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^__" }],
      "no-useless-escape": "off",
      "no-useless-catch": "off" // "off" or 0 both work
    },
  }