/* eslint-disable index/only-import-export */

module.exports = {
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    parser: 'typescript',
    arrowParens: 'always',
    printWidth: 120,
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
    useTabs: false,
    trailingComma: 'all',
    bracketSpacing: false,
    bracketSameLine: false,
    importOrder: [
        '^react(.*)$',
        '^@shared(.*)$',
        '^@entities(.*)$',
        '^@features(.*)$',
        '^@widgets(.*)$',
        '^@pages(.*)$',
        '^@app(.*)$',
        '<THIRD_PARTY_MODULES>',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
