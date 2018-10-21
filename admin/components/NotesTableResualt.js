/// table for notes resualt 
import React from 'react';
import {connect } from 'react-redux';

import {startNoteDone} from '../src/actions/notes';
import Alert from '../components/Alert';

const lastTd = {
    borderColor: 'white'
  };

class NotesTableResalt extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadAlert: false

        }
    }
    handel = (e) => {
        const id = e.target.value;
          if(id){
            this.props.dispatch(startNoteDone(id)).then(() => {
                this.setState(() => ({ loadAlert: true}));

                setTimeout(() => {
                    this.setState(() => ({ loadAlert: false}));
                },2000)
            })
          }
    }
 render(){
      return(
        <div className='container '>
        {this.state.loadAlert && <Alert msg={'בקשה טופלה'} cls={'alert-success'} />}
        <table  className="table table-bordered">
        <thead>
           <tr>
             <th scope='col'>כותרת</th>
             <th scope='col'>נושא</th>
             <th scope='col'>שולח </th>
           </tr>
        </thead>
        <tbody>
         {this.props.notes.map((note,i) => {
             return(
                  <tr data-toggle="tooltip" data-placement="top" key={i}>
                   <td className="tdNote">{note.title}</td>
                   <td className="tdNote">{note.topic}</td>
                   <td className="tdNote">{note.email ? note.email : 'Anonymous'}</td>
                   <td className='lastTd' style={lastTd}><button type="button" className="btn btn-info" value={note._id} onClick={this.handel}>טופל</button></td>
                 </tr>
             )
         })}
        </tbody>
        </table>
      </div>
      )
  }
}

const mapStateToProps = (state,props) => {
    return {
        notes   : state.notes
      }
} 

export default connect(mapStateToProps)(NotesTableResalt);