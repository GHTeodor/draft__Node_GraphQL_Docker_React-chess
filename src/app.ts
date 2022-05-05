import express from 'express';

import { config } from './configs/config';
import { apiRouter } from './routes/apiRouter';

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use(apiRouter);

const { PORT } = config;
app.listen(PORT, () => console.log(`Server has been started on PORT: ${PORT} 🚀🚀🚀`));
