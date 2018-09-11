export const GET_AUTH = "GET AUTH";
export const SET_AUTH = "SET AUTH";

export function getAuthentication() {
  return {
    type: GET_AUTH
  };
}

export function setAuthentication(auth) {
  console.log('set auth called ', auth)
  return {
    type: SET_AUTH,
    auth
  };
}
