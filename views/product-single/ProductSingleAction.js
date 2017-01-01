import fetch from 'isomorphic-fetch'
import ProductSingleConstant from './ProductSingleConstant'
const qs = require('querystring');

class ProductSingleAction {
  constructor() {
    this.url = ""
  }
  getSingleProduct(brand,product) {
    var self = this
    var url = "/api/"+brand+"/"+product
    if(this.url != url) {
      return (dispatch) => {
        dispatch(self.loadingProducts())
        return fetch(url)
          .then(response => response.json())
          .then(json => {
            self.url = url
            dispatch(self.receiveProducts(json,{productName:product,brandName:brand}))
          })
      }
    }
    return function(dispatch){}
  }

  getAffiliate() {
    var self = this
    var url = "/api/affiliate"
    return (dispatch) => {
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(self.affiliate(json))
        })
    }
  }
  affiliate(result) {
    console.log(result)
    return {
      type: ProductSingleConstant.GET_AFFILIATE,
      affiliate:result
    }
  }

  loadingProducts() {
    return {
      type:ProductSingleConstant.LOADING_PRODUCT
    }
  }
  receiveProducts(result,query) {
    return {
      type:ProductSingleConstant.DONE_LOADING_PRODUCT,
      query:query,
      product:result
    }
  }
}

let productSingleAction = new ProductSingleAction()

export default productSingleAction