import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';

export default defineConfig({
    plugins: [
        react(),
    ],
    build: {
        manifest: true,
        rollupOptions: {
            output: {
                entryFileNames: '[name]-[hash].js',
                manualChunks(id: string) {
                    console.log({id})
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                    return;
                },
            },
            plugins: [
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production'),
                    preventAssignment: true,
                }),
            ],
        },
    },
    ssr: {
        noExternal: true,
    },
});
