"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _AppRouter = _interopRequireWildcard(require("./routers/AppRouter"));

var _configureStore = _interopRequireDefault(require("./store/configureStore"));

var _expenses = require("./actions/expenses");

var _auth = require("./actions/auth");

var _expenses2 = _interopRequireDefault(require("./selectors/expenses"));

require("normalize.css/normalize.css");

require("./styles/styles.scss");

require("react-dates/lib/css/_datepicker.css");

var _firebase = require("./firebase/firebase");

var _LoadingPage = _interopRequireDefault(require("./components/LoadingPage"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var store = (0, _configureStore["default"])();

var jsx = /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
  store: store
}, /*#__PURE__*/_react["default"].createElement(_AppRouter["default"], null));

var hasRendered = false;

var renderApp = function renderApp() {
  if (!hasRendered) {
    _reactDom["default"].render(jsx, document.getElementById('app'));

    hasRendered = true;
  }
};

_reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_LoadingPage["default"], null), document.getElementById('app'));

_firebase.firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch((0, _auth.login)(user.uid));
    store.dispatch((0, _expenses.startSetExpenses)()).then(function () {
      renderApp();

      if (_AppRouter.history.location.pathname === '/') {
        _AppRouter.history.push('/dashboard');
      }
    });
  } else {
    store.dispatch((0, _auth.logout)());
    renderApp();

    _AppRouter.history.push('/');
  }
});
