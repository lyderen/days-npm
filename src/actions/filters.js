export const setTextFilter = (updates) => ({
    type: 'SET_TEXT_FILTER',
    updates
  });
  
  export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
  });
  
  export  const sortByDate = () => ({
      type: 'SORT_BY_DATE'
  });
  
  export const setStartDate = (update) => ({
      type: 'START_DATE',
      update
  });
  
  export  const setEndDate = (update) => ({
      type: 'END_DATE',
      update
  });
  