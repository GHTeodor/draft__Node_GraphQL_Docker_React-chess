const {WELCOME, USER_BLOCKED, ORDER_CONFIRMED, FORGOT_PASSWORD} = require('../configs/email-action.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!!!'
    },

    [USER_BLOCKED]: {
        templateName: 'order-confirmed',
        subject: 'Order-confirmed!!!'
    },

    [ORDER_CONFIRMED]: {
        templateName: 'user-blocked',
        subject: 'User-blocked!!!'
    },

    [FORGOT_PASSWORD]: {
        templateName: 'forgot-password.pug',
        subject: 'Everybody forgot something. Dont worry )'
    }
};
