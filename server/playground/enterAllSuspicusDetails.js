const enterAllSuspicusDetails = (typeSus,timeSuspc,targetDay,hebrew,sourceDate) =>{
      
        const suspiciousDayDate = new Date(targetDay);
        hebrew.year = numberYearHebrew(hebrew.year);
         let citi = this.props.snedCiti ? this.props.sendCiti : 'ירושלים';
            const URLlocation =  `https://maps.googleapis.com/maps/api/geocode/json?address=${citi}`;
                     
           const yearA = suspiciousDayDate.getFullYear();
           const monthA = suspiciousDayDate.getMonth();
           const dayA = suspiciousDayDate.getDate();
          const timeForLocatin = new Date(yearA,monthA,dayA).getTime();
              
           let timeOFSet = new Date().getTimezoneOffset();
           if(timeOFSet < 0){
               timeOFSet = Math.abs(timeOFSet);
             }    
     axios.get(URLlocation).then((response) => {
         if(response.data.status != 'OK'){
            throw new Error('לא ניתן למצוא את הכתובת');
          }
         const location =  response.data.results[0].geometry.location;        
         const URLsunShine = `https://safe-wave-98290.herokuapp.com/getingsunshinetimeaccordinglocation/${timeForLocatin}/${location.lat}/${location.lng}`;
              return new axios.get(URLsunShine)  
        }).then((response) => {   
            let sliceRise = `${parseInt(response.data.sunriseStr.split(':')[0]) + timeOFSet / 60}:${response.data.sunriseStr.split(':')[1] < 10 ? response.data.sunriseStr.split(':')[1] = 0+response.data.sunriseStr.split(':')[1]:response.data.sunriseStr.split(':')[1] }`;
            let sliceSet = `${parseInt(response.data.sunsetstr.split(':')[0]) + timeOFSet / 60}:${response.data.sunsetstr.split(':')[1]  < 10 ? response.data.sunsetstr.split(':')[1] = 0+response.data.sunsetstr.split(':')[1]:response.data.sunsetstr.split(':')[1]}`;
            const finalDay = {
                sourceDate: sourceDate,
                typeSuspc: typeSus,
                timeSuspc: timeSuspc,
                date:suspiciousDayDate.getTime(),
                hebrewDate: hebrew,
                createAt: new Date().getTime(),
                sunRise: sliceRise,
                sunSet: sliceSet
            };
            
            this.props.callBackToParent({finalDay});
            
           
        }).catch(console.error)     
     }