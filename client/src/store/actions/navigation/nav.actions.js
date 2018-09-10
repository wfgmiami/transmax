export const GET_NAVIGATION = "GET NAVIGATION";
export const SET_NAVIGATION = "SET NAVIGATION";

export function getNavigation() {
  return {
    type: GET_NAVIGATION
  };
}

export function setNavigation(nav) {
  return {
    type: SET_NAVIGATION,
    nav
  };
}
