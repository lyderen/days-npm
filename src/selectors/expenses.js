// import moment from 'moment';
// //GET VISIBALE EXPENSES
// export default (days, {text, sortBy, startDate, endDate}) => {
//     return days.filter((day) => {
//         const createAtMoment = moment(day.createAt);
//         const startDateMatch = startDate ? startDate.isSameOrBefore(createAtMoment, 'day') : true ;
//         const endDateMatch = endDate ? endDate.isSameOrAfter(createAtMoment, 'day') : true ;
//         const textMatch = day.description.toLowerCase().includes(text.toLowerCase())
        
//            return startDateMatch && endDateMatch && textMatch;
//     }).sort((a,b) => {
//         if(sortBy === 'date'){
//             return a.createAt < b.createAt ? 1 : -1;
//         }else if (sortBy === 'amount'){
//             return a.amount < b.amount ? 1 : -1;
//         }
//     });
// };