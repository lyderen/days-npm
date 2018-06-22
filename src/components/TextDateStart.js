import React from 'react';


export const TextDateStart = (day) => (
    
 <div>
 תאריך התחלה הפלגה:<input type='text' value={day.day} disabled/> 
 </div>
);


export const TextDateEnd = (day) => (
    <div>
    תאריך סיום הפלגה:<input type='text'  value={day.day} disabled/> 
    </div>
   );
   