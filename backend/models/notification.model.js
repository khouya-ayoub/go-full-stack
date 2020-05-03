/**
 * Todo:
 * */

const notification_model = {
    createNotification: (title, description) => {
        let notification = {
            title: title,
            icon: '/logo-cermix.png',
            description: description,
        };
        return notification;
    }
};

module.exports = notification_model;
