import React from 'react';

class SuspiciousDayTime extends React.Component{
    state ={
        dayTime: undefined
    };
    handleSelect = (e)  => {
        const dayTime  =  e.target.value ;
        this.setState(() => ({ dayTime }));
        this.props.callBackToParent(dayTime);
    }
    render(){
        return (
            <div className='conteinor'>
            <select className='form-control form-control-lg selection' value={this.props.sendDayTime} onChange={this.handleSelect}>
            <option value="none" >בחרי זמן ביום</option>
            <option value="לילה">לילה</option>
            <option value="יום">יום</option>
            </select>
            </div>
        )
    }
}

export default SuspiciousDayTime ;
