//Pages
import LoginPage from './modules/login-page';
import RegisterPage from './modules/register-page';
import HomePage from './modules/home-page';

//Library
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { setCookie, getAuthCookie } from './modules/reusable/cookie';

//Styles
import './custom_bootstrap.scss';
import './styles/main.sass';

interface UserData {
  isAuth: boolean,
  userId: string,
  accessToken: string
}

interface Cookie {
      isAuth?: boolean,
      userId?: string,
      accessToken?: string
}

class App extends React.Component {

  state: any;
  cookie: Cookie;

  constructor(props: any) {
    super(props);
    this.stateHandler = this.stateHandler.bind(this);
    this.cookie = getAuthCookie();
    this.state = {
      isAuth: this.cookie !== {} ? this.cookie.isAuth : false,
      userId: this.cookie !== {} ? this.cookie.userId : '',
      accessToken: this.cookie !== {} ? this.cookie.accessToken : '',
    };
  }

  stateHandler(userData: UserData): void {

    const dataBox: UserData = {
      isAuth: userData.isAuth,
      userId: userData.userId,
      accessToken: userData.accessToken 
    };

    setCookie('auth', JSON.stringify(dataBox), 2100, 10, 1);
    this.setState(dataBox);
  }

  render() {
    return (
      <div>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path='/'>
               <Redirect to='/login'/>
            </Route>
  
            <Route path='/login'>
            {this.state.isAuth ? (<Redirect to='/home'/>) : (<LoginPage stateHandler={this.stateHandler} />)}
            </Route>
  
            <Route path='/register' component={RegisterPage}/>
  
            <Route path='/home'>
              {this.state.isAuth ? (<HomePage userData={this.state} stateHandler={this.stateHandler}/>) : (<Redirect to='/login'/>)}
            </Route>
          </Switch>
       </Router>
      </div>
    );
  } 
}

export default App;
