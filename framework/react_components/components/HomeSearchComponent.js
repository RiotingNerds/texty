import React, { PropTypes } from 'react'

const HomeSearchComponent = ({ onClick }) => {
	let searchInput
	return (<div>
	    <input type="text" ref={input=>{searchInput = input}} />
	    <button className="waves-effect waves-light btn" onClick={()=>{onClick(searchInput.value)}}>Submit <i className="material-icons right">send</i> </button>
	  </div>
	)
} 

HomeSearchComponent.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default HomeSearchComponent