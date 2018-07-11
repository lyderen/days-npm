import moment from 'moment';
//GET VISIBALE EXPENSES {text, sortBy, startDate, endDate}
export default (days, sortBy ) => {
    return days.filter((day) => {
        const dateEvent = moment(day.date);
        // const typeSuspc = typeSuspc ? 
    //     const startDateMatch = startDate ? startDate.isSameOrBefore(createAtMoment, 'day') : true ;
    //     const endDateMatch = endDate ? endDate.isSameOrAfter(createAtMoment, 'day') : true ;
        const typeSuspc = day.typeSuspc;
        
           return  typeSuspc && dateEvent ;
    }).sort((a,b) => {
        if(sortBy === 'Date'){
            return a.date < b.date ? -1 : 1;
        }else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });
};