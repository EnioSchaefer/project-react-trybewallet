import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      description: '',
      value: 0,
      tag: 'food',
      payment: 'cash',
      currency: 'USD',
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
              <option value="food">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transportation">Transporte</option>
              <option value="health">Saúde</option>
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
          <label htmlFor="payment">
            Método de Pagamento:
            {' '}
            <select
              data-testid="method-input"
              id="payment"
              name="payment"
              onChange={ (e) => this.handleChange(e) }
            >
              <option value="cash">Dinheiro</option>
              <option value="credit">Cartão de crédito</option>
              <option value="debit">Cartão de débito</option>
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
          <button
            type="button"
            onClick={ () => this.incrementWallet() }
          >
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  actionCurrencies: () => dispatch(fetchCurrencies()),
});

WalletForm.propTypes = {
  actionCurrencies: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
