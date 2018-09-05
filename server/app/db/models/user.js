'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;
const md5 = require( 'crypto-md5' );

const User = db.define('user', {
    userName: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }

}, {
    hooks: {
        beforeCreate( user ) {
            let password = user.password;
            user.password = md5(password, 'hex');
        },
        beforeBulkCreate( user ) {
            users = users.map( user => {
                let password = user.password;
                user.password = md5(password, 'hex');
            })
            return users;
        }

    },

})

User.findByPassword = function(credentials){

            if ( !credentials ) throw new Error( 'No credentials provided' );
            if ( !credentials.password ) throw new Error( 'Password must be included in credentials' );

            credentials.password = md5( credentials.password, 'hex' );

            return User.findOne( { where: credentials } )

        }

module.exports = User;
