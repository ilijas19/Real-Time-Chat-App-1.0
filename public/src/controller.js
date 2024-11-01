import * as model from "./model.js";
import loginView from "./views/loginView.js";
import registerView from "./views/registerView.js";
import chatView from "./views/chatView.js";

const loginController = async () => {
  loginView.addFormListeners(async (email, password) => {
    await model.loginUser(email, password);
    // console.log(model.state.currentUser);
  });
};

const registerController = async () => {
  registerView.addFormListeners(model.registerUser);
};

const chatController = async () => {
  if (window.location.pathname === "/") {
    const socket = io();
    const user = await model.getCurrentUser();
    chatView.setCurrentUsername(user.user.username);
    chatView.addFormListener(socket);
    chatView.addSocketListeners(socket);
    chatView.addLogoutFunctionality(model.logoutUser);
  }
};

const init = async () => {
  loginController();

  registerController();

  chatController(); // This will attempt to connect to the server
};

init();
