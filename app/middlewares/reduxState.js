var _ = require('lodash');

module.exports = (req,res,next)=>{

  res._redux_initial_state = {}

  res.setState = (state) => {
    res._redux_initial_state = _.assign({},res._redux_initial_state,state)
  }

  res.getState = () => {
    return res._redux_initial_state
  }
  next()
}