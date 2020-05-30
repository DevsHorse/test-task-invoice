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

  const addProduct = (event: React.MouseEvent<HTMLButtonElement>): void =>  {
    event.preventDefault();
    if (currentSelect === 'none') {
      return;
    } else {
      props.addProductHandler(currentSelect);
    }
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setCurrentSelect(event.target.value);
  };

  return (
    <div className="row mb-3">
      <div className="col-12 text-left">
        <label htmlFor="add-product">
          Product
        </label>
      </div>

      <div className="col-lg-8 col-md-8 col-sm-12">
          <select className="form-control" id="add-product" onChange={selectHandler}>
            <option value="none">
              Select product
            </option>

            {setProductsOption()}
            
          </select>
      </div>

      <div className="col-lg-4 col-md-4 col-sm-12 text-right add-product-btn">
        <button
         className="btn btn-add-product" 
         onClick={addProduct}
         > Add product </button>
      </div>  
    </div>
  );
};

export default ProductsInput;