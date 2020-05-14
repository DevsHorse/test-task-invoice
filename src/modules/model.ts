interface InvoiceData {
  customerId: string,
  createdById: string,
  discount: number,
  total: number
}

interface ItemData {
  quantity: number,
  productId: string,
  invoiceId: string
}

class API {

  static register(userData: any) {

    async function asyncRequest() {

      const response = await fetch('https://ing-invoicing.herokuapp.com/api/ing-users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return await response.json();
    };

    return asyncRequest();
  }

  static login(userData: any) {

    async function asyncRequest() {

      const response = await fetch('https://ing-invoicing.herokuapp.com/api/ing-users/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    };

    return asyncRequest();
  }
  
  static logOut(accessToken: string) {

    async function asyncRequest() {
      
      const response = await fetch('https://ing-invoicing.herokuapp.com/api/ing-users/logout', {
         method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken
            },
            mode: 'cors',
            cache: 'default'
      });

      return await response;
    };

    return asyncRequest();

  }

  static getCustomers(accessToken: string) {
 
    async function asyncRequest() {
      
      const response = await fetch('https://ing-invoicing.herokuapp.com/api/customers', {
         method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken
            },
            mode: 'cors',
            cache: 'default'
      });

      return await response.json();
    };

    return asyncRequest();
  }

  static getProducts(accessToken: string) {
 
    async function asyncRequest() {
      
      const response = await fetch('https://ing-invoicing.herokuapp.com/api/products', {
         method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken
            },
            mode: 'cors',
            cache: 'default'
      });

      return await response.json();
    };

    return asyncRequest();
  }

  static getInvoices(accessToken: string) {
    async function asyncRequest() {
      
      const response = await fetch('https://ing-invoicing.herokuapp.com/api/invoices', {
         method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken
            },
            mode: 'cors',
            cache: 'default'
      });

      return await response.json();
    };

    return asyncRequest();
  }

  static setInvoice(accessToken: string, invoiceData: InvoiceData) {
    async function asyncRequest() {

      const response = await fetch('https://ing-invoicing.herokuapp.com/api/invoices', {
        method: 'POST',
        body: JSON.stringify(invoiceData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
      });

      return await response.json();
    };

    return asyncRequest();
  }

  static setItemToInvoice(accessToken: string, itemData: ItemData) {
    async function asyncRequest() {

      const response = await fetch('https://ing-invoicing.herokuapp.com/api/invoices/' + itemData.invoiceId + '/items' , {
        method: 'POST',
        body: JSON.stringify(itemData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
      });

      return await response.json();
    };

    return asyncRequest();
  }

  static getItemsOfInvoice(accessToken: string, idInvoice: string) {
    async function asyncRequest() {
      
      const response = await fetch('https://ing-invoicing.herokuapp.com/api/invoices/' + idInvoice + '/items', {
         method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken
            },
            mode: 'cors',
            cache: 'default'
      });

      return await response.json();
    };

    return asyncRequest();
  }

  static getInvoiceById(accessToken: string, invoiceId: string) {
    async function asyncRequest() {
      
      const response = await fetch('https://ing-invoicing.herokuapp.com/api/invoices/' + invoiceId, {
         method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken
            },
            mode: 'cors',
            cache: 'default'
      });

      return await response.json();
    };

    return asyncRequest();
  }

  static getCustomerById(accessToken: string, customerId: string) {
    async function asyncRequest() {
      
      const response = await fetch('https://ing-invoicing.herokuapp.com/api/customers/' + customerId, {
         method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken
            },
            mode: 'cors',
            cache: 'default'
      });

      return await response.json();
    };

    return asyncRequest();
  }

  static deleteInvoiceById(accessToken: string, invoiceId: string) {
    async function asyncRequest() {
      
      const response = await fetch('https://ing-invoicing.herokuapp.com/api/invoices/' + invoiceId, {
         method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken
            },
            mode: 'cors',
            cache: 'default'
      });

      return await response.json();
    };

    return asyncRequest();
  }

  static updateInvoiceById(accessToken: string, invoiceId: string, invoiceData: any) {
    async function asyncRequest() {
      
      const response = await fetch('https://ing-invoicing.herokuapp.com/api/invoices/' + invoiceId, {
        method: 'PATCH',
        body: JSON.stringify(invoiceData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
      });

      return await response.json();
    };

    return asyncRequest();
  }

  static updateItemById(accessToken: string, invoiceId: string, itemId: string, itemData: any) {
    async function asyncRequest() {
      
      const response = await fetch('https://ing-invoicing.herokuapp.com/api/invoices/' + invoiceId + '/items/' + itemId, {
        method: 'PUT',
        body: JSON.stringify(itemData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
      });

      return await response.json();
    };

    return asyncRequest();
  }

  static deleteItemById(accessToken: string, invoiceId: string, itemId: string) {
    async function asyncRequest() {
      
      const response = await fetch('https://ing-invoicing.herokuapp.com/api/invoices/' + invoiceId + '/items/' + itemId, {
         method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken
            },
            mode: 'cors',
            cache: 'default'
      });

      return response;
    };

    return asyncRequest();
  }
}

export default API;