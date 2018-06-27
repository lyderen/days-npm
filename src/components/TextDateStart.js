import React from 'react';


export const TextDateStart = (day) => (
    
 <div className="haflaga-text-start">
 <input placeholder="תאריך התחלת הפלגה" type='text' value={day.day} disabled/> 
 </div>
);


export const TextDateEnd = (day) => (
    <div className="haflaga-text-end">
    <input placeholder="תאריך סיום הפלגה" type='text'  value={day.day} disabled/> 
    </div>
   );
   