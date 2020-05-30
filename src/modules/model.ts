interface InvoiceData {
  customerId: string;
  createdById: string;
  discount: number;
  total: number;
}

interface ItemData {
  quantity: number;
  productId: string;
  invoiceId: string;
}

interface ApiRequestOptions {
  authToken?: string;
  data?: object;
  headers?: object;
  mode?: string;
}

function apiRequest(apiUrl: string) {
  return (method: string, endpoint: string, options?: ApiRequestOptions) => {
    
    let requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    let requestBody: any = null;

    if (typeof options === 'object') {
      if (typeof options.headers === 'object') {
        requestHeaders = { ...requestHeaders, ...options.headers };
      }

      if (typeof options.authToken === 'string') {
        requestHeaders = { ...requestHeaders, 'Authorization': options.authToken }
      }

      if (options.data != null) {
        if (typeof options.data !== 'string') {
          requestBody = JSON.stringify(options.data);
        } else {
          requestBody = options.data;
        }
      }
    }

    const requestOptions = {
      headers: requestHeaders,
      body: requestBody,
      method
    };

    return fetch(`${ apiUrl }/${ endpoint }`, requestOptions).then(res => {
      if (options && options.mode) return res;
      else return res.json();
    });
  }
}

class API {

  static apiRequest = apiRequest('https://ing-invoicing.herokuapp.com/api');

  static register(userData: any) {
    return API.apiRequest('POST', '/ing-users', {
       data: userData 
    });
  }

  static login(userData: any) {
    return API.apiRequest('POST', '/ing-users/login', {
      data: userData 
    });
  }

  static logOut(accessToken: string) {
    return API.apiRequest('POST', '/ing-users/logout', {
      authToken: accessToken,
      mode: 'non-json()'
    });
  }

  static getCustomers(accessToken: string) {
    return API.apiRequest('GET', '/customers', {
      authToken: accessToken
    });
  }

  static getProducts(accessToken: string) {
    return API.apiRequest('GET', '/products', {
      authToken: accessToken
    });
  }

  static getInvoices(accessToken: string) {
    return API.apiRequest('GET', '/invoices', {
      authToken: accessToken
    });
  }

  static setInvoice(accessToken: string, invoiceData: InvoiceData) {
    return API.apiRequest('POST', '/invoices', {
      authToken: accessToken,
      data: invoiceData
    });
  }

  static setItemToInvoice(accessToken: string, itemData: ItemData) {
    const endPath = `/invoices/${itemData.invoiceId}/items`;

    return API.apiRequest('POST', endPath, {
      authToken: accessToken,
      data: itemData
    });
  }

  static getItemsOfInvoice(accessToken: string, idInvoice: string)  {
    const endPath = `/invoices/${idInvoice}/items`;

    return API.apiRequest('GET', endPath, {
      authToken: accessToken
    });
  }

  static getInvoiceById(accessToken: string, invoiceId: string) {
    const endPath = `/invoices/${invoiceId}`;

    return API.apiRequest('GET', endPath, {
      authToken: accessToken
    });
  }

  static getCustomerById(accessToken: string, customerId: string) {
    const endPath = `/customers/${customerId}`;

    return API.apiRequest('GET', endPath, {
      authToken: accessToken
    });
  }

  static deleteInvoiceById(accessToken: string, invoiceId: string) {
    const endPath = `/invoices/${invoiceId}`;

    return API.apiRequest('DELETE', endPath, {
      authToken: accessToken
    });
  }

  static updateInvoiceById(accessToken: string, invoiceId: string, invoiceData: any) {
    const endPath = `/invoices/${invoiceId}`;

    return API.apiRequest('PATCH', endPath, {
      authToken: accessToken,
      data: invoiceData
    });
  }

  static updateItemById(accessToken: string, invoiceId: string, itemId: string, itemData: any) {
    const endPath = `/invoices/${invoiceId}/items/${itemId}`;

    return API.apiRequest('PUT', endPath, {
      authToken: accessToken,
      data: itemData
    });
  }

  static deleteItemById(accessToken: string, invoiceId: string, itemId: string) {
    const endPath = `/invoices/${invoiceId}/items/${itemId}`;

    return API.apiRequest('DELETE', endPath, {
      authToken: accessToken,
      mode: 'non-json()'
    });
  }
}

export default API;