import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, createExpenses,
  fetchExchangeRate, editExpense } from '../redux/actions';

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

  editExpense = () => {
    const { actionEditExpense, beingEdited, expenses } = this.props;
    const removedExpense = expenses.filter((item) => item.id !== beingEdited.id);
    const sorting = -1;

    const updatedExpenses = [
      ...removedExpense,
      { ...beingEdited, ...this.state, id: beingEdited.id },
    ].sort((a, b) => (a.id > b.id ? 1 : sorting));

    this.setState({ description: '', value: '' });
    return actionEditExpense(updatedExpenses);
  };

  render() {
    const { isFetching, isEditing, currencies } = this.props;
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
        { isEditing
          ? (
            <button
              type="button"
              onClick={ () => this.editExpense() }
            >
              Editar despesa
            </button>
          )
          : (
            <button
              type="button"
              onClick={ () => this.incrementWallet() }
            >
              Adicionar despesa
            </button>
          )}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  isEditing: state.wallet.isEditing,
  expenses: state.wallet.expenses,
  beingEdited: state.wallet.beingEdited,
});

const mapDispatchToProps = (dispatch) => ({
  actionCurrencies: () => dispatch(fetchCurrencies()),
  actionCreateExpenses: (expenses) => dispatch(createExpenses(expenses)),
  actionExchangeRate: () => dispatch(fetchExchangeRate()),
  actionEditExpense: (updatedExpenses) => dispatch(editExpense(updatedExpenses)),
});

WalletForm.propTypes = {
  actionCurrencies: PropTypes.func.isRequired,
  actionCreateExpenses: PropTypes.func.isRequired,
  actionExchangeRate: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  beingEdited: PropTypes.shape({ id: PropTypes.number }).isRequired,
  actionEditExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
