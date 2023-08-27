import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import typescriptPaths from 'rollup-plugin-typescript-paths';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [react()],
    build: {
        manifest: true,
        rollupOptions: {
            output: {
                entryFileNames: '[name]-[hash].js',
                manualChunks(id: string) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                    return undefined;
                },
            },
            plugins: [
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production'),
                    preventAssignment: true,
                }),
                typescriptPaths({preserveExtensions: true}),
            ],
        },
    },
    ssr: {
        noExternal: true,
    },
});
