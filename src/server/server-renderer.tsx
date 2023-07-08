import express from 'express';
import {RendererOutput} from './server-app.tsx';
import ReactDOM from 'react-dom/server';
import {App} from '../client/app.tsx';
import {HTMLBuilder} from './tools/html-builder.ts';

const createServerRendererApp = () => {
    const app = express();

    app.get<{}, {}, {}, {}, {output: RendererOutput}>('/', (req, res, next) => {
        const html = new HTMLBuilder({
            tagName: 'html',
            attributes: {
                lang: 'en',
            },
            children: [
                new HTMLBuilder({
                    tagName: 'head',
                }),
                new HTMLBuilder({
                    tagName: 'body',
                    children: [
                        new HTMLBuilder({
                            tagName: 'div',
                            attributes: {
                                id: 'app',
                            },
                            children: [
                                ReactDOM.renderToString(<App />),
                            ],
                        }),
                    ],
                }),
                new HTMLBuilder({
                    tagName: 'script',
                    attributes: {
                        type: 'module',
                        src: '/src/client/client-app.tsx',
                    },
                }),
            ],
        });

        res.locals.output = {
            html: html.outerHTML,
            statusCode: 200,
        }

        next();
    });

    return app;
};

export const serverRendererApp = createServerRendererApp();
