import express, * as Express from "express";
import React from 'react';
import {createApp as createServerRendererApp} from './server-renderer.tsx';

const isProduction = process.env.NODE_ENV === 'production';

export interface ServerAppContext {
    headTags?: React.ReactNode;
}

/**
 * Check vite.transformIndexHtml
 */
const viteReactRefreshScript = `
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
`;

const reactRefreshMiddleware = async (req: Express.Request, res: Express.Response<unknown, ServerAppContext>, next: Express.NextFunction) => {
    res.locals.headTags = (
        <script type="module" dangerouslySetInnerHTML={{__html: viteReactRefreshScript}}/>
    );
    next();
};

const createServerApp = async () => {
    const app = express();

    const serverRendererApp = await createServerRendererApp();

    if (!isProduction) {
        app.use(reactRefreshMiddleware);
    }

    app.use(serverRendererApp);

    return app;
};

export const createApp = createServerApp;
