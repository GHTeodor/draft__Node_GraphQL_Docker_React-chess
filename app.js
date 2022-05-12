import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import schema from './schema/schema.js';
import { config } from './configs/config.js';

const app = express();

app.use('/', graphqlHTTP({
    schema,
    graphiql: true
}));

const { PORT } = config;
app.listen(PORT, () => console.log(`App listening on PORT: ${ PORT } 🚀🚀🚀`));
