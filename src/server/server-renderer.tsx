import express from 'express';
import {RendererOutput} from './server-app.tsx';
import ReactDOM from 'react-dom/server';
import {App} from '../client/app.tsx';

const createServerRendererApp = () => {
    const app = express();

    app.get<{}, {}, {}, {}, {output: RendererOutput}>('/', (req, res, next) => {
        const html = '<!DOCTYPE html>' + ReactDOM.renderToString(
            <html lang="en">
                <head>
                    <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>
                <body>
                    <div id="app">
                        <App />
                    </div>
                </body>
                <script type="module" src="/src/client/client-app.tsx"></script>
            </html>
        );

        res.locals.output = {
            html,
            statusCode: 200,
        }

        next();
    });

    return app;
};

export const serverRendererApp = createServerRendererApp();
