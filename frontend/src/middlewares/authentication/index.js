import Cookies from "js-cookie";

export const isAuthenticated = () => {
  if (Cookies.get("jwt_token") === "Bindassdeal_AccessToken") return true;
  else return false;
};

export const login = () => {
  Cookies.set("jwt_token", "Bindassdeal_AccessToken");
};

export const logout = () => {
  Cookies.remove("jwt_token");
};
