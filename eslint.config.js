import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'assets-cliente', 'lighthouse-report', 'playwright-report'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    languageOptions: { globals: { ...globals.browser } },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
          message: 'Proibido (ver DECISIONS.md).',
        },
        { selector: "CallExpression[callee.name='eval']", message: 'Proibido.' },
        { selector: "NewExpression[callee.name='Function']", message: 'Proibido.' },
        { selector: "MemberExpression[property.name='innerHTML']", message: 'Proibido.' },
      ],
    },
  },
  {
    files: ['scripts/**/*.mjs', 'e2e/**', '*.config.*'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
);
