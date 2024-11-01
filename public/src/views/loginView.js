class LoginView {
  _loginForm = document.getElementById("login-form");
  _emailInput = document.getElementById("login-email");
  _passwordInput = document.getElementById("login-password");

  addFormListeners(handler) {
    this._loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = this._emailInput.value;
      const password = this._passwordInput.value;
      handler(email, password);
    });
  }
}

export default new LoginView();
