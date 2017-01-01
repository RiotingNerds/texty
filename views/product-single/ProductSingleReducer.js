import ProductSingleConstant from './ProductSingleConstant'

export default function ProductSingleReducer(state={type:"",product:{},loadedProduct:false,review:[],query:{},affiliate:[]},action) {
  switch(action.type) {
    case ProductSingleConstant.LOADING_PRODUCT: 
      return Object.assign({},state,{product:{},loadedProduct:false})
    case ProductSingleConstant.DONE_LOADING_PRODUCT: 
      return Object.assign({},state,{product:action.product,loadedProduct:true,query:action.query})
    case ProductSingleConstant.GET_AFFILIATE: 
      return Object.assign({},{affiliate:action.affiliate})
    default: 
      return state
  }
}