import express from "express";
import React from 'react';
import {serverRendererApp} from './server-renderer.tsx';

export interface ServerAppContext {
    headTags?: React.ReactNode;
}

/**
 * Check vite.transformIndexHtml
 */
const viteScript = `
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
`;

const createServerApp = () => {
    const app = express();

    app.use<{}, {}, {}, {}, ServerAppContext>(
        async (req, res, next) => {
            res.locals.headTags = (
                <script type="module" dangerouslySetInnerHTML={{__html: viteScript}}/>
            );
            next();
        },
        serverRendererApp,
    );

    return app;
};

export const app = createServerApp();
