import React from 'react';


class AcordingTtoButtons extends React.Component{
    constructor(props){
        super(props);
        this.state ={
          acording: '',
          chabadList: false,
          sfardList: false,
          ashakenazList: false
        } 
    };
    ashkenaz = () => {
        this.setState(() => ({acording: 'ashkenaz'}));
         if(this.state.ashakenazList === false){
            this.state.ashakenazList = true;
         }else {
            this.state.ashakenazList = false;
         }
     
    };
    sfard = () => {
        this.setState(() => ({acording: 'sfard'}));
        if(this.state.sfardList === false){
            this.state.sfardList = true;
         }else {
            this.state.sfardList = false;
         }
    };
    chabad  = () => {
        this.setState(() => ({acording: 'chabad'}));
        if(this.state.chabadList === false){
            this.state.chabadList = true;
         }else {
            this.state.chabadList = false;
            this.haflagaShowArea();
         }

    };
    haflagaShowArea = () => {
        if(this.props.sendApply === false && this.state.chabadList)
        this.props.callBackToParent(true);
        else if(this.props.sendApply  || this.state.chabadList) {
            this.props.callBackToParent(false);
            this.props.callBackToParentClearHaflaga(1);
        }
    }
    render(){
        return(
        <div className="acording-to-btn">
            <div className='btn-group btn-group-lg' role="group" >
            <div className='first-btn'>
            <button type='button' className='btn btn-secondary' onClick={this.ashkenaz} >אשכנז</button>
               {this.state.ashakenazList && <ul className='ashakenaz-list'>
                 <li><p>לא זמין כרגע</p></li> 
               </ul>}
            </div>
            <div className='second-btn'>
            <button type='button' className='btn btn-secondary' onClick={this.chabad} >חב"ד</button> 
               { this.state.chabadList &&<ul className='chabad-list'>
                    <li>עונת בינונית </li>
                    <li>עונת החודש</li>
                    <li><button type='button' className='btn btn-outline-info haflaga-chabad-btn' onClick={this.haflagaShowArea}>עונת הפלגה </button></li>
                </ul>}
            </div>
            <div className='thered-btn'>
            <button  type='button' className='btn btn-secondary' onClick={this.sfard} >ספרד</button> 
                {this.state.sfardList &&<ul className='sfard-list'>
                    <li><p>לא זמין כרגע</p></li> 
                </ul>}
            </div>
            </div>
           </div> 
        )
    }
}

export default AcordingTtoButtons;