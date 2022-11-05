import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, createExpenses, fetchExchangeRate } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      description: '',
      value: '',
      tag: 'Alimentação',
      method: 'Dinheiro',
      currency: 'USD',
      id: 0,
    };
  }

  componentDidMount() {
    const { actionCurrencies } = this.props;
    actionCurrencies();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = typeof target.value === 'number' ? String(target.value) : target.value;

    this.setState({
      [name]: value,
    });
  };

  incrementWallet = async () => {
    const { id } = this.state;
    const { actionCreateExpenses, actionExchangeRate, expenses } = this.props;
    const exchangeRates = await actionExchangeRate();

    this.setState({ id: id + 1, description: '', value: '' });
    return actionCreateExpenses([...expenses, { ...this.state, exchangeRates }]);
  };

  render() {
    const { isFetching, currencies } = this.props;
    const { description, value } = this.state;
    if (isFetching) return <p>Loading...</p>;
    return (
      <div>
        <form>
          <label htmlFor="description">
            Descrição da Despesa:
            {' '}
            <input
              type="text"
              data-testid="description-input"
              id="description"
              name="description"
              value={ description }
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="tag">
            Categoria da Despesa:
            {' '}
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ (e) => this.handleChange(e) }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="value">
            Valor:
            {' '}
            <input
              type="number"
              data-testid="value-input"
              id="value"
              name="value"
              value={ value }
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            {' '}
            <select
              data-testid="method-input"
              id="method"
              name="method"
              onChange={ (e) => this.handleChange(e) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency">
            Moeda:
            {' '}
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              onChange={ (e) => this.handleChange(e) }
            >
              {currencies.map((currency) => (
                <option
                  key={ currency }
                  value={ currency }
                >
                  { currency }
                </option>))}
            </select>
          </label>
        </form>
        <button
          type="button"
          onClick={ () => this.incrementWallet() }
        >
          Adicionar Despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  actionCurrencies: () => dispatch(fetchCurrencies()),
  actionCreateExpenses: (expenses) => dispatch(createExpenses(expenses)),
  actionExchangeRate: () => dispatch(fetchExchangeRate()),
});

WalletForm.propTypes = {
  actionCurrencies: PropTypes.func.isRequired,
  actionCreateExpenses: PropTypes.func.isRequired,
  actionExchangeRate: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
