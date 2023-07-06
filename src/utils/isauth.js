export const isAuthenticated = () => {
  if (localStorage.getItem("username") && localStorage.getItem("password")) {
    console.log("Authenticated");
    return true;
  }
  return false;
};