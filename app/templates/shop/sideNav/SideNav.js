import React, { PropTypes } from 'react'
import { Link } from 'react-router';
import NavItem from './NavItem';
import { connect } from 'react-redux'
import sideNavAction from './SideNavAction';


export const Nav = ({ onClick }) => {
  return (
    <div className="sidebar-category sidebar-category-visible">
      <div className="category-content no-padding">
        <ul className="navigation navigation-main navigation-accordion">
          <NavItem onClick={onClick} />
        </ul>
      </div>
    </div>
  )
}


Nav.propTypes = {
  onClick: PropTypes.func.isRequired
}



const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (text) => {
      dispatch(sideNavAction.ToggleMainMenu(text))
    },
    searchClick: () => {
      dispatch(sideNavAction.Search("testing"))
    }
  }
}
const SideNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
export default SideNav