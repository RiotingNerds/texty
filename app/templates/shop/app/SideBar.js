import React, { PropTypes } from 'react';
import SideNav from '../sideNav/SideNav';
import { connect } from 'react-redux';

const SideBar = ({selected})=>{
  return (<div className="sidebar sidebar-main sidebar-default">
      <div className="sidebar-content">
        <SideNav selected={selected} />
      </div>
    </div>
  )
}
export default SideBar