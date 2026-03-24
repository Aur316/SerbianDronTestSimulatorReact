module.exports = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  singleQuote: false,
  semi: false,
  importOrder: [
    "^react$",
    "^next",
    "^@?\\w",
    "^@/",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
