import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleLogin = () => {
    const { email } = this.state;
    const { actionLogin, history } = this.props;

    actionLogin(email);
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const regexEmail = /.+@.+\..+/g;
    const minLength = 6;

    const checkPassword = password.length >= minLength;
    const checkEmail = regexEmail.test(email);
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            {' '}
            <input
              type="email"
              data-testid="email-input"
              name="email"
              id="email"
              value={ email }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="password">
            Senha:
            {' '}
            <input
              type="password"
              data-testid="password-input"
              name="password"
              id="password"
              value={ password }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <button
            type="button"
            name="loginButton"
            id="loginButton"
            onClick={ () => this.handleLogin() }
            disabled={ !(checkPassword && checkEmail) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionLogin: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  actionLogin: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
