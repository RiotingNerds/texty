import HomeSearchComponent from '../components/HomeSearchComponent'
import searchAction from '../actions/SearchAction'
import ProfileForm from '../components/ProfileForm'
import { connect } from 'react-redux'
import React from 'react'


const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (text) => {
      dispatch(searchAction.Search(text))
    }
  }
}

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="homeWrapper" className="row">
        <ProfileForm onClick={this.props.onClick} />
      </div>
    )
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)

export default Home