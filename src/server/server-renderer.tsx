import React from 'react';
import express from 'express';
import {ServerAppContext} from './server-app.tsx';
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
            <script type="module" src="/src/client/client-app.tsx"></script>
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

export const serverRendererApp = createServerRendererApp();
