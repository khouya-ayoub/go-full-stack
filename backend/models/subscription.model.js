/**
 * Todo: doc subscription model
 * */

const subscription_model = {
    createSubrcription: (endpoint, auth, p256dh) => {
        /**
         * */
        let subscription = {
            endpoint: endpoint,
            keys: {
                auth: auth,
                p256dh: p256dh
            }
        };
        return subscription;
    }
};

module.exports = subscription_model;
