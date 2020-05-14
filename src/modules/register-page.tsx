import React from 'react';
import API from './model';
import { Link } from 'react-router-dom';

class RegisterPage extends React.Component {
  public state: any;
  public props: any;

  constructor(props: any) {
    super(props);
    this.handleInputs = this.handleInputs.bind(this);
    this.register = this.register.bind(this);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      dob: ''
    };
  }

  handleInputs(e: any): void {
    this.setState({ [e.target.name]: e.target.value, dob: new Date().toUTCString() });
  }

  register(e: any): void {
    e.preventDefault();

    for (let key of Object.keys(this.state)) {
      if (this.state[key] === '') return;
    }

    API.register(this.state)
       .then(res => {
         this.setState({ userId: res.id });
         this.props.history.goBack();
      })
      .catch((error: any) => new Error(error));
  }

  render() {

    return (
      <div className="section">
        <div className="row register-block bg-register rounded text-white text-center justify-content-center p-4">
          
          <form>
            <h1 className="text-center">Register</h1>
  
            <div className="row">
                  <div className="form-group">
                    <label htmlFor="register-name">Name</label>
                    <input
                      type="text" 
                      className="form-control" 
                      id="register-name" 
                      name="name"
                      onChange={this.handleInputs}
                      value={this.state.name}
                    />
                  </div>
  
                  <div className="form-group ml-2">
                    <label htmlFor="register-username">User name</label>
                    <input
                      type="text" 
                      className="form-control" 
                      id="register-username" 
                      name="username"
                      onChange={this.handleInputs}
                      value={this.state.username}
                    />
                  </div>
            </div>
                  
            <div className="row">
                  <div className="form-group">
                    <label htmlFor="register-email">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="register-email" 
                      name="email"
                      onChange={this.handleInputs}
                      value={this.state.email}
                    />
                  </div>
              
                  <div className="form-group ml-2">
                    <label htmlFor="register-password">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="register-password" 
                      name="password"
                      onChange={this.handleInputs}
                      value={this.state.password}
                    />
                  </div>
            </div>
           
           <div className="row justify-content-center">
            <div className="col-6">
              <button 
                type="submit" 
                className="btn btn-fish btn-block"
                onClick={this.register}
              >Sign up ⚡</button>
            </div>
            
            <div className="col-6">
            <Link to='/login'>
              <button 
                type="button" 
                className="btn btn-fish btn-block"
              >Sign in</button></Link>
            </div>
           </div>
            
          </form>
        </div>
      </div>
    );
  } 
}

export default RegisterPage;