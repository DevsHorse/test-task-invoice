import React from 'react';
import API from './model';
import AuthContext from './context';
import { Link } from 'react-router-dom';
import { RegisterPageStateType } from './pages-types';


class RegisterPage extends React.Component {
  static contextType = AuthContext;
  public state: RegisterPageStateType;
  public props: any;

  constructor(props: any) {
    super(props);

    this.state = {
      userData: {
        name: '',
        email: '',
        username: '',
        password: '',
        dob: '',
      },
      errorMessage: '',
    };
  }

  handleInputs = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      userData: {
        ...this.state.userData,
        [event.target.name]: event.target.value,
        dob: new Date().toUTCString(),
      },
    });
  };

  handleRegister = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
    event.preventDefault();

    for (let key of Object.values(this.state.userData)) {
      if (key === '') return;
    }

    this.register();
  };

  register = (): void => {
    API.register(this.state.userData)
    .then((res) => {
      if (res.error) {
        this.setState({ errorMessage: res.error.message });
      } else {
        this.props.history.goBack();
      }
    })
    .catch((error: any) => new Error(error));
  };

  render() {
    return (
      <div className="section home-bg">
        <div className="row register-block bg-forms rounded text-white text-center justify-content-center p-4">
          <form>

            <h1 className="text-center">
              Register
            </h1>

            <div className="text-danger">
              {this.state.errorMessage}
            </div>
            
            <div className="row">
              <div className="col-lg col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="register-name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-name"
                    name="name"
                    onChange={this.handleInputs}
                    value={this.state.userData.name}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group ml-2 ml-sm-0">
                  <label htmlFor="register-username">User name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-username"
                    name="username"
                    onChange={this.handleInputs}
                    value={this.state.userData.username}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="register-email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="register-email"
                    name="email"
                    onChange={this.handleInputs}
                    value={this.state.userData.email}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="register-password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="register-password"
                    name="password"
                    onChange={this.handleInputs}
                    value={this.state.userData.password}
                  />
                </div>
              </div>
            </div>

            <div className="row justify-content-center text-center">
              <div className="col-6">
                <button type="submit" className="btn btn-sign btn-block" onClick={this.handleRegister}>
                  Sign up ⚡
                </button>
              </div>

              <div className="col-6">
                <Link to="/login" className="text-decoration-none">
                  <button type="button" className="btn btn-edit-btn btn-block">
                    Sign in
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

export default RegisterPage;
