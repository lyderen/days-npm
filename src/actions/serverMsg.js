import axios from 'axios';

// GET_MESSAGE

export const getMsg = (msg) => ({
     type: 'RECEIVE_MSG',
     msg
    });
