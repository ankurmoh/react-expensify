// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import 'normalize.css/normalize.css';
// import configureStore from './store/configureStore';
// import './styles/styles.scss';
// import AppRouter from './routers/AppRouter'
// import {addExpense} from './actions/expenses';
// import {setTextFilter} from './actions/filters';
// import getVisibleExpenses from './selectors/expenses';

// const store = configureStore();

// store.dispatch(addExpense({description: 'Water Bill', amount : 4500}));
// store.dispatch(addExpense({description:'Gas Bill', createdAt: 1000}));
// store.dispatch(addExpense({description: 'Rent', amount : 109500}));
// //store.dispatch(setTextFilter('water'));

// // setTimeout(() => {
// //     store.dispatch(setTextFilter('bill'));
// // }, 3000)

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

// console.log(visibleExpenses);

// const jsx = (
//     <Provider store={store}>
//         <AppRouter />
//     </Provider>
// );

// ReactDOM.render(jsx,document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

  
