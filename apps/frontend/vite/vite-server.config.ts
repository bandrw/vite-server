import react from '@vitejs/plugin-react';
import typescriptPaths from 'rollup-plugin-typescript-paths';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            plugins: [typescriptPaths({preserveExtensions: true})],
        },
    },
    server: {
        port: 3000,
    },
});
