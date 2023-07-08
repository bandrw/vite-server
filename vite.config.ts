import {defineConfig, PluginOption} from "vite";
import react from '@vitejs/plugin-react'

const viteExpressPlugin = (path: string): PluginOption => {
    return {
        name: "vite-express-plugin",
        configureServer: async (server) => {
            server.middlewares.use(async (req, res, next) => {
                try {
                    const { app } = await server.ssrLoadModule(path);
                    (await app)(req, res, next);
                } catch (err) {
                    console.error(err);
                }
            });
        },
    };
}

export default defineConfig({
    plugins: [react(), viteExpressPlugin('./src/server/server-app.tsx')],
    server: {
        port: 3000,
    }
});
