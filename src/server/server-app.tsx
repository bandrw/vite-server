import express from "express";
import ReactDOM from 'react-dom/server';
import {App} from '../client/app.tsx';

const createServerApp = () => {
    const app = express();

    app.get('/', (req, res) => {
        const appHtml = ReactDOM.renderToString(<App />);

        const html = `
<html>
<body>
<div id="app">${appHtml}</div>
</body>
<script type="module" src="/src/client/client-app.tsx"></script>
</html>
`

        res
            .status(200)
            .setHeader('Content-Type', 'text/html')
            .send(html)
    })

    return app;
};

export const app = createServerApp();
