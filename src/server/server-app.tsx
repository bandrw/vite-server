import express from "express";
import ReactDOM from 'react-dom/server';
import {App} from '../client/app.tsx';

const createServerApp = async () => {
    const app = express();

    const vite = await (await import('vite')).createServer();

    app.get('/', async (req, res) => {
        const url = req.originalUrl;
        const appHtml = ReactDOM.renderToString(<App />);

        let html = `
<html lang="en">

<body>
<div id="app">${appHtml}</div>
</body>

<script type="module" src="/src/client/client-app.tsx"></script>

</html>
`

        html = await vite.transformIndexHtml(url, html);
        res
            .status(200)
            .setHeader('Content-Type', 'text/html')
            .send(html)
    })

    return app;
};

export const app = createServerApp();
