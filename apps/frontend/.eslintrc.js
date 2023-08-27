const OFF = 'off';

module.exports = {
    root: true,
    extends: ['@packages/eslint-config'],
    overrides: [
        {
            files: ['src/server/*', 'src/server-api/*', 'src/starter/*'],
            rules: {
                'no-param-reassign': OFF,
                'no-console': OFF,
            },
        },
    ],
};
