import React, { PropTypes } from 'react'

const TestimonialItem = ({ imageLink, name, testimonial }) => {
  let searchInput
  return (
    <li className="collection-item avatar">
      <img src="images/yuna.jpg" alt="" className="circle" />
      <span className="title">{name}</span>
      <p>{testimonial}</p>
      <a href="{imageLink}" className="secondary-content"><i className="fa fa-user">User</i></a>
    </li>
  )
} 

TestimonialItem.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default TestimonialItem