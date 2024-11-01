import { ORIGIN } from "./config.js";
export const state = {
  currentUser: {},
};

export const registerUser = async (username, email, password) => {
  try {
    const result = await axios.post(`${ORIGIN}/api/v1/auth/register`, {
      username,
      email,
      password,
    });
    console.log(result.data);
    alert("Register Successfully... Transition to login page...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data.msg);
  }
};

export const loginUser = async (email, password) => {
  try {
    const result = await axios.post(`${ORIGIN}/api/v1/auth/login`, {
      email,
      password,
    });

    state.currentUser = result.data.tokenUser;
    //transition to chat
    alert("Login Successfully... Transition to Chat page...");
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data.msg);
  }
};

export const getCurrentUser = async () => {
  const result = await axios.get(`${ORIGIN}/api/v1/auth/showMe`);
  return result.data.currentUser;
};

export const logoutUser = async () => {
  await axios.delete(`${origin}/api/v1/auth/logout`);
  alert("Logout Successfully... Transition to login page...");
  setTimeout(() => {
    window.location.href = "/login";
  }, 100);
};
