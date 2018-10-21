import axios from 'axios';

import getMsg from '../actions/serverMsg';

export const getNote = (note) => ({
    type: 'USER_SEND_NOTE',
    note
})

export const startGetNote = (noteData = {}) => {
    return (dispatch) => {
      const {
          email = '',
          title = '',
          topic = '',
          lastName = ''
      } = noteData; 
      const note = {email, title, topic, lastName};

       axios.post('/connect',{body:note}).then((respons) => {
           const note = respons.data;
             dispatch(getNote(respons.data))
       }).catch((e) => {
         console.log(e)
       }).catch((e) => {
           console.log(e);
       })
         
    }

}

export const noteDone = (id) => ({
  type: 'NOTE_DONE',
  id
});

export const startNoteDone  = (note) => {
    
}