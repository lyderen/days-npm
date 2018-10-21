import axios from 'axios';

export const getNotes = (notes) => ({
    type:'GET_NOTES',
    notes
});

export const startGetNotes = () => {
    return (dispatch) => {
         return axios.get('/admindashbord/notes').then((respons) => {
             const notes = [];

             respons.data.notes.forEach((note) => {
                 notes.push(note)
             });
             dispatch(getNotes(notes));
         });
    };
};

export const noteDone = (id) => ({
  type: 'NOTE_DONE',
  id
})

export const startNoteDone = (id) => {
    return (dispatch) => {
        return axios.post('/admindashbord/notes/edit',{body:id}).then((response) => {
            dispatch(noteDone(id))
        })
    }
}