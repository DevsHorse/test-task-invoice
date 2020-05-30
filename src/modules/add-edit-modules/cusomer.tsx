import React from 'react';


const CustomerInput = (props: any) => {


  const setCustomersOption = (): object[] => {
    let options: object[] = [];

    props.customers.forEach((customer: any) => {

        let option: object  = (
          <option key={customer.id} value={customer.id}>
            {customer.name + ' --- ' + ' Address: ' + customer.address}
          </option>
        );

      options.push(option);
    });

    return options;
  };


  const setCustomerState = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();
    props.customerHandler(event.target.value);
  };

  let selectValue = props.customerId ? props.customerId :
   props.invoiceData !== {} ? props.invoiceData.customerId : false;

  return (
    <div className="col-12 text-left">
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