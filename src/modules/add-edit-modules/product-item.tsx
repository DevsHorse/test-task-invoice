import React from 'react';

const ProductItem = (props: any) => {

  const quantityHandler = (event: any): void => {
    event.preventDefault();
    props.quantityHandler(event, props.itemOptions.uniqId);
  };

  const deleteProduct = (e: any): void => {
    e.preventDefault();
    props.deleteProductHandler(props.itemOptions.uniqId);
  };


  return (
    <div className="col-12 mb-2">
      <div className="product d-flex justify-content-between align-items-center p-1 bg-product text-dark rounded">
        <div className="col-4">
          {props.product.name}
        </div>
        
        <div className="col-2 d-flex justify-content-between">
          <input
           className="w-100" 
           type="number" 
           id="quantity" 
           value={props.itemOptions.quantity} 
           onChange={quantityHandler} 
          />
        </div>

        <div className="col-4">
          Prices: {props.itemOptions.totalPrice.toFixed(2) + '$'}
        </div>

        <div className="col-2">
          <button className="btn-sm btn-delete" onClick={deleteProduct}>del 🗑</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;