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
            <select className='form-control form-control-lg selection' onChange={this.handleSelect}>
            <option placeholder='בחרי זמן עונה'></option>
            <option>לילה</option>
            <option>יום</option>
            </select>
            </div>
        )
    }
}

export default SuspiciousDayTime ;
