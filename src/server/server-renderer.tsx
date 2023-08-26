import React from 'react';
import express from 'express';
import {ServerAppContext} from './server-app.tsx';
import ReactDOM from 'react-dom/server';
import {App} from '../client/app.tsx';
import {StaticRouter} from 'react-router-dom/server';

const isProduction = process.env.NODE_ENV === 'production';

export interface ServerRendererProps {
    statusCode: number;
}
export interface OnRenderProps<T> {
    /**
     * Way for component to pass data to parent when using renderToString
     */
    onRender?: (data: T) => void;
}

const createServerRendererApp = async () => {
    const app = express();

    const clientAppEntryPoint = await (async () => {
        if (isProduction) {
            const fileName = (await import('../../build/client/manifest.json')).default['src/client/client-app.tsx'].file;
            return `/static/${fileName}`;
        }
        return '/src/client/client-app.tsx';
    })();

    app.get<{}, {}, {}, {}, ServerAppContext>('*', async (req, res) => {
        const url = req.originalUrl;

        const context = {statusCode: 200};

        const {pipe, abort} = ReactDOM.renderToPipeableStream(
            <html lang="en">
            <head>
                <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                {res.locals.headTags}
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
            {isProduction ? (
                <script type="module" src={clientAppEntryPoint}></script>
            ) : (
                <script type="module" src={clientAppEntryPoint}></script>
            )}
            </html>,
            {
                onShellReady() {
                    res.statusCode = context.statusCode;
                    res.setHeader('Content-type', 'text/html');
                    pipe(res);
                },
                onShellError(err) {
                    res.statusCode = 500;
                    res.send(
                        ReactDOM.renderToString(<div>500 error page</div>)
                    );
                    console.error(err);
                },
            }
        );

        setTimeout(abort, 2000);
    });

    return app;
};

export const createApp = createServerRendererApp;
