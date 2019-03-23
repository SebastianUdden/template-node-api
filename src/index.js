import 'dotenv/config';
import uuidv4 from 'uuid/v4';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import models from './models';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    };
    next();
});

app.use('/session', routes.session);
app.use('/users', routes.users);
app.use('/messages', routes.messages);

// Listen
app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}...`),
);
