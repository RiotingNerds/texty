import React, { PropTypes } from 'react'

const LoginForm = ({ onClick }) => {
  return (
  	<div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card z-depth-2">
          <div class="card-content white-text">
            <span class="card-title">Login</span>
            <form className="col m12">		        
			        <div className="row">
			          <div className="col s12">
			            <a href="#" className="waves-effect waves-light btn" onClick={()=>{onClick('facebook'); return false}}><i className="fa fa-facebook-official" aria-hidden="true"></i> Login Via Facebook</a>
			            <a href="#" className="waves-effect waves-light btn" onClick={()=>{onClick('linkedin'); return false}}><i classname="fa fa-linkedin-square" aria-hidden="true"></i> Login Via LinkedIn</a>
			            <a href="#" className="waves-effect waves-light btn" onClick={()=>{onClick('github'); return false}}><i classname="fa fa-github-square" aria-hidden="true"></i> Login Via Github</a>
			          </div>
			        </div>
			      </form>
          </div>
        </div>
      </div>
    </div>
  )
} 

export default LoginForm