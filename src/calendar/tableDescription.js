import React from 'react';

import convertNumberDateToABC from '../javaScriptFiles/convetNumberDateToABC';

const TableDescription = ({date,weekDaye}) =>  (
    <td name={date}>
         {date = convertNumberDateToABC(date)}
        
    </td>
);



export default TableDescription;


