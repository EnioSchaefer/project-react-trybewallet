import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = [0];
    expenses.forEach((expense) => {
      const { value, currency, exchangeRates } = expense;
      const numValue = Number(value);
      const currencyObj = exchangeRates[currency];
      const convertedValue = numValue * Number(currencyObj.ask);
      totalExpenses.push(convertedValue);
    });

    const finalValue = totalExpenses.reduce((a, b) => a + b).toFixed(2);

    if (!email) return <div>Login não efetuado!</div>;
    return (
      <div>
        <div>
          <span data-testid="total-field">
            {expenses
              .length === 0 ? '0.00' : Number(finalValue).toFixed(2)}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <span data-testid="email-field">{ email }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(Header);
