import NavConstant from './NavConstant'

export default function TopNavReducer(state={type:NavConstant.NOTHING,beautyTips:[],reviews:[]},action) {
  switch(action.type) {
    case NavConstant.ADD_BEAUTY_TIPS: 
      return Object.assign({},state,{
        beautyTips: [
          ...state.beautyTips,
          action.post
        ]
      })
    case NavConstant.ADD_REVIEW: 
      return Object.assign({},state,{
        reviews: [
          ...state.reviews,
          action.post
        ]
      })
    default: 
      return state
  }
}