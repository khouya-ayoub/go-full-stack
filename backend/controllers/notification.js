const conn = require('./connexion').connexion;
const log = require('../log_server/log_server');
const webpush = require('web-push');

// TODO :
const publicVapidKey  =  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey =  "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";
webpush.setVapidDetails("mailto:",publicVapidKey,privateVapidKey);

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
    },
    subscribeUser : (request, response, next) => {
        const subscription = request.body;
        response.status(201).json({ message: "MOI Serveur !" });
        const payload = JSON.stringify({
            title: "Back End Say HELLO",
            description: "SERVER"
        });
        //////////////////////////////////////////////
        webpush.sendNotification(subscription, payload)
            .catch(err => {
                console.log(err)
            });
        ////////////////////////////////////////////////
        setTimeout(() => {
                webpush.sendNotification(subscription,
                    JSON.stringify({
                        title: "Apres 10 secs !",
                        description: "Apres "
                    })
                    )
                    .catch(err => {
                        console.log(err)
                    });
        },
            10000);
        /////////////////////////////////////////////
        setTimeout(() => {
                webpush.sendNotification(subscription,
                    JSON.stringify({
                        title: "APRES !",
                        description: "APRES "
                    })
                )
                    .catch(err => {
                        console.log(err)
                    });
            },
            30000);
    }
}

module.exports = notif_functions;
