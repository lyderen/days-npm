import React from 'react' ;


class Citis extends React.Component{
   constructor(props){
       super(props);
       this.state = {
           citi: ""
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
       <select className='form-control form-control-lg selection' value={this.props.sendCiti} onChange={this.handleSelect}>
       <option value="none">בחרי עיר </option>
       <option value="תל אביב" >תל אביב</option>
       <option value="חיפה" >חיפה</option>
       <option value="ירושלים" >ירושלים</option>
       <option value="באר שבע" >באר שבע</option>
       <option value="אילת">אילת</option>
       </select>
       </div>
       )
    }
}

 export default Citis;