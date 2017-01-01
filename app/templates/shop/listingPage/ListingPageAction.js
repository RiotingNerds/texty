import fetch from 'isomorphic-fetch'
import ListingPageConstant from './ListingPageConstant'

var Fuse = require('fuse.js');
const qs = require('querystring');
var _ = require('lodash'),
  bluebird = require('bluebird')

class ListingPageAction {
  getLink(baseUrl="/categories",mainCat,subCat,subSubCat,brand,searchQuery,price,page=1) {
    var url = baseUrl
    var q = {}
    if(baseUrl.indexOf("/categories") >=0) {
      url = "/categories"
      if(mainCat) {
        url += '/' + mainCat
        if(subCat) {
          url += '/' + subCat
          if(subSubCat) {
            url += '/' + subSubCat
          }
        }
      }
    } else {
      q['mainCat'] = mainCat
      q['subCat'] = subCat
      q['subSubCat'] = subSubCat
    }
    url += "/"
    q['sb'] = brand
    q['s'] = searchQuery
    q['selectedPrice'] = price
    q['page'] = page
    return {pathname:url,query:q}
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
    return {
      type: ListingPageConstant.GET_AFFILIATE,
      affiliate:result
    }
  }

  getProducts(query,newPage) {
    var category = {}
    var self = this
    var url = "/api/categories"
    var passedQuery = query
    if(!_.isEmpty(query.onlyBrand)) {
      url = "/api/"+query.onlyBrand+"/"
    } else {
      if(query.mainCat) {
        url += "/"+query.mainCat
        category.mainCat = query.mainCat
        delete query.mainCat
        if(query.subCat) {
          url += "/"+query.subCat
          category.subCat = query.subCat
          delete query.subCat
          if(query.subSubCat) {
            url += "/"+query.subSubCat
            category.subSubCat = query.subSubCat
            delete query.subSubCat
          }
        }
      }
    }
    url += "?"+qs.stringify(query)
    return (dispatch) => {
      dispatch(self.loadingProducts())
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(self.receiveProducts())
          if(newPage) {
            dispatch(self.loadProducts(json,passedQuery))
          }
          else {
            dispatch(self.addProducts(json,passedQuery))
          }
        })
    }
  }
  getBrands() {
    var self = this
    var url = "/api/brands"
    return (dispatch) => {
      dispatch(self.loadingBrands())
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(self.brands(json))
        })
    }
  }
  toggleHide(hide) {
    return {
      type:ListingPageConstant.HIDE_SEARCH,
      hide:hide
    }
  }
  loadingBrands() {
    return {
      type:ListingPageConstant.LOADING_BRAND
    }
  }
  loadNewBrand(brand) {
    return {
      type:ListingPageConstant.ADD_BRAND_TO_LIST,
      brands:brand
    }
  }
  searchBrand(value,dispatch) {
    if(this.timeoutID>0) {
      clearTimeout(this.timeoutID)
    }
    var self = this
    this.timeoutID = setTimeout(function() {
      if(value != "")
        dispatch(self.loadNewBrand(self.brands.search(value)))
      else {
        dispatch(self.loadNewBrand(self.originalBrands))
      }
    },500)
    return {
      type:ListingPageConstant.SEARCH_BRAND
    }
  }
  searchChange(query) {
    return {
      type:ListingPageConstant.SEARCH_CHANGE,
      query:query
    }
  }
  toggleBrand(brands,selectBrand) {
    var newBrands = []
    var selectedBrands = []
    _.forEach(brands,function(b) {
      if(b.id == selectBrand) {
        b.selected = !b.selected
      }
      newBrands.push(b)
      if(b.selected) {
        selectedBrands.push(b.id)
      }
    })
    return {
      type:ListingPageConstant.CHECK_BRAND,
      brands:newBrands,
      selectedBrands:selectedBrands
    }
  }
  receiveBrands() {
    return {
      type:ListingPageConstant.DONE_LOADING_BRAND
    }
  }
  makeFuse(result) {
    var options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      keys: [
        "name"
      ]
    };
    this.originalBrands = result
    this.brands = new Fuse(result, options);
  }
  brands(result) {
    var newResult = []
    _.forEach(result, function(r) {
      if(!r.hasOwnProperty("selected"))
        r.selected = false
      newResult.push(r)
    })
    this.makeFuse(newResult)
    return {
      type: ListingPageConstant.ADD_BRAND_TO_LIST,
      brands:newResult
    }
  }
  loadingProducts() {
    return {
      products:[],
      totalCount:0,
      type:ListingPageConstant.LOADING_PRODUCT
    }
  }
  receiveProducts() {
    return {
      type:ListingPageConstant.DONE_LOADING_PRODUCT
    }
  }
  addProducts(result,query) {
    return {
      type: ListingPageConstant.ADD_PRODUCT_TO_LIST,
      products:result.result,
      query:query,
      totalCount:result.totalCount
    }
  }
  changePage(page) {
    browserHistory.push(url)
  }
  loadProducts(result,query) {
    return {
      type: ListingPageConstant.LOAD_PRODUCT_TO_LIST,
      products:result.result,
      query:query,
      totalCount:result.totalCount
    }
  }
  clearProduct() {
    return {
      type: ListingPageConstant.CLEAR_PRODUCT
    }
  }
  loadByPrice() {

  }
}

let listingPageAction = new ListingPageAction()

export default listingPageAction
