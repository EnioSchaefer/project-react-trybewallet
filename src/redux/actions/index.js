// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const WALLET_ADDITION = 'WALLET_ADDITION';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const REQUEST_CURRENCIES_STARTED = 'REQUEST_CURRENCIES_STARTED';

export const userLogin = (email) => ({ type: USER_LOGIN, email });

export const walletAddition = (addData) => ({ type: WALLET_ADDITION, addData });

export const requestCurrenciesStarted = () => ({ type: REQUEST_CURRENCIES_STARTED });

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES, currencies });

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
// description, category, value, payMethod, coin
