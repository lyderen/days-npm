import axios from 'axios';

import {addDays,startAddDay}  from '../actions/days.js';
import numberYearHebrew from '../javaScriptFiles/numbertYearHebrew';

const geocoder = new google.maps.Geocoder();

export default (obj,citi) =>{
 
      // slice the obj that we got 
       
    const suspiciousDayDate = new Date(obj.targetDay);
    obj.hebrew.year = numberYearHebrew(obj.hebrew.year);
     
       const yearA = suspiciousDayDate.getFullYear();
       const monthA = suspiciousDayDate.getMonth();
       const dayA = suspiciousDayDate.getDate();
      const timeForLocatin = new Date(yearA,monthA,dayA).getTime();
          
       let timeOFSet = new Date().getTimezoneOffset();
       if(timeOFSet < 0){
           timeOFSet = Math.abs(timeOFSet);
         }    
          
                geocoder.geocode( { "address": citi }, (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                        const location = results[0].geometry.location,
                            lat      = location.lat(),
                            lng      = location.lng();
                    
                    const URLsunShine = `https://safe-wave-98290.herokuapp.com/getingsunshinetimeaccordinglocation/${timeForLocatin}/${lat}/${lng}`;
                    
                    
                    return new axios.get(URLsunShine)  
                    .then((response) => {   
                        let sliceRise = `${parseInt(response.data.sunriseStr.split(':')[0]) + timeOFSet / 60}:${response.data.sunriseStr.split(':')[1] < 10 ? response.data.sunriseStr.split(':')[1] = 0+response.data.sunriseStr.split(':')[1]:response.data.sunriseStr.split(':')[1] }`;
                        let sliceSet = `${parseInt(response.data.sunsetstr.split(':')[0]) + timeOFSet / 60}:${response.data.sunsetstr.split(':')[1]  < 10 ? response.data.sunsetstr.split(':')[1] = 0+response.data.sunsetstr.split(':')[1]:response.data.sunsetstr.split(':')[1]}`;
                        const finalDay = {
                            sourceDate: obj.sourceDate,
                            typeSuspc: obj.typeSus,
                            timeSuspc: obj.timeSuspc,
                            date:suspiciousDayDate.getTime(),
                            hebrewDate: obj.hebrew,
                            createAt: new Date().getTime(),
                            sunRise: sliceRise,
                            sunSet: sliceSet,
                            citi: citi
                        };  
                        return finalDay; 
                    }).catch(console.error)  
                }
                });       
         
    
 }