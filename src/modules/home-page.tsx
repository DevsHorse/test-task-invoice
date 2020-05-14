import React from 'react';
import ItemsList from './home-modules/items-list';
import { Link } from 'react-router-dom';
import API from './model';

class HomePage extends React.Component {
  public props: any;

  constructor(props: any) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut(e: any): void {
    e.preventDefault();

    API.logOut(this.props.userData.accessToken).then(res => {
      if (res.ok) {
        this.props.stateHandler({
          isAuth: false,
          userId: '',
          accessToken: '' 
        });
      } else {
        console.error('Invalid access token');
      }
    }).catch(error => new Error(error));
  }

  render() {
    let addInvoiceProps: object = {
      pathname: "/add-edit-invoice",
      state: {
        mode: 'add',
        token: this.props.userData.accessToken,
        userId: this.props.userData.userId
      }
    };

    let editInvoiceProps: object = {
      pathname: "/add-edit-invoice",
      state: {
        mode: 'edit',
        token: this.props.userData.accessToken,
        userId: this.props.userData.userId
      }
    }

    return (

      <div>

        <div className="row content-home">
          <div className="col-2 mh-100 bg-aside aside-content">
            <h2 className="m-3 text-white logo">SWolf ☪</h2>
            <div className="col d-flex flex-column justify-content-between" style={{height: '85%'}}>
              <Link to={addInvoiceProps}>
                <button className="btn btn-add-btn mt-3 border-white add-btn">Add invoice</button>
              </Link>
              <button
               className="btn btn-log-out border-secondary log-out" 
               onClick={this.logOut}
              >Log out</button>
            </div>
          </div>
        </div>

        <ItemsList
         userData={this.props.userData} 
         editInvoiceProps={editInvoiceProps}
        />
      </div>
    );
  }
}

export default HomePage;