import React from 'react';
import API from './model';
import AddEditForm from './add-edit-modules/form';
import AuthContext from './context';
import { AddEditInvoicePageStateType, InvoiceDataEditProp } from './pages-types';


class AddEditInvoice extends React.Component {
  static contextType = AuthContext;
  public props: any;
  public pageMode: 'add' | 'edit';
  public invoiceData: InvoiceDataEditProp | {};
  public state: AddEditInvoicePageStateType;

  constructor(props: any) {
    super(props);
    this.pageMode = props.location.state.mode;
    this.invoiceData = props.location.state.invoiceData || {};
    this.state = {
      customers: [],
      products: []
    };
  }

  setSelectOptions(): void {
    Promise.all([
      API.getCustomers(this.context.authData.accessToken),
      API.getProducts(this.context.authData.accessToken)
    ])
    .then(([customersArray, productsArray]) => {
      this.setState(
        { 
          customers: customersArray,
          products: productsArray
        }
      )
    });
  }

  render() {

    if (!this.state.customers.length) {
      this.setSelectOptions();
    }

    return (
      <div className="home-bg">
        <div className="section">
          <div className="row register-block bg-forms rounded text-white text-center justify-content-center p-4">
            <div className="col-12">    
              
              <AddEditForm
               customers={this.state.customers} 
               products={this.state.products}
               history={this.props.history} 
               pageMod={this.pageMode}
               invoiceData={this.invoiceData}
               />
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEditInvoice;