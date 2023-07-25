import express from 'express';

const createApiApp = () => {
    const app = express();

    app.get('/api/items', (req, res) => {
        res.status(200).json({status: 'ok', data: 'hello there'});
    })

    return app;
}

export const app = createApiApp();
