const conn = require('./connexion').connexion;
const log = require('../log_server/log_server');

const notif_functions = {
    getMyNotifications : (request, response, next) => {
        /**
         * Function helps user to get his own notifications
         * */
        // select all my notifications not read
        let sql = "SELECT mno_titre, mno_description FROM mb_envoie e, mb_notifcations n" +
            " WHERE e.men_idnotification = n.mno_idnotification AND e.men_etatread = 0 AND e.men_iduser = ?";
        conn.query(sql,[request.body.idUser], (err, res) => {
            if (err) {
                log(__filename + " getMyNotifications()", "Error while searching for notifications for the user " + request.body.idUser);
                return response.status(400).json({ error: 'error ' + err, message: 'Error while searching for notifications '});
            }
            log(__filename + " getMyNotifications()", "The user " + request.body.idUser + " has asked for his notifications ");
            return response.status(200).json(res);
        });
    }
}

module.exports = notif_functions;
