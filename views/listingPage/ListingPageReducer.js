import ListingPageConstant from './ListingPageConstant'

var _ = require('lodash')

export default function ListingPageReducer(state={type:"",hideSearchContainer:true,loadingProduct:false,products:[],query:{page:1,selectedPrice:99}, brands:[], totalCount:0, selectedBrands:[], selectedPrice:'99',affiliate:[]},action) {
  switch(action.type) {
    case ListingPageConstant.LOAD_PRODUCT_TO_LIST:
      return Object.assign({},state,{products:action.products,loadingProduct:false,query:action.query,totalCount:action.totalCount})
    case ListingPageConstant.LOADING_PRODUCT:
      return Object.assign({},state,{products:[],totalCount:0,loadingProduct:true})
    case ListingPageConstant.GET_AFFILIATE:
      return Object.assign({},state,{affiliate:action.affiliate})
    case ListingPageConstant.ADD_PRODUCT_TO_LIST:
      var newProducts = state.products
      _.forEach(action.products, function(product) {
        newProducts.push(product)
      })
      return Object.assign({},state,{products:newProducts,query:action.query,totalCount:action.totalCount,loadingProduct:false})
    case ListingPageConstant.ADD_BRAND_TO_LIST:
      return Object.assign({},state,{brands:action.brands})
    case ListingPageConstant.HIDE_SEARCH:
      return Object.assign({},state,{hideSearchContainer:action.hide})
    case ListingPageConstant.CHECK_BRAND:
      return Object.assign({},state,{brands:action.brands,selectedBrands:action.selectedBrands})
    case ListingPageConstant.CHANGE_PAGE:
      var query = Object.assign({},state.query,{page:action.value})
      return Object.assign({},state,{query:query})
    case ListingPageConstant.CHANGE_PAGE1:
      return Object.assign({},state,{query:Object.assign({},state.query,{page:action.value})})
    case ListingPageConstant.SEARCH_CHANGE:
      return Object.assign({},state,{query:Object.assign({},state.query,action.query),loadingProduct:true,totalCount:0,products:[]})
    default:
      return state
  }
}
