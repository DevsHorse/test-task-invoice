import React from 'react';
import { Link } from 'react-router-dom';
import { InvoiceItemProps } from './home-modules-types';


const InvoiceItem = (props: InvoiceItemProps) => {

  const deleteItem = () => {
    props.handleDeleteInvoice(props.invoiceData.invoiceId);
  };

  const handleDeleteItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteItem();
  };

  let editData = {
    pathname: props.editInvoiceOptions.pathname,
    state: {
      mode: props.editInvoiceOptions.state.mode,
      invoiceData: props.invoiceData
    }
  };

  return (
    <div className="bg-list-item rounded text-white mb-2 list-item">
      <div className="col">
        <div className="row p-2 justify-content-between align-items-center">
          <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">

            <div className="row">
              {props.invoiceData.customerName}
            </div>

            <div className="row text-half-white">
              #ID&nbsp;-&nbsp;
              {props.invoiceData.invoiceId}
            </div>

          </div>

          <div className="col-lg-2 col-md-1 col">
            Discount: {props.invoiceData.discount}%
          </div>

          <div className="col-lg-2 col-md-1 col">
            Total: {props.invoiceData.total}
          </div>

          <div className="col-lg-2 col-md-2 col">
            <div className="row justify-content-end ">

              <Link to={editData}>
                <button className="btn btn-edit-btn text-white">
                  edit
                </button>
              </Link>

              <button 
                className="btn btn-home-delete ml-2" 
                onClick={handleDeleteItem}
              >
                del
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;
