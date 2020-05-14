import React from 'react';
import API from './model';
import AddEditForm from './add-edit-modules/form';

class AddEditInvoice extends React.Component {
  props: any;
  token: string;
  pageMode: string;
  userId: string;
  state: any;
  invoiceData: any;

  constructor(props: any) {
    super(props);
    this.token = props.location.state.token;
    this.pageMode = props.location.state.mode;
    this.userId = props.location.state.userId;
    this.invoiceData = props.location.state.invoiceData || {};
    this.state = {
      customers: [],
      products: []
    };
  }

  setSelectOptions(): void {

    API.getCustomers(this.token)
    .then(customersArray => API.getProducts(this.token)
    .then(productsArray => this.setState(
      { 
        customers: customersArray,
        products: productsArray 
      }
    )));
    
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
               userData={{userId: this.userId, token: this.token}} 
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