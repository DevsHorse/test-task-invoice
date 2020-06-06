//Lib
import React from 'react';
import API from '../model';
import AuthContext from '../context';

//Modules
import InvoiceItem from './invoice-item';
import {
  InvoiceData,
  ItemsListProps,
  ItemListStateType 
} from './home-modules-types';


class ItemsList extends React.Component {
  static contextType = AuthContext;
  public props: ItemsListProps;
  public state: ItemListStateType;

  constructor(props: ItemsListProps) {
    super(props);
    this.props = props;
    this.state = {
      invoices: [],
      init: false,
    };
  }

  getInvoices = (): void => {
    Promise.all([
      API.getInvoices(this.context.authData.accessToken),
      API.getCustomers(this.context.authData.accessToken)
    ])
    .then(([invoicesResponse, customers]) => {

      let newCustomers = customers
      .reduce((customersMap: any, entry: any) => {
        customersMap[entry.id] = entry;
        return customersMap;
      }, {});

      let invoicesArray: object[] = invoicesResponse
      .reduce((newArr: any, invoice: any) => {

        if (invoice.createdById === this.context.authData.userId) {
          let invoiceCustomer: any = newCustomers[invoice.customerId];

          let invoiceData: InvoiceData = {
            invoiceId: invoice.id,
            total: invoice.total,
            discount: invoice.discount,
            customerId: invoice.customerId,
            customerName: invoiceCustomer.name
          };

          return newArr = [...newArr, invoiceData];
        } else {
          return newArr;
        }
      }, []);
      
      this.setState({
        invoices: invoicesArray,
        init: true
      });
    });
  };

  getInvoicesItems = (): Array<React.ReactNode> | void => {

    if (this.state.invoices.length) {
      let listItems: Array<React.ReactNode | null> = [];

      this.state.invoices.forEach((invoiceData: any) => {

        let item: React.ReactNode = (
          <InvoiceItem
            key={invoiceData.invoiceId}
            invoiceData={invoiceData}
            handleDeleteInvoice={this.handleDeleteInvoice}
            editInvoiceOptions={this.props.editInvoiceOptions}
          />
        );

        listItems.push(item);
      });

      return listItems;
    }
  };

  handleDeleteInvoice = (invoiceId: string): void => {
    API.deleteInvoiceById(this.context.authData.accessToken, invoiceId)
    .then(() => {
      let newInvoices = this.state.invoices.filter(
        (invoice: any) => invoice.invoiceId !== invoiceId
      );
      
      this.setState({ invoices: newInvoices });
    });
  };


  render() {
    if (!this.state.init) {
      this.getInvoices();
    }

    let content: any = null;

    if (!this.state.init) {
      content = null;
    } else if (this.state.invoices.length) {
      content = this.getInvoicesItems();
    } else if (this.state.init && !this.state.invoices.length) {
      content = <h1 className="text-center h2 mt-4">You don't have invoices yet.</h1>;
    }

    return (
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-11 p-2 invoices-list">
        {content}
      </div>
    );
  }
}

export default ItemsList;
