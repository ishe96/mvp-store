import axios from "axios";

/**
 *  Endpoints for Auth Signup & Login : 
 *  - /signup >> available to all Users with CRUD ops:- /POST
 *  - /login >> available to all Users with CRUD ops:- /POST and /GET
 */

const API_URL = "/auth";

/**
 * Signup as new user
 * Save current user to localstorage 
*/
const signup = (username, password, role) => {
  return axios
    .post(API_URL + "/signup", {
      username,
      password,
      role
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

/**
 * Login as Registered user
 * Save current user to localstorage 
*/
const login = (username, password) => {
  return axios
    .post(API_URL + "/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// Delete user from localstorage
const logout = () => {
  localStorage.removeItem("user");
};

// Get current user from localstorage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
