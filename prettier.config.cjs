module.exports = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  singleQuote: false,
  semi: false,
  importOrder: [
    "^react$", // first React
    "^next", // then next
    "^@?\\w", // then third-party packages (node_modules)
    "^@components", // your alias imports
    "^@utils", // other alias imports
    "^[./]", // relatív imports
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
