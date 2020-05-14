import React from 'react';

const CustomerInput = (props: any) => {

  const setCustomersOption = (): object[] => {
    let options: object[] = [];

    props.customers.forEach((customer: any, i: number) => {

        let option: object  = (
          <option key={i} value={customer.id}>
            {customer.name + ' --- ' + ' Address: ' + customer.address}
          </option>
        );

      options.push(option);
    });

    return options;
  };


  const setCustomerState = (e: any): void => {
    e.preventDefault();
    props.customerHandler(e.target.value);
  };

  let selectValue = props.customerId ? props.customerId :
   props.invoiceData !== {} ? props.invoiceData.customerId : false;

  return (
    <div className="col-12">
      <label htmlFor="add-customer">Customer</label>
      <select
       className="form-control" 
       id="add-customer" 
       onChange={setCustomerState} 
       value={selectValue}>
         
        <option value="none">Select customer</option>

        {setCustomersOption()}

      </select>
    </div> 
  );
};

export default CustomerInput;