//Home page - types
export type Mode = 'add' | 'edit';

export type AddEditInvoiceOptions = {
  pathname: string,
  state: {
    mode: 'edit' | 'add'
  }
};

//Register page - types
export type RegisterPageStateType = {
  userData: {
    name: string,
    email: string,
    username: string,
    password: string,
    dob: string
  },
  errorMessage: string
};

//Login page - types 
export type LoginPageStateType = {
  userData: {
    email: string;
    password: string;
  },
  error: string
};

//Add-edit-page - types 
export type AddEditInvoicePageStateType = {
  customers: Array<object>,
  products: Array<object>
}

export type InvoiceDataEditProp = {
  customerId: string,
  customerName: string,
  discount: number,
  invoiceId: string,
  total: number
};