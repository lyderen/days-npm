import React from 'react' ;



class Citis extends React.Component{
   constructor(props){
       super(props);
       this.state = {
           citi: undefined
       }
   }
   handleSelect = (e)  => {
       const citi  =  e.target.value ;
       this.setState(() => ({ citi }));
       this.props.callbBacktoSelectCiti(citi);
   }
   render() {
       return (
       <div className='conteinor'>
       <select className='form-control form-control-lg selection' placeholder='בחר עיר' onChange={this.handleSelect}>
       <option></option>
       <option>תל אביב</option>
       <option>חיפה</option>
       <option>ירושלים</option>
       <option>באר שבע</option>
       <option>אילת</option>
       </select>
       </div>
       )
    }
}

export default Citis;