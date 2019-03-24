import models from '../models';

export const createUsersWithMessages = async () => {
    const user1 = new models.User({
        username: 'Sebbe',
        email: 'sun@email.com',
        firstname: 'Sebastian',
        lastname: 'Uddén',
        location: 'Sweden',
        image:
            'https://movies4maniacs.liberty.me/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg',
        createdAt: new Date(),
    });
    const user2 = new models.User({
        username: 'Henke',
        email: 'hfm@email.com',
        firstname: 'Henrik',
        lastname: 'Fridström',
        location: 'Sweden',
        image:
            'https://assets1.ignimgs.com/2019/01/11/avatar3d-1280-1547246301612_1280w.jpg',
        createdAt: new Date(),
    });

    const message1 = new models.Message({
        text: 'Setup the MEN structure is complete!',
        user: user1.id,
        createdAt: new Date(),
    });

    const message2 = new models.Message({
        text: 'Maybe time to add the R to complete MERN?',
        user: user2.id,
        createdAt: new Date(),
    });

    const message3 = new models.Message({
        text: 'By R, I mean React =)',
        user: user2.id,
        createdAt: new Date(),
    });

    const message4 = new models.Message({
        text:
            'Nice, that means MongoDb, Express, React and Node. Full Stack baby!',
        user: user1.id,
        createdAt: new Date(),
    });

    await message1.save();
    await message2.save();
    await message3.save();
    await message4.save();

    await user1.save();
    await user2.save();
};
