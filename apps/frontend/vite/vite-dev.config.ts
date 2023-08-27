import react from '@vitejs/plugin-react';
import {PluginOption, defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const ssrModulePlugin = ({
    scriptPath,
    afterDefaultMiddlewares = false,
}: {
    scriptPath: string;
    afterDefaultMiddlewares?: boolean;
}): PluginOption => {
    return {
        name: 'vite-express-plugin',
        configureServer: async (server) => {
            const injectMiddleware = () => {
                server.middlewares.use(async (req, res, next) => {
                    try {
                        const {createApp} = await server.ssrLoadModule(scriptPath);
                        const app = await createApp();
                        app(req, res, next);
                    } catch (err) {
                        console.error(err);
                    }
                });
            };

            if (!afterDefaultMiddlewares) {
                injectMiddleware();
            }

            // inject a middleware after internal middlewares
            return () => {
                if (afterDefaultMiddlewares) {
                    injectMiddleware();
                }
            };
        },
    };
};

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        ssrModulePlugin({scriptPath: './src/server-api/api-app.ts'}),
        ssrModulePlugin({scriptPath: './src/server/server-app.tsx', afterDefaultMiddlewares: true}),
    ],
    server: {
        port: 3000,
    },
});
