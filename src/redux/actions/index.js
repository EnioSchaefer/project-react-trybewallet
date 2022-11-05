// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const CREATE_EXPENSES = 'CREATE_EXPENSES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const REQUEST_CURRENCIES_STARTED = 'REQUEST_CURRENCIES_STARTED';
export const RECEIVE_EXCHANGE_DATA = 'RECEIVE_EXCHANGE_DATA';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const userLogin = (email) => ({ type: USER_LOGIN, email });

export const requestCurrenciesStarted = () => ({ type: REQUEST_CURRENCIES_STARTED });

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES, currencies });

export const createExpenses = (data) => ({
  type: CREATE_EXPENSES, payload: data,
});

export const receiveExchangeRates = (currencyData) => ({
  type: RECEIVE_EXCHANGE_DATA, payload: currencyData,
});

export const removeExpense = ({ id }) => ({ type: DELETE_EXPENSE, id });

export function fetchExchangeRate() {
  return () => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencyData) => currencyData);
}

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrenciesStarted());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => {
        const filteredCurrencies = Object.values(currencies)
          .filter((currency) => currency.codein !== 'BRLT');
        const totalCurrencies = filteredCurrencies.map((currency) => currency.code);
        return dispatch(receiveCurrencies(totalCurrencies));
      });
  };
}
