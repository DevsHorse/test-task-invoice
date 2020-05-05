class API {

  static register = (userData: any): any => {

    async function asyncRegister() {

      const response = await fetch('https://ing-invoicing.herokuapp.com/api/ing-users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return await response.json();
    };

    return asyncRegister();
  }

  static login(userData: any) {

    async function asyncLogin() {

      const response = await fetch('https://ing-invoicing.herokuapp.com/api/ing-users/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    };

    return asyncLogin();
  }
  
  static logOut(accessToken: string) {

    async function asyncLogOut() {
      
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

    return asyncLogOut();

  }

  static getData(accessToken: string) {
 
    async function asyncGetData() {
      
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

    asyncGetData().then(res => {
      console.log(res);
    });

  }

}

export default API;