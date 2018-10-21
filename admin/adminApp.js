//import validator from 'validator';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
// import AppRoute from './routers/AppRoute';

// import {addDays, removeDay, editday} from './actions/days';
// import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './actions/filters';

import App from './components/Main';


// import 'normalize.css/normalize.css';
import './styles/style.scss';



const store = configureStore();



// store.dispatch(setTextFilter('bill'));
//const state = store.getState();

  

   const jsx = (
     <Provider store={store} >
     <App />
     </Provider>
   );
 
  ReactDOM.render(jsx,document.getElementById('adminApp'))