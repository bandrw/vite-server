import {createApp as createServerApp} from '../../build/server/server-app.js';
import {createApp as createServerApiApp} from '../../build/server-api/api-app.js';
import express from "express";
import path from "path";

const createApp = async () => {
    const app = express();

    const serverApp = await createServerApp();
    const serverApiApp = await createServerApiApp();

    app.use('/static', express.static(path.resolve('./build/client'), {maxAge: 365 * 24 * 60 * 60 * 1000}));

    app.use(serverApiApp);

    app.use(serverApp);

    return app;
};

;(async () => {
    const app = await createApp();

    app.listen(3000, () => {
        console.log('> App started');
    });
})();
