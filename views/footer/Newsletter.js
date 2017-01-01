import React from 'react'
import ToggleDisplay from 'react-toggle-display';
import { connect } from 'react-redux'
import NewsletterAction from './NewsletterAction'

var _ = require('lodash')

var Input = require('react-input-field')

class Newsletter  extends React.Component {
  constructor(props) {
    super(props);
    this.emailChange = this.emailChange.bind(this)
    this.fullNameChange = this.fullNameChange.bind(this)
    this.onNewsletterSubmit = this.onNewsletterSubmit.bind(this)
    this.onFacebookSubmit = this.onFacebookSubmit.bind(this)
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '270127536451174',
        cookie     : true,  // enable cookies to allow the server to access
                          // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  emailChange(v) {
    this.props.dispatch(NewsletterAction.changeValue(fullName,v))
  }

  fullNameChange(v) {
    this.props.dispatch(NewsletterAction.changeValue(v,email))
  }

  onFacebookSubmit(e) {
    var self = this
    e.preventDefault()
    NewsletterAction
      .getFBInfo()
      .then(function(response) {
        self.props.dispatch(NewsletterAction.changeValue(response.name,response.email))
        self.onNewsletterSubmit(e);
      })
      .catch(function(obj){
        console.log(obj)
        alert(obj.msg);
      })
  }

  onNewsletterSubmit(e) {
    e.preventDefault()
    var err = false
    var nameError = ""
    var emailError = ""
    if(_.isEmpty(this.props.fullName)) {
      nameError = "Kindly fill up your name."
      err = true
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(_.isEmpty(this.props.email) || !re.test(this.props.email)) {
      emailError = "Invalid email."
      err = true
    }
    if(!err)
      NewsletterAction.submittingForm(this.props.fullName,this.props.email,this.props.dispatch)
    else {
      this.props.dispatch(NewsletterAction.formError({
        name:nameError,
        email:emailError
      }))
    }
  }
  render() {
    const {loadingForm, submitForm,fullName,email,error,errorMsg,successSubmit} = this.props
    var hideBtn = loadingForm || submitForm

    return (
      <div id="footerNewsletter" className="ng-scope">
        <div className="headline">Join our mailing list for more updates on beauty tips, reviews and promotions!</div>
        <div ng-show="!(successSubmit)">
          <form method="post" name="footerNewsletter" noValidate="" onSubmit={this.onNewsletterSubmit}>
            <div className="clearfix" id="footerNewsletterContainer">
              <ToggleDisplay hide={submitForm}>
                <div className="inputContainer">
                  <Input
                    placeholder="Your Name"
                    className="commonInput nameInput textField"
                    id="brand"
                    required="required"
                    onChange={this.fullNameChange}
                    value={fullName}
                    name="fullName" />
                  <Input
                    placeholder="Your Email"
                    className="commonInput emailInput textField"
                    id="brand"
                    type="email"
                    required="required"
                    onChange={this.emailChange}
                    value={email}
                    name="email" />
                </div>
              </ToggleDisplay>
              <ToggleDisplay hide={hideBtn} >
                <div className="navContainer"> 
                  <button type="submit" value="SIGN UP" className="newsletterSubmit">SIGN UP</button> <span>Or</span> 
                  <a href="#" className="signUpViaFacebook" onClick={this.onFacebookSubmit}>Subscribe with Facebook</a>
                </div>
              </ToggleDisplay>
              <ToggleDisplay show={loadingForm}>
                <div className="loading"> 
                  <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                </div>
              </ToggleDisplay>
            
            </div>
            <ToggleDisplay show={error}>
            <div className="errorContainer ng-hide" ng-show="footerNewsletter.submitted">
              <div ng-show="footerNewsletter.username.$invalid">{errorMsg.name}</div>
              <div ng-show="footerNewsletter.email.$invalid">{errorMsg.email}</div>
            </div>
            </ToggleDisplay>
          </form>
        </div>
        <div ng-show="successSubmit" className="ng-hide"><h3 className="ng-binding">{successSubmit}</h3></div>
      </div>
    )
  }

}
const mapStateToProps = (state) => {
  return state.NewsletterReducer
}

export default connect(
  mapStateToProps
)(Newsletter)