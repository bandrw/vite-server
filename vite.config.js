import {defineConfig} from "vite";

const viteExpressPlugin = (path) => {
    return {
        name: "vite-express-plugin",
        configureServer: async (server) => {
            server.middlewares.use(async (req, res, next) => {
                try {
                    const { app } = await server.ssrLoadModule(path);
                    app(req, res, next);
                } catch (err) {
                    console.error(err);
                }
            });
        },
    };
}

export default defineConfig({
    plugins: [viteExpressPlugin('./src/server/server-app.js')],
    server: {
        port: 3000,
    }
});
