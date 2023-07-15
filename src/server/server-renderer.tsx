import React from 'react';
import express from 'express';
import {RendererOutput} from './server-app.tsx';
import ReactDOM from 'react-dom/server';
import {App} from '../client/app.tsx';
import {StaticRouter} from 'react-router-dom/server';

export interface ServerRendererProps {
    statusCode: number;
}
export interface OnRenderProps<T> {
    /**
     * Way for component to pass data to parent when using renderToString
     */
    onRender?: (data: T) => void;
}

const createServerRendererApp = () => {
    const app = express();

    app.get<{}, {}, {}, {}, {output: RendererOutput}>('*', async (req, res, next) => {
        const url = req.originalUrl;

        const context = {statusCode: 200};

        const html = '<!DOCTYPE html>' + ReactDOM.renderToString(
            <html lang="en">
                <head>
                    <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>
                <body>
                    <div id="app">
                        <StaticRouter location={url}>
                            <App
                                onRender={({statusCode}) => {
                                    context.statusCode = statusCode;
                                }}
                            />
                        </StaticRouter>
                    </div>
                </body>
                <script type="module" src="/src/client/client-app.tsx"></script>
            </html>
        );
        const statusCode = context.statusCode;

        res.locals.output = {
            html,
            statusCode,
        }

        next();
    });

    return app;
};

export const serverRendererApp = createServerRendererApp();
