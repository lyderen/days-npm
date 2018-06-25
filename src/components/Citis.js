import React from 'react' ;



//  const Citis = (props) => (
//     <div className='conteinor'>
//     <select className='form-control form-control-lg selection' name={props.name} value={props.value} onChange={props.getCitiName}>
//     <option>תל אביב</option>
//     <option>חיפה</option>
//     <option>ירושלים</option>
//     <option>באר שבע</option>
//     <option>אילת</option>
//     </select>
//     </div>
// )

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