// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const WALLET_ADDITION = 'WALLET_ADDITION';

export const userLogin = (email) => ({ type: USER_LOGIN, email });

export const walletAddition = (addData) => ({ type: WALLET_ADDITION, addData });

// description, category, value, payMethod, coin
