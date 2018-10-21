import React from 'react' ;
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';


import TableResualt from './TableResualt';
import SearchArea from './SearchArea';
import Notes from './Notes';
import NotesTableResualt from './NotesTableResualt';


class App extends React.Component{
   constructor(props){
       super(props);
       this.state = {
           days: [],
           notes: [],
           citi: "",
           date: false,
           load: false
       }
   }
   getDaysFromDb = (e) => {
      const days = e;
     this.setState(() => ({ days }));
     console.log(this.state.days);
     this.applayLoad();
   }
   heandelDeleteItem = (e) => {
    console.log(e.target.value);
   }
   applayLoad = () => {
    if(!this.state.load){    
        this.setState(() => ({ load: true}))
    }else if(this.state.load){
     this.setState(() => ({ load: false }))
    }
   }
   getNotes = (notes) => {
       
   this.setState(() => ({notes}))
   }
   render() {
       return (
       <div className='conteinor'>
       <SearchArea  callbBackToGetDays={(days) => this.getDaysFromDb (days)} callBackToApplyLoadEle={this.applayLoad} />
       {this.state.load && <h4 className='loadMsg'> loading....</h4>}
         {this.state.days.length != 0  &&  <TableResualt sendDays={this.state.days} /> }
         <div className='kav'> <p >-----------------------------------------------------------------</p> </div>
         <Notes callToSendNotes={(notes) => this.getNotes(notes)}/>
         {this.props.notes.length > 0 && <NotesTableResualt />}
       </div>
       )
    }
}

const mapStateToProps = (state,props) => {
    return {
        notes   : state.notes
      }
} 

export default connect(mapStateToProps)(App);