import React from 'react';

// counstart the block table at the courent month
// also check for each month first/last week
// is't a epmty squares that bee render to GUI
//

// // make for each indevidol day a <td>
 const  concatDaysInTable = (month) => { 
        
    return  Object.entries(month).map(([,value], i) => {
            return ( <td key={value.date} >
                
                {value.date}
                <input className='button-next rdo-btn' type='radio' name='day' value={value.date}></input>
            </td> )  
         });
         
};

// separated each week indise <tr> floowing the each week all sensetivitis
// 1 if for the first week in all month
// 2 if for month that old a 6 weeks 
// 3 if for last week in the month &  to get back empty squares 
// 4 if for each regular week (middel weeks in the month) 
 const collectAlldaysMonth = (week, month) => {    
      if(week[0].date === 1){
          const FirstDayMonth = week[0].weekDay -1;
        return (
            <tr> 
            {emptySquares(FirstDayMonth,100)}
              { concatDaysInTable(week)}
            </tr>
        );
      }else if(week.length === 8){
          const lastday = week[week.length - 1]
          const sliceWeek = week.slice(0,7);
          const finalWeek = (<tr>{concatDaysInTable(sliceWeek)}</tr>);

              return finalWeek;
              } else if( month && week[week.length -1].date === month[month.length -1].date){
                  const lastDayMonth =  7 - week[week.length - 1].weekDay;
                    return (<tr>{concatDaysInTable(week)}
                               {emptySquares(lastDayMonth,35)}
                         </tr>)
               } else
                  return (
                    <tr>  
                     {concatDaysInTable(week)}
                   </tr>
                 );
    
}

// general functon that render all table with comunicet with function above
 const getingallDayOfManth = (month) =>{
    var rangeOfsliceArray;
    var boli = false;
    if(month[0].weekDay === 7 && month[month.length -1].weekDay === 1) {
        console.log('yes');
         rangeOfsliceArray = 29;
         boli = true;
    }else {
        rangeOfsliceArray = 30;
    }
    const wD = month[0].weekDay - 1;
    return (
       <tbody>
       {collectAlldaysMonth(month.slice(0,7 - wD))}
       {collectAlldaysMonth(month.slice(7 - wD, 14 - wD))}
       {collectAlldaysMonth(month.slice(14 - wD, 21 - wD))}
       {collectAlldaysMonth(month.slice(21 - wD, 28 - wD))}
       {collectAlldaysMonth(month.slice(28 - wD, rangeOfsliceArray),month)}
       {boli  && collectAlldaysMonth(month.slice(rangeOfsliceArray , 30),month)}
       {month[0].wD}
       </tbody>
    )
}

 const nameOfCourentMonth = (month) => {
    const hebrewMonth = month[0].month_name;
    return hebrewMonth;
}

// return a emptys squares for the table
 const emptySquares = (day,num) => {
     if(day > 0){
         var i = num;
         const emptyDays = Array.from(Array(day));
         return  emptyDays.map((day) => {
             i += 1;
             return ( <td key={i}> </td>)
            });
        }

}
module.exports ={getingallDayOfManth,nameOfCourentMonth}
// export default {getingallDayOfManth,nameOfCourentMonth};