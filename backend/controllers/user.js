// import db_connexion module and all required modules
const db_conn = require('./connexion');
const log = require('../log_server/log_server');
// to crypt passwords
const bcrypt = require('bcrypt');
// for token
const jwt = require('jsonwebtoken');

// the connexion
const conn = db_conn.connexion;

const user_functions = {
    signup: (request, response, next) => {
        // first thing crypt the password
        bcrypt.hash(request.body.password, 10)
            .then(hash => {
                // when the password is crypted successfully
                let sql ="INSERT INTO mb_user(MUS_IDUSER,MUS_NOM, MUS_PRENOM, MUS_LOGIN, MUS_PASSWORD, MUS_FONCTION, MUS_QUICREAT, MUS_DATECREAT) VALUES(?,?,?,?,?,?,?)";
                let values = [null,'TT','TT',request.body.login,hash,'BACKEND','TEST','2020-03-21'];
                conn.query(sql, values, (err, res) => {
                    if (err || res.length === 0) {
                        log(__filename + " signup()", "error while creating a new user !");
                        return response.status(401).json({ error: 'error ' + err, message: 'No user !'});
                    } else {
                        log(__filename + " signup()", "user created successfully : " + request.body.login);
                        return response.status(200).json({
                            status: '200',
                            message: 'User created successfully !'
                        });
                    }
                });
            })
            .catch(error => response.status(500).json({
                error
            }));
    },
    signin: (request, response, next) => {
        // first look for the user login
        let sql = "SELECT * FROM mb_users WHERE mus_login = ?";
        conn.query(sql, [request.body.login], (err, res) => {
            // check if there is a login in the database
            if (err || (res.length === 0)) {
                log(__filename + " login()", "try to get unexcited user");
                return response.status(401).json({ error: 'error ' + err, message: 'No user !'});
            }
            // compare two passwords
            bcrypt.compare(request.body.password, res[0].MUS_PASSWORD)
                .then(valid => {
                    // if the two password are not equal
                    if (!valid) {
                        log(__filename + " login()", "password incorrect for : " + request.body.login);
                        return response.status(401).json({ error: 'error ', message: 'Password incorrect !'});
                    }
                    return response.status(200).json({
                        _userId: res[0].MUS_IDUSER,
                        token: jwt.sign(
                            { userId: res[0].MUS_IDUSER},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                        message:'Login successfully !'
                    });
                })
                .catch(error => response.status(500).json({ error }));
        });
    }
};

/**
 * Export module
 * */
module.exports = user_functions;
