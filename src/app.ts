import express, { Request, Response } from 'express';

import { config } from './configs/config';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.end();
});

const { PORT } = config;
app.listen(PORT, () => console.log(`Server has been started on PORT: ${PORT} 🚀🚀🚀`));
