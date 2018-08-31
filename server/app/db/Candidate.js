const conn = require('./conn');

const Candidate = conn.define('candidate', {
    firstName: conn.Sequelize.STRING,
    lastName: conn.Sequelize.STRING,
    email: {
        type: conn.Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    phone: {
        type: conn.Sequelize.STRING
    },
    driversLicense: {
        type: conn.Sequelize.STRING
    },
    experience: conn.Sequelize.STRING,
    city: conn.Sequelize.STRING,
    state: conn.Sequelize.STRING

})

module.exports = Candidate;