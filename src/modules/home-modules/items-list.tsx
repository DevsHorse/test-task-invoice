import React from 'react';
import InvoiceItem from './invoice-item';
import API from '../model';

interface InvoiceData {
  invoiceId: string,
  total: number,
  discount: number,
  customerId: string,
  customerName: string
}


class ItemsList extends React.Component {
  props: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.getAPI = this.getAPI.bind(this);
    this.initHandler = this.initHandler.bind(this);
    this.state = {
      invoices: [],
      init: false
    }
  }

  
  getAPI() {
    API.getInvoices(this.props.userData.accessToken).then(invoicesResponse => {
      API.getCustomers(this.props.userData.accessToken).then(customers => {
       
        let invoicesArray: object[] = []; 

        invoicesResponse.forEach((invoice: any) => {

          if (invoice.createdById === this.props.userData.userId) {
            let invoiceCustomer: any = customers.filter((customer: any) => invoice.customerId === customer.id )[0];

            let invoiceData: InvoiceData = {
              invoiceId: invoice.id,
              total: invoice.total,
              discount: invoice.discount,
              customerId: invoice.customerId,
              customerName: invoiceCustomer.name
            };

          invoicesArray.push(invoiceData);
          }
        });

        this.setState({
        invoices: invoicesArray,
        init: true
        });

      });
    });
  }

  setInvoicesItems(): object[] {
    let listItems: object[] = [];

    this.state.invoices.forEach((invoiceData: any) => {

      let item =  (
        <InvoiceItem
         key={invoiceData.invoiceId} 
         invoiceData={invoiceData} 
         initHandler={this.initHandler} 
         editInvoiceProps={this.props.editInvoiceProps}
        />
      );

      listItems.push(item);
    });

    return listItems;
  }

  initHandler(invoiceId: string): void {
    API.deleteInvoiceById(this.props.userData.accessToken, invoiceId).then(res => {

      let newInvoices = this.state.invoices.filter((invoice: any) => invoice.invoiceId !== invoiceId);
      this.setState({invoices: newInvoices}); // This method is faster

      // this.setState({ init: false });  // This method have slow reaction
    });
  }
  
  render() {
    if (!this.state.init) {
      this.getAPI();
    }

    return(
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-11 p-2 invoices-list">
        {
         this.state.invoices.length
         ? this.setInvoicesItems()
         : this.state.init === true 
         ? (<h1 className="text-center h2 mt-4">You don't have invoices yet.</h1>) 
         : ''
        }
      </div>
    );
  }
}

export default ItemsList;