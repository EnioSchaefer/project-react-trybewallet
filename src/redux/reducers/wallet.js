// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCIES, REQUEST_CURRENCIES_STARTED } from '../actions';

const INITIAL_STATE = { currencies: [], isFetching: false };

const getCurrencies = (state = INITIAL_STATE, action) => {
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
  default:
    return state;
  }
};

export default getCurrencies;
