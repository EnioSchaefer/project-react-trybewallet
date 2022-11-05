// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCIES,
  REQUEST_CURRENCIES_STARTED,
  CREATE_EXPENSES, DELETE_EXPENSE,
  START_EDITING, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
  expenses: [],
  isEditing: false,
  beingEdited: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES_STARTED:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      isFetching: false,
      currencies: action.currencies,
    };
  case CREATE_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };
  case START_EDITING:
    return {
      ...state,
      isEditing: true,
      beingEdited: action.beingEdited,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      isEditing: false,
      expenses: action.editedExpenses,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.updatedExpenses,
    };
  default:
    return state;
  }
};

export default wallet;
