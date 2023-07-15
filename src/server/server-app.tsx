import express from "express";
import {serverRendererApp} from './server-renderer.tsx';

export interface RendererOutput {
    html: string;
    statusCode: number;
}

const createServerApp = async () => {
    const app = express();

    const vite = await (await import('vite')).createServer();

    app.use<{}, {}, {}, {}, {output: RendererOutput}>(
        serverRendererApp,
        async (req, res, next) => {
            const url = req.originalUrl;

            const {output} = res.locals;
            if (output === undefined) {
                next();
                return;
            }

            const viteTransformedHtml = await vite.transformIndexHtml(url, output.html);

            res.setHeader('Content-Type', 'text/html');

            res
                .status(output.statusCode)
                .send(viteTransformedHtml);
        },
    );

    return app;
};

export const app = createServerApp();
