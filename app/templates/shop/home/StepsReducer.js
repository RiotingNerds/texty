export const SETUPSTEPS = "STEPS_SETUP"

export default function StepsReducer(state={type:SETUPSTEPS,steps:[]},action) {
  switch(action.type) {
    case SETUPSTEPS:
      return Object.assign({},state,{steps:action.steps})
    default:
      return state
  }
}
