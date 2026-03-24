import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import eslintConfigPrettier from "eslint-config-prettier";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";





export default tseslint.config(
  {
    ignores: [
      "dist",
      "node_modules",
      "src/components/ui",
      "public/droai-sdk/**",
      "public/user-uploaded-sites/**",
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...pluginQuery.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: [
          "./tsconfig.json",
          "./tsconfig.app.json",
          "./tsconfig.node.json",
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/only-throw-error": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        {
          ignorePrimitives: {
            string: true,
            number: true,
          },
        },
      ],
      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { allowSameFolder: false, rootDir: "src", prefix: "@" },
      ],
      "prefer-const": "error",
      "no-var": "error",
      // Formatting rules
      indent: ["error", 2, { SwitchCase: 1 }],
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "never"],
      "comma-dangle": ["error", "always-multiline"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      // Array type rules
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/prefer-enum-initializers": "error",
      // Enforce string-only enums
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSEnumMember > Literal[raw!=/^[\"'].*[\"']$/]",
          message: "Enum members must use string values, not numbers.",
        },
      ],
    },
  },
  eslintConfigPrettier,
)
