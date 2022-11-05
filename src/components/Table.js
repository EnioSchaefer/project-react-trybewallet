import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  removeExpense = (expense) => {
    const { expenses, actionRemoveExpense } = this.props;
    const findExpense = Object.values(expenses).find(({ id }) => id === expense.id);
    actionRemoveExpense(findExpense);
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {expenses && (
            <tbody>
              {expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>
                    {Object.values(expense.exchangeRates)
                      .find(({ code }) => code === expense.currency).name}
                  </td>
                  <td>
                    {Number(Object.values(expense.exchangeRates)
                      .find(({ code }) => code === expense.currency).ask).toFixed(2)}
                  </td>
                  <td>
                    {(Number(expense.value) * Object.values(expense.exchangeRates)
                      .find(({ code }) => code === expense.currency).ask).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => (this.editExpense()) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.removeExpense(expense) }
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>)}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  actionRemoveExpense: (expense) => dispatch(removeExpense(expense)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  actionRemoveExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
