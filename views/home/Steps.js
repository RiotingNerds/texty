import React from 'react'
import Select from 'react-select';
import { connect } from 'react-redux'

let Steps = ({items}) => {
  return (
    <div className="wrapper three-stepscontainer flex-container">
      {items.map(function(step,index) {
        return (
          <div key={index} className="stepItem">
            <div className="sectionHolder">
              <div className="icon"><img src={step.icon} /></div>
              <div className='title'>{step.title}</div>
            </div>
            <div className="description">{step.description}</div>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.StepsReducer.steps
  }
}

export default connect(
  mapStateToProps
)(Steps)
