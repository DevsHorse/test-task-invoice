//Lib
import React from 'react';
import { Link } from 'react-router-dom';
import API from './model';
import AuthContext from './context';
//Modules
import ItemsList from './home-modules/items-list';
import { Mode, AddEditInvoiceOptions } from './pages-types';


class HomePage extends React.Component {
  static contextType = AuthContext;

  constructor(props: any) {
    super(props);
  }

  handleLogOut = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
    event.preventDefault();
    this.logOut();
  };

  logOut = (): void => {
    API.logOut(this.context.authData.accessToken)
      .then(() => {
        this.context.handleState({
          isAuthenticated: false,
          userId: '',
          accessToken: '',
        });
      })
      .catch((error) => new Error(error));
  };

  addEditInvoiceOptions = (mode: Mode): AddEditInvoiceOptions => {
    const options: AddEditInvoiceOptions = {
      pathname: '/add-edit-invoice',
      state: {
        mode: mode
      }
    };

    return options;
  };

  render() {
    return (
      <div className="home-page">
        <div className="row content-home">
          <div className="col-lg-2 col-md-2 col-sm-12 mh-100 bg-aside aside-content">
            
            <h2 className="m-3 text-white text-center logo">
              Wolf ☪ Inc.
            </h2>

            <div className="col d-flex flex-column justify-content-between text-center aside-container">

              <Link to={this.addEditInvoiceOptions('add')}>
                <button className="btn btn-add-btn mt-3 border-white add-btn w-100">
                  Add invoice
                </button>
              </Link>

              <button 
                className="btn btn-log-out border-secondary log-out" 
                onClick={this.handleLogOut}
              > Log out </button>
            </div>
          </div>
        </div>

        <ItemsList
          editInvoiceOptions={this.addEditInvoiceOptions('edit')}
        />

      </div>
    );
  }
}

export default HomePage;
