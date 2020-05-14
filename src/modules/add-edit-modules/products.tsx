import React, { useState } from 'react';

const ProductsInput = (props: any) => {  

  let [currentSelect, setCurrentSelect] = useState('none');

  const setProductsOption = (): object[] => {
    let options: object[] = [];

    props.products.forEach((product: any, i: number) => {
      
      let option = (
        <option key={i} value={product.id}>
          {product.name + ' --- ' + product.price + '$'}
        </option>
      );
    
      options.push(option);
    });

    return options;
  };

  const addProduct = (e: any) => {
    e.preventDefault();
    if (currentSelect === 'none') {
      return;
    } else {
      props.addProductHandler(currentSelect);
    }
  };

  const selectHandler = (e: any): void => {
    setCurrentSelect(e.target.value);
  };

  return (
    <div className="row mb-3">
      <div className="col-12">
        <label htmlFor="add-product">Product</label>
      </div>

      <div className="col-8">
          <select className="form-control" id="add-product" onChange={selectHandler}>
            <option value="none">Select product</option>

            {setProductsOption()}
            
          </select>
      </div>

      <div className="col-4 text-right">
        <button className="btn btn-add-product" onClick={addProduct}>Add product</button>
      </div>  
    </div>
  );
};

export default ProductsInput;