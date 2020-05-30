//Pages
import LoginPage from './modules/login-page';
import RegisterPage from './modules/register-page';
import HomePage from './modules/home-page';
import AddEditInvoice from './modules/add-edit-invoice';

//Lib
import React from 'react';
import { setCookie } from './modules/cookie/cookie';
import { 
  BrowserRouter as Router,
  Switch, 
  Route, 
  Redirect 
} from 'react-router-dom';
import AuthContext, {
   authDataFromCookie, 
   AuthData, 
   IContext 
} from './modules/context';

//Styles
import './custom_bootstrap.scss';
import './styles/main.sass';


class App extends React.Component {
  static contextType = AuthContext;
  public state: IContext;

  constructor(props: any) {
    super(props);

    this.state = {
      authData: authDataFromCookie,
      handleState: this.handleState,
    };
  }

  handleState = (userData: AuthData): void => {
    const newAuthData: AuthData = {
      isAuthenticated: userData.isAuthenticated,
      userId: userData.userId,
      accessToken: userData.accessToken,
    };

    setCookie('auth', JSON.stringify(newAuthData), 2100, 10, 1);
    this.setState({ authData: newAuthData });
  };

  render() {
    const isAuthenticated = this.state.authData.isAuthenticated;
    const loginRoute = isAuthenticated ? <Redirect to="/home" /> : <LoginPage />;
    const homeRoute = isAuthenticated ? <HomePage /> : <Redirect to="/login" />;

    return (
      <div>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <AuthContext.Provider value={this.state}>

              <Route exact path="/"> Redirect to="/login" /> </Route>

              <Route path="/login"> {loginRoute} </Route>

              <Route path="/home"> {homeRoute} </Route>
              
              <Route path="/register" component={RegisterPage} />

              <Route path="/add-edit-invoice" component={AddEditInvoice} />

            </AuthContext.Provider>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
