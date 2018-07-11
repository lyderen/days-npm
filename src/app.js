//import validator from 'validator';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRoute from './routers/AppRoute';

import configureStore from './store/configureStore';
import {addDays, removeDay, editday} from './actions/days';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './actions/filters';


import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = configureStore();



// store.dispatch(setTextFilter('bill'));

const state = store.getState();
  

   const jsx = (
     <Provider store={store}> 
     <AppRoute />
      </Provider>
   );
 
  ReactDOM.render(jsx,document.getElementById('app'))