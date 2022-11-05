import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, startEditingExpense } from '../redux/actions';

class Table extends Component {
  removeExpense = (currentExpense) => {
    const { actionRemoveExpense, expenses } = this.props;
    const updatedExpenses = expenses.filter((item) => item.id !== currentExpense.id);

    actionRemoveExpense(updatedExpenses);
  };

  editExpense = (beingEdited) => {
    const { actionStartEditing } = this.props;
    actionStartEditing(beingEdited);
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
                      data-testid="edit-btn"
                      onClick={ () => this.editExpense(expense) }
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
  actionRemoveExpense: (updatedExpenses) => dispatch(removeExpense(updatedExpenses)),
  actionStartEditing: (beingEdited) => dispatch(startEditingExpense(beingEdited)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  actionRemoveExpense: PropTypes.func.isRequired,
  actionStartEditing: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
