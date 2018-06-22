import React from 'react';

import {TextDateStart,TextDateEnd}  from './TextDateStart';

class HaflagaTime extends React.Component{
    constructor(props){
        super(props);

        this.state={
            startDay: this.props.sendStartDay,
            endDay: this.props.sendEndDay
        }

    };
    start = (e) =>{
        
    };
    end = (e) => {
        
    }
    render(){
        return(
            <div className='haflaga-area'>
            <TextDateStart  day={this.props.sendStartDay}/>
            <TextDateEnd day={this.props.sendEndDay} />
            </div>
        )
    }
} 

export default HaflagaTime;