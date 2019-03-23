import 'dotenv/config';
import uuidv4 from 'uuid/v4';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import models, { connectDb } from './models';
import { connect } from 'http2';

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

connectDb().then(async () => {
    if (process.env.ERASE_DB_ON_SYNC) {
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({}),
        ]);
    }

    if (process.env.SEED_DB_WITH_USERS_AND_MESSAGES) {
        createUsersWithMessages();
    }
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}...`),
    );
});

const createUsersWithMessages = async () => {
    const user1 = new models.User({
        username: 'Sebbe',
    });
    const user2 = new models.User({
        username: 'Henke',
    });

    const message1 = new models.Message({
        text: 'Setup the MEN structure is complete!',
        user: user1.id,
    });

    const message2 = new models.Message({
        text: 'Maybe time to add the R to complete MERN?',
        user: user2.id,
    });

    const message3 = new models.Message({
        text: 'By R, I mean React =)',
        user: user2.id,
    });

    const message4 = new models.Message({
        text:
            'Nice, that means MongoDb, Express, React and Node. Full Stack baby!',
        user: user1.id,
    });

    await message1.save();
    await message2.save();
    await message3.save();
    await message4.save();

    await user1.save();
    await user2.save();
};
