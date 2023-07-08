import express from "express";

const createServerApp = () => {
    const app = express();

    app.get('/', (req, res) => {
        res.status(200).json({status: 'okay', message: `i am server-app.js! ${Math.random()}`})
    })

    return app;
};

export const app = createServerApp();
