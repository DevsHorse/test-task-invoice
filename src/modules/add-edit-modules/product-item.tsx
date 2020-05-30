import React from 'react';

const ProductItem = (props: any) => {

  const quantityHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    props.quantityHandler(event, props.itemOptions.uniqId);
  };

  const deleteProduct = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    props.deleteProductHandler(props.itemOptions.uniqId);
  };

  const prices = props.itemOptions.totalPrice.toFixed(2) + '$';

  return (
    <div className="col-12 mb-2">
      <div className="row product justify-content-between align-items-center p-1 bg-product text-dark rounded">
        <div className="col-lg-4 col-6 order-lg-1 order-1 mb-ms-0">
          {props.product.name}
        </div>
        
        <div className="col-lg-2 col-6 d-flex justify-content-between order-lg-2 order-3">
          <input
           className="w-100 bg-product" 
           type="number" 
           id="quantity" 
           value={props.itemOptions.quantity} 
           onChange={quantityHandler} 
          />
        </div>

        <div className="col-lg-4 col-6 order-lg-3 order-2 mb-ms-0">
          Prices: {prices}
        </div>

        <div className="col-lg-2 col-6 order-lg-4 order-4">
          <button className="btn-sm btn-delete product-btn-del" onClick={deleteProduct}>
            del 🗑
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;