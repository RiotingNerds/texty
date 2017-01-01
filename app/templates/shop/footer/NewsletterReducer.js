import NewsletterConstant from './NewsletterConstant'

var _ = require('lodash')

export default function NewsletterReducer(state={type:"",submitForm:false,errorMsg:{},loadingForm:false,successSubmit:"",error:false,fullName:"",email:""},action) {
  switch(action.type) {
    case NewsletterConstant.SUBMIT: 
      return Object.assign({},state,{loadingForm:true,submitForm:false,successSubmit:"",error:false,errorMsg:{}})
    case NewsletterConstant.SUCCESS_SUBMIT: 
    console.log(action)
      return Object.assign({},state,{loadingForm:false,submitForm:true,successSubmit:action.msg,error:false,errorMsg:{},fullName:"",email:""})
    case NewsletterConstant.CHANGE_FIELD: 
      return Object.assign({},state,{fullName:action.name,email:action.email,successSubmit:"",error:false})
    case NewsletterConstant.FORMERROR: 
      return Object.assign({},state,{error:true,loadingForm:false,errorMsg:action.errorMsg})
    default: 
      return state
  }
}