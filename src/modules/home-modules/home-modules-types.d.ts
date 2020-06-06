//Items list types
export type InvoiceData = {
  invoiceId: string;
  total: number;
  discount: number;
  customerId: string;
  customerName: string;
};

export type ItemsListProps = {
  editInvoiceOptions: {
    pathname: string,
    state: {
      mode: 'edit' | 'add'
    }
  }
};

export type ItemListStateType = {
  invoices: Array<InvoiceData | null>;
  init: boolean;
};

//invoice item types
export type InvoiceItemProps = {
  invoiceData: {
    customerId: string,
    customerName: string,
    discount: number,
    invoiceId: string,
    total: number
  },
  handleDeleteInvoice: (invoiceId: string) => void,
  editInvoiceOptions: {
    pathname: string,
    state: {
      mode: 'edit' | 'add'
    }
  }
};
