/**
 * This file contains all functions need to manipulate data from the data base.
 * Please be careful when you change something or you add something, and please
 * add a commenter line that describe your code you had added, and if you can
 * add a test-script for your code in file tests_data_base.js located in the
 * folder ../tests/tests_data_base.js. Thank you !
 * */

// import db_connexion module and all required modules
const db_conn = require('./connexion');
const log = require('../log_server/log_server');
const json = require('json');

// the connexion
const conn = db_conn.connexion;

const database_functions = {
    login: (request, response, next) => {
        /**
         * the login function
         * @first test for existing user login
         * @second compare of the password
         * @third return some information
         * TODO: change the third part to the necessary inf
         * @WARNING for each part we use a log system !
         * */
        let sql = "SELECT * FROM mb_users WHERE mus_login = ?";
        conn.query(sql, [request.params.login], (err, res) => {
            if (err || (res.length === 0)) {
                log(__filename + " login()", "try to get unexcited user");
                return response.status(401).json({ error: 'error ' + err, message: 'No user !'});
            } else {
                if (res[0].MUS_PASSWORD !== request.params.password) {
                    log(__filename + " login()", "password incorrect for : " + request.params.login);
                    return response.status(401).json({ error: 'error ', message: 'Password incorrect !'});
                }
                log(__filename + " login()", "login successfully : " + request.params.login);
                return response.status(200).json({
                    _id: res[0].MUS_IDUSER,
                    nom: res[0].MUS_NOM,
                    prenom: res[0].MUS_PRENOM,
                    user_function: res[0].MUS_FONCTION,
                    description:'Successful request !',
                    message:''
                });
            }
        });
    },
    checkForNotification: () => {
        /**
         * TODO: description of this function
         * */

    }
};

/**
 * Export module
 * */
module.exports = database_functions;
