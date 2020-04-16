
const webpush = require('web-push');
const databaseController = require('./data-base');

// TODO : placer !
const publicVapidKey  =  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey =  "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";


const notif_functions = {
    subscribeUser : (request, response, next) => {
        webpush.setVapidDetails("mailto:", publicVapidKey, privateVapidKey);
        const idUser = request.body.idUser;
        const subscription = request.body.subNot;

        //databaseController.saveSubscription(request.body);

        notif_functions.sendNotificationToUsers(2);

        const payload = JSON.stringify({
            title: "SUBSCRIPTION",
            description: "SUBSCRIPTION AU SERVICE"
        });
        webpush.sendNotification(subscription, payload)
            .catch(err => {
                console.log(err)
            });
    },
    sendNotificationToUsers: (id_user) => {
        // todo : send notification to user
        webpush.setVapidDetails("mailto:",publicVapidKey, privateVapidKey);

        Promise.all([databaseController.promiseGetNotifications(id_user), databaseController.promiseGetSubscription(id_user)])
            .then((values) => {
                let listNotifications = [];
                let listSubscriptions = [];

                listNotifications = values[0];
                listSubscriptions = values[1];

                if (listSubscriptions.length === 0 || listNotifications.length === 0) {
                    console.log("Rien à envoyer !");
                }
                else {
                    for (let not = 0; not < listNotifications.length; not ++) {
                        for (let sub = 0; sub < listSubscriptions.length; sub ++) {
                            webpush.sendNotification(listSubscriptions[sub], JSON.stringify(listNotifications[not]))
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    }
                }

            });
    }
};

module.exports = notif_functions;
