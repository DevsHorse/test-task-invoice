import React from 'react';
import { Link } from 'react-router-dom';
import API from './model';

class LoginPage extends React.Component {
  public state: any;
  public props: any;

  constructor(props: any) {
    super(props);
    this.handleInputs = this.handleInputs.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      userData: {
        email: '',
        password: ''
      },
      error: ''
    };
  }

  login(e: any): void {
    e.preventDefault();

    for (let key of Object.keys(this.state.userData)) {
      if (this.state.userData[key] === '') return;
    }

    API.login(this.state.userData)
       .then((res: any) => {
         if (res.error) {
            this.setState({error: res.error.message });
         } else {
           this.props.stateHandler({
             isAuth: true,
             userId: res.userId,
             accessToken: res.id
           });
         }
      })
      .catch((error: any) => new Error(error));
  }

  handleInputs(e: any): void {

    this.setState({ 
        userData: {
          ...this.state.userData,
          [e.target.name]: e.target.value 
        }
    });

  }
  
  render() {

    return (
      <div className="section">
        <div className="row register-block bg-register rounded text-white text-center justify-content-center p-4">
          
          <form>
            <h1 className="text-center">Login</h1>
            <div className="text-danger">{this.state.error}</div>

            <div className="row">
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
              
                  <div className="form-group ml-2">
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
            
            <div className="row justify-content-center">
              <div className="col-6">
                <button 
                  type="submit" 
                  className="btn btn-fish btn-block"
                  onClick={this.login}
                >Sign in ⚡</button>
              </div>
              
              <div className="col-6">
              <Link to='/register'>
                <button 
                  type="button" 
                  className="btn btn-fish btn-block"
                >Register</button></Link>
              </div>
              
            </div>
            
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;