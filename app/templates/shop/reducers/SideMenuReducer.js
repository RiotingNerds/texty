import SideBarConstant from '../constants/SideBarConstant'
import { Map } from 'immutable';

export default function SideMenuReducer(state=Map(),action) {
  var newState = state;
  switch(action.type) {
    case SideBarConstant.TOGGLEMAINMENU: 
      currentState = newState.get("menuOpenState",SideBarConstant.MENUOPEN)
      if(currentState == SideBarConstant.MENUOPEN) {
        newState.set("menuOpenState",SideBarConstant.MENUCLOSE);
      } else {
        newState.set("menuOpenState",SideBarConstant.MENUOPEN);
      }
      return newState
    default: 
      return newState
  }
}