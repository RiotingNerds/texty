import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'
import React from 'react'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="loginWrapper">
        <LoginForm />
      </div>
    )
  }
}

const Login = connect()(LoginContainer)

export default Login