const {WELCOME, USER_BLOCKED, ORDER_CONFIRMED} = require('../configs/email-action.enum');

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
    }
};
