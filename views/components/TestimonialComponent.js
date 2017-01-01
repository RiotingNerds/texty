import React, { PropTypes } from 'react'

const TestimonialComponent = ({ onClick }) => {
  let searchInput
  return (
    <ul className="collection">
    </ul>
  )
} 

TestimonialComponent.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default TestimonialComponent