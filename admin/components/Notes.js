import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {startGetNotes} from '../src/actions/notes';

class Notes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notes: ''
        }
    }
    heandlClik = () => {
           this.props.dispatch(startGetNotes()).then(() => {
               this.props.callToSendNotes(this.props.notes)
           })
    }
    render(){
        return(
            <div className="container notesBtn">
            <button type="button" className="btn btn-info btn-lg btn-block" onClick={this.heandlClik}>הערות שנשלחו למערכת</button>
            </div>
        )
    }
}

const mapStateToProps = (state,props) => { 
    return {
        notes   : state.notes
      }
} 

export default connect(mapStateToProps)(Notes);