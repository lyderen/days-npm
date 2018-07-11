

export const userLogin = (userName) => ({
    type: 'USER_LOG_IN',
    userName
});

export const userLogOff = (userName) => ({
    type: 'USER_LOG_OFF',
    userName
});