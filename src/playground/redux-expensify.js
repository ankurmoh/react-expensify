import {createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: 12345,
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ( { id } = { }) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const expenseReducerDefaultState = []

const expenseReducer = (state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(( { id } ) => {
                return id !== action.id;
            });
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                }
                else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type:'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type:'SORT_BY_DATE'
});

const setStartDate = (startDate) => ({
    type:'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type:'SET_END_DATE',
    endDate
});

const filtersReducerDefaultState = {
    text: '',
    sortBy : 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy : 'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy : 'amount'
            };
        case 'SET_START_DATE' :
            return {
                ...state,
                startDate: action.startDate
            };
         case 'SET_END_DATE' :
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {

        // date -> more recent expense will display first

        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }

        //amount -> larger amount will display first
        else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1: -1;
        }
    });
};

const store = createStore(combineReducers({
    expenses: expenseReducer,
    filters: filtersReducer
}));

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense( { description: 'Rent', amount: 100, createdAt: 33000}));
const expenseTwo = store.dispatch(addExpense( { description: 'Coffee', amount: 300, createdAt: 11000 }));

store.dispatch(removeExpense({ id: expenseOne.expense.id }));

store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
store.dispatch(setStartDate());

store.dispatch(setEndDate(33000));
store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: 'kjbdkjnsd',
        description: 'January rent',
        note: 'This is my payment',
        amount : 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',  //date or amount
        startDate : undefined,
        endDate: undefined
    }
};