import {defineConfig, PluginOption} from "vite";
import react from '@vitejs/plugin-react'

const ssrModulePlugin = ({scriptPath, afterDefaultMiddlewares = false}: {scriptPath: string; afterDefaultMiddlewares?: boolean}): PluginOption => {
    return {
        name: "vite-express-plugin",
        configureServer: async (server) => {
            const injectMiddleware = () => {
                server.middlewares.use(async (req, res, next) => {
                    try {
                        const { app } = await server.ssrLoadModule(scriptPath);
                        app(req, res, next);
                    } catch (err) {
                        console.error(err);
                    }
                });
            }

            if (!afterDefaultMiddlewares) {
                injectMiddleware();
            }

            // inject a middleware after internal middlewares
            return () => {
                if (afterDefaultMiddlewares) {
                    injectMiddleware();
                }
            }
        }
    };
}

export default defineConfig({
    plugins: [
        react(),
        ssrModulePlugin({scriptPath: './src/server-api/api-app.ts'}),
        ssrModulePlugin({scriptPath: './src/server/server-app.tsx', afterDefaultMiddlewares: true}),
    ],
    server: {
        port: 3000,
    }
});
