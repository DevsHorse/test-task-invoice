//Lib
import React from 'react';
import { Link } from 'react-router-dom';
import API from './model';
import AuthContext from './context';

//types
import { LoginPageStateType } from './pages-types';


class LoginPage extends React.Component {
  static contextType = AuthContext;
  public state: LoginPageStateType;

  constructor(props: any) {
    super(props);

    this.state = {
      userData: {
        email: '',
        password: '',
      },
      error: '',
    };
  }

  handleLogin = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
    event.preventDefault();

    if (
      this.state.userData.email === '' 
      ||
      this.state.userData.password === ''
    ) return;

    this.loginUser();
  };

  loginUser = (): void => {
    API.login(this.state.userData)
    .then((res) => {
      if (res.error) {
        this.setState({ error: res.error.message });
      } else {
        this.context.setNewAuthState({
          isAuthenticated: true,
          userId: res.userId,
          accessToken: res.id,
        });
      }
    });
  };

  handleInputs = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      userData: {
        ...this.state.userData,
        [event.target.name]: event.target.value,
      },
    });
  };

  render() {
    return (
      <div className="section home-bg">
        <div className="row register-block bg-forms rounded text-white text-center justify-content-center p-4">
          <form>

            <h1 className="text-center">
              Login
            </h1>

            <div className="text-danger">
              {this.state.error}
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="login-email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="login-email"
                    name="email"
                    onChange={this.handleInputs}
                    value={this.state.userData.email}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="login-password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="login-password"
                    name="password"
                    onChange={this.handleInputs}
                    value={this.state.userData.password}
                  />
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col">
                <button 
                  type="submit" 
                  className="btn btn-sign btn-block" 
                  onClick={this.handleLogin}
                  >
                    Sign in ⚡
                </button>
              </div>

              <div className="col ml-2">
                <Link to="/register" className="text-decoration-none">
                  <button
                   type="button" 
                   className="btn btn-edit-btn btn-block"
                   >
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
