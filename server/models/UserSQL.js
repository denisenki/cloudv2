const { Sequelize, DataTypes } = require('sequelize');


// const sequelize = new Sequelize('sys', 'root', 'Denisenko000111', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

const sequelizeCheck = async () => {
    try {

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

sequelizeCheck()

// sequelize.sync().then(result => {
//     console.log(result);
// })
//     .catch(err => console.log(err));

module.exports = (sequelize) => {
    const UserSQL = sequelize.define("UserSQL", {
        firstName: {
            type: Sequelize.STRING,
        },
        lastName: {
            type: Sequelize.STRING,
        },
    },
        {
            timestamps: false,
        });
    return UserSQL;
};
