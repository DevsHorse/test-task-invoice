import React from 'react';
import { Link } from 'react-router-dom';
import API from '../model';
import AuthContext from '../context';

//Components
import CustomerInput from './cusomer';
import ProductsInput from './products';
import ProductItem from './product-item';

type InvoiceData = {
  customerId?: string;
  createdById?: string;
  discount?: number;
  total?: number;
};

class AddEditForm extends React.Component {
  static contextType = AuthContext;
  public props: any;
  public state: any;
  public pageMod: 'add' | 'edit';

  constructor(props: any) {
    super(props);
    this.pageMod = props.pageMod;

    this.state = {
      customer: '',
      products: [],
      discount: 0,
      totalInvoicePrice: 0,
      redirect: false
    };
  }

  componentDidMount = () => {
    this.setTotalInvoicePrice();
  }

  componentDidUpdate = () => {
    if (this.state.products.length) {
      this.setTotalInvoicePrice();

    } else if (this.state.totalInvoicePrice > 0) {
      this.setState({totalInvoicePrice: 0});
    }
  }

  setTotalInvoicePrice = () => {
      if (this.state.products.length) {
        let totalSum = this.state.products.reduce((sum: number, item: any) => {
          return sum += item.totalPrice;
        }, 0);
  
        if (this.state.discount > 0) {
          totalSum -= (totalSum / 100) * this.state.discount;
        }
    
        totalSum = +totalSum.toFixed(2);
  
        if (this.state.totalInvoicePrice !== totalSum) {
          this.setState({totalInvoicePrice: totalSum});
        }
      } else {
        this.setState({totalInvoicePrice: 0});
      } 
  }

  customerHandler = (customerId: string): void => {
    if (this.pageMod === 'add') {
      this.setState({customer: customerId});
    } else {
      let data = {
       customerId: customerId
      };

      API.updateInvoiceById(
        this.context.authData.accessToken,
        this.props.invoiceData.invoiceId,
        data
      ).then(invoice =>  {
        this.setState({
          customer: invoice.customerId
        });
      });
   }
    
  }

  addProductHandler = (productId: string): void => {

    let productPrice: number = 0;

    this.props.products.forEach((product: any) => {
      if (product.id === productId) {
        productPrice = product.price;
      }
    });

    let productItemTemplate = {
      products: [
        ...this.state.products,
        {
          id: productId,
          quantity: 1,
          uniqId: this.state.products.length,
          price: productPrice,
          totalPrice: productPrice
        }
      ]
    };

    if (this.pageMod === 'add') {
      this.setState(productItemTemplate);
    } else {

      let itemData = {
        quantity: 1,
        productId: productId,
        invoiceId: this.props.invoiceData.invoiceId
      };

      API.setItemToInvoice(
        this.context.authData.accessToken, 
        itemData
      ).then(() => {
        this.setState(productItemTemplate);
      });
    } 
  }

  quantityHandler = (event: React.ChangeEvent<HTMLInputElement>, uniqId: string): void => {

    const quantityValue = +event.target.value > 0 || event.target.value === '' ? event.target.value : 1;

    const newProducts = this.state.products.map((product: any) => {
      if (product.uniqId === uniqId) {
        product.quantity = quantityValue;
        product.totalPrice = product.price * product.quantity;
      } 
      return product;
    });

    if (this.pageMod === 'add') {
      this.setState({
        products: [...newProducts]
      }); 
    } else {
      this.updateInvoiceAndItemsHandler('quantity', newProducts);
    }
  }

  deleteProductHandler = (uniqId: string): void => {

    const newStateData = {
        products: [
          ...this.state.products.filter(
            (product: any) => product.uniqId !== uniqId
          )
        ]
    };

    if (this.pageMod === 'add') {
      this.setState(newStateData);
    } else {
      let currentItem = this.state.products.filter(
        (product: any) => product.uniqId === uniqId
      )[0];

      API.deleteItemById(
        this.context.authData.accessToken, 
        this.props.invoiceData.invoiceId,
        currentItem.itemId
      ).then(() => this.setState(newStateData));
    }
  }

  setProductItemInList = (): Array<React.ReactNode> => {

    let items: Array<React.ReactNode> = [];

    this.state.products.forEach(
      (item: any) => {
        this.props.products.forEach(
          (product: any) => {

            if (product.id === item.id) {
              let component = (
                <ProductItem
                product={product} 
                key={item.id + '/' + (Math.random() * 10000)} 
                deleteProductHandler={this.deleteProductHandler} 
                quantityHandler={this.quantityHandler}
                itemOptions={item}/>
              );

              items.push(component);
            }

        });
    });

    return items;
  }

  discountHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (this.pageMod === 'add') {
      this.setState({discount: event.target.value});
    } else {
      let discountValue = event.target.value;

      let data = {
        discount: discountValue,
        total: this.state.totalInvoicePrice
      };

      API.updateInvoiceById(
        this.context.authData.accessToken, 
        this.props.invoiceData.invoiceId, 
        data
      ).then(() => {
        this.setState({
          discount: discountValue
        })
      });
   }
  }

  addInvoice = (event: React.MouseEvent<HTMLButtonElement | HTMLLinkElement>): void => {
    event.preventDefault();

    if (!this.state.products.length || !this.state.customer) {
      return;
    }

    let invoiceData = {
      customerId: this.state.customer,
      createdById: this.context.authData.userId,
      discount: this.state.discount,
      total: this.state.totalInvoicePrice
    }

    API.setInvoice(
      this.context.authData.accessToken, 
      invoiceData
      ).then(invoiceRes => {

        this.state.products.forEach((product: any) => {

          let itemData = {
            quantity: product.quantity,
            productId: product.id,
            invoiceId: invoiceRes.id
          };

          API.setItemToInvoice(
            this.context.authData.accessToken, 
            itemData
          ).then(() => this.props.history.push('/home'));
      });
    });
  }

  setAddButton = (): React.ReactNode | undefined => {
    if (this.pageMod === 'add') {
      return (
        <button 
          className="btn btn-add-btn" 
          onClick={this.addInvoice}
        >Add invoice</button>
      );
    } 
  }

  setCancelButton = (): React.ReactNode => {
    
    const setRedirectStatus = (event: React.MouseEvent<HTMLButtonElement | HTMLLinkElement>): void => {
      event.preventDefault();
      this.setState({redirect: true});
    };

    if (this.pageMod === 'add') {
      return (
        <Link to='/home'>
          <button className="btn btn-home-delete ml-2">Cancel</button>
        </Link>
      );
    } else {
      return (
        <button 
          className="btn btn-home-delete ml-2" 
          onClick={setRedirectStatus}
        >Cancel</button>
      )
    }
  }

  updateInvoiceAndItemsHandler = (mode: string, quantityArray?: any): void => {

    let invoiceData: InvoiceData = {
      customerId: this.state.customer,
      createdById: this.context.authData.userId,
      discount: this.state.discount,
      total: this.state.totalInvoicePrice
    };

    if (mode === 'quantity') {
      invoiceData = {
        total: this.state.totalInvoicePrice
      };
    }

    API.updateInvoiceById(
      this.context.authData.accessToken, 
      this.props.invoiceData.invoiceId, 
      invoiceData
    ).then(() => {
      this.state.products.forEach((product: any) => {

        let itemData = {
          quantity: product.quantity,
          productId: product.id,
          invoiceId: this.props.invoiceData.invoiceId
        };

        API.updateItemById(
          this.context.authData.accessToken, 
          this.props.invoiceData.invoiceId, 
          product.itemId, 
          itemData
        ).then(() => {

          if (mode === 'done') {
            this.props.history.push('/home');

          } else if (mode === 'quantity') {
            this.setState({
              products: [...quantityArray]
            });
          } 
        });
      });
    });
  }

  setEditModeState = (): void => {
    Promise.all([
      API.getInvoiceById(
        this.context.authData.accessToken, 
        this.props.invoiceData.invoiceId
      ),
      API.getItemsOfInvoice(
        this.context.authData.accessToken, 
        this.props.invoiceData.invoiceId
      )
    ])
    .then(([invoiceRes, itemsRes]) => {

        let productsArray: any = [];

        itemsRes.forEach((item: any, i: number) => {
          let currentProduct = this.props.products.filter(
            (product: any) => item.productId === product.id
          )[0];

          let newItem = {
            id: item.productId,
            quantity: item.quantity,
            uniqId: i,
            price:  currentProduct ? currentProduct.price : 0 ,
            totalPrice: currentProduct ? currentProduct.price * item.quantity : 0,
            itemId: item.id
          };

          productsArray.push(newItem);
        });

        if (productsArray.length && productsArray[0].totalPrice > 0) {
          this.setState({
            customer: invoiceRes.customerId,
            products: productsArray,
            discount: invoiceRes.discount
          });
        }
    });
  }

  render() {
    if (!this.state.products.length && this.pageMod === 'edit') {
      this.setEditModeState();
    }

    if (this.state.redirect) {
      this.updateInvoiceAndItemsHandler('done');
    }

    const discountValue = this.state.discount === 0 ? '' : this.state.discount;

    return (
      <form>
      {/* Total */}
        <div className="row mb-3">
          <div className="col-12 text-left">
            <div className="total ts-2 h3">
              Total price: {this.state.totalInvoicePrice}
            </div>
          </div>
        </div>

      {/* Customer input */}
        <div className="row mb-3">
          <CustomerInput
            customers={this.props.customers} 
            customerHandler={this.customerHandler}
            pageMod={this.props.pageMod}
            invoiceData={this.props.invoiceData}
            customerId={this.state.customer}
          /> 
        </div>

      {/* Product input */}
        <ProductsInput
          products={this.props.products} 
          addProductHandler={this.addProductHandler}
        />

      {/* Added products */}
        <div className="row">
          {this.setProductItemInList()}
        </div>

      {/* Discount and ADD */}
        <div className="row justify-content-between mt-3 align-items-end">
          <div className="col-lg-5 col-md-5 col-sm-12 text-left">
            <label htmlFor="discount-input">
              Discount
            </label>

            <input 
            type="text" 
            className="form-control" 
            id="discount-input" 
            placeholder="Discount in %" 
            onChange={this.discountHandler} 
            value={discountValue}/>
          </div>

          <div className="col-lg-5 col-md-5 col-sm-12 text-right add-invoice-form-btn">
            {this.setAddButton()}
            {this.setCancelButton()}
          </div>
        </div>
      </form>
    );
  }
}

export default AddEditForm;