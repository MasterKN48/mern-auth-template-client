import cookie from "js-cookie";

//set in cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1
    });
  }
};
// remove from cookie
export const removeCookie = key => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1
    });
  }
};
// get from cookie stored token
export const getCookie = key => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};
// set in localStorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
// remove from localStorage
export const removeLocalStorage = key => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};
//authenitcate user by pasing data to cookie and localStoarge during signin
export const authenitcate = (res, next) => {
  setCookie("token", res.data.token);
  setLocalStorage("user", res.data.user);
  next();
};
// access user info from ls
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
export const signout = next => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};
