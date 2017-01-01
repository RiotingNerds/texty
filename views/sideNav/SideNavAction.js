import SideNavConstant from './SideNavConstant'
class SideNavAction {
  ToggleMainMenu(value) {
    return {
      type:SideMenuConstant.TOGGLEMAINMENU,
      value
    }
  }
}

let sideNavAction = new SideNavAction()

export default sideNavAction