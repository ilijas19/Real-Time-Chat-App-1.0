class RegisterView {
  _registerForm = document.getElementById("register-form");
  _usernameInput = document.getElementById("register-username");
  _emailInput = document.getElementById("register-email");
  _passwordInput = document.getElementById("register-password");

  addFormListeners(handler) {
    this._registerForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = this._usernameInput.value;
      const email = this._emailInput.value;
      const password = this._passwordInput.value;
      handler(username, email, password);
    });
  }
}

export default new RegisterView();
