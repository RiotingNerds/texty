import NewsletterConstant from './NewsletterConstant'
import fetch from 'isomorphic-fetch'


class NewsletterAction {
  changeValue(name,email) {
    return {
      type:NewsletterConstant.CHANGE_FIELD,
      name:name,
      email:email
    }
  }
  getFBInfo() {
    return new Promise(function(resolve,reject) {
      FB.login(function(response) {
        // Do something with response.
        if (response.authResponse) {
          FB.api('/me?fields=id,email,first_name,last_name,name', function (response) {
            if(response.email == undefined || response.name == undefined) {
              reject({msg:'Unable to retrieve information from facebook. Kindly fill up the form and submit.',response:response});
            } else {
              resolve(response);
            }
          });
        }
        else {
          reject({msg:'Unable to retrieve information from facebook. Kindly fill up the form and submit.',response:response});
        }
      },{scope: 'email'});
    })
  }
  submittingForm(name,email,dispatch) {
    dispatch({
      type:NewsletterConstant.SUBMIT
    })
    return fetch("http://api.dailyvanity.sg/newsletter",{
      method:'POST',
      params:{
        postID:4,
        location:"page-footer",
        action:'newsletter',
        name: name,
        email: email
      },
      body:JSON.stringify({
        postID:4,
        location:"page-footer",
        action:'newsletter',
        name: name,
        email: email
      })
    }).then(function(res) {
      return res.text()
    }).then(function(msg) {
      dispatch({
        type:NewsletterConstant.SUCCESS_SUBMIT,
        msg:msg
      })
    })
  }
  formError(errMsg) {
    return {
      type:NewsletterConstant.FORMERROR,
      errorMsg:errMsg
    }
  }
}

let newsletterAction = new NewsletterAction()

export default newsletterAction