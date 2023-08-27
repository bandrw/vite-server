/* eslint-disable index/only-import-export */

// eslint-disable-next-line index/only-import-export,@typescript-eslint/no-var-requires
const prettierConfig = require('@packages/prettier-config');

const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

module.exports = {
    root: true,
    ignorePatterns: ['build', 'dist', 'node_modules'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
    },
    // Prettier must be last, so it can override other configs (https://github.com/prettier/eslint-config-prettier#installation)
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        '@tanstack/query',
        'index',
        'check-file',
        'sort-export-all',
        'prettier',
    ],
    extends: [
        'airbnb',
        'airbnb/hooks',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@tanstack/eslint-plugin-query/recommended',
        'plugin:sort-export-all/recommended',
        'prettier',
    ],
    overrides: [
        {
            files: ['vite/*'],
            rules: {
                'import/no-default-export': OFF,
            },
        },
    ],
    rules: {
        'prettier/prettier': [ERROR, prettierConfig],

        // Typescript rules
        'no-use-before-define': OFF,
        '@typescript-eslint/no-use-before-define': ERROR,
        'no-shadow': OFF,
        '@typescript-eslint/no-shadow': ERROR,
        '@typescript-eslint/no-empty-function': OFF,
        '@typescript-eslint/no-unused-vars': [
            WARN,
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/ban-ts-comment': OFF,
        '@typescript-eslint/no-empty-interface': OFF,
        '@typescript-eslint/prefer-enum-initializers': ERROR,
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/no-inferrable-types': OFF,

        // React rules
        'react/function-component-definition': [
            ERROR,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'react/jsx-filename-extension': [
            ERROR,
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
        'react-hooks/rules-of-hooks': ERROR,
        'react-hooks/exhaustive-deps': WARN,
        'react/jsx-props-no-spreading': OFF,
        'react/jsx-uses-react': ERROR,
        'react/jsx-uses-vars': ERROR,
        'react/require-default-props': OFF,
        'react/jsx-no-useless-fragment': [ERROR, {allowExpressions: true}],
        'react/destructuring-assignment': OFF,
        'react/prop-types': OFF,
        'react/jsx-boolean-value': OFF,
        'react/no-array-index-key': OFF,
        'react/no-unused-prop-types': OFF,

        // Other rules
        'index/only-import-export': ERROR,
        'index/forbid': OFF,
        'import/no-extraneous-dependencies': [ERROR, {devDependencies: true}],
        'import/prefer-default-export': OFF,
        'import/no-default-export': ERROR,
        'import/extensions': [
            ERROR,
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/order': OFF,
        'no-debugger': WARN,
        'no-console': [WARN, {allow: ['warn', 'error']}],
        'no-nested-ternary': OFF,
        'no-useless-constructor': OFF,
        'consistent-return': OFF,
        'no-await-in-loop': OFF,
        'no-continue': OFF,
        'class-methods-use-this': OFF,
        'no-underscore-dangle': OFF,
        'no-plusplus': OFF,
        'no-restricted-syntax': [
            ERROR,
            // Ensure import from '*use-isomorphic-layout-effect' is `useLayoutEffect` to leverage `eslint-plugin-react-hooks`
            {
                selector:
                    'ImportDeclaration[source.value=/use-isomorphic-layout-effect/] > ImportDefaultSpecifier[local.name!="useLayoutEffect"]',
                message:
                    'Must use `useLayoutEffect` as the name of the import from `*use-isomorphic-layout-effect` to leverage `eslint-plugin-react-hooks`',
            },
        ],
        'no-empty-pattern': WARN,
        'no-empty': OFF,
        'max-classes-per-file': OFF,
        'no-extra-boolean-cast': OFF,
        'prefer-destructuring': OFF,
        'func-names': OFF,
        'arrow-body-style': OFF,
        'prefer-const': WARN,

        'check-file/folder-naming-convention': [
            ERROR,
            {
                'src/!(__tests__)/**/': 'KEBAB_CASE',
            },
        ],
        'check-file/filename-naming-convention': [
            ERROR,
            {
                '**/*.{js,ts,jsx,tsx}': 'KEBAB_CASE',
            },
            {
                ignoreMiddleExtensions: true,
            },
        ],
        'no-restricted-imports': [
            ERROR,
            {
                paths: [
                    {
                        name: 'react',
                        importNames: ['useLayoutEffect'],
                        message:
                            '`useLayoutEffect` causes a warning in SSR. Use `@shared/hooks/react-hooks/useLayoutEffect`',
                    },
                ],
                patterns: ['../**/pages', '../**/features', '../**/entities', '../**/shared'],
            },
        ],
        'no-param-reassign': [ERROR, {props: true, ignorePropertyModificationsForRegex: ['.*[aA]cc$', '^acc']}],
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
