class ChatView {
  _nameInput = document.querySelector(".name-input");
  _messageInput = document.querySelector(".message-input");
  _messageForm = document.querySelector(".send-message-form");
  _messageContainer = document.querySelector(".message-container");
  _clientsTotal = document.querySelector(".online-clients");
  _logoutButton = document.querySelector(".logout-button");

  setCurrentUsername(username) {
    this._nameInput.textContent = username;
  }

  addFormListener(socket) {
    this._messageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._sendMessage(socket);
    });
  }

  addSocketListeners(socket) {
    socket.on("clients-total", (data) => {
      this._clientsTotal.textContent = `Total Clients ${data}`;
    });

    //recivign messages from other users
    socket.on("chat-message", (data) => {
      this._addMessageToUI(false, data);
    });
  }

  addLogoutFunctionality(handler) {
    this._logoutButton.addEventListener("click", () => {
      handler();
    });
  }

  _sendMessage(socket) {
    if (this._messageInput.value === "") return;
    const data = {
      name: this._nameInput.textContent,
      message: this._messageInput.value,
      dateTime: new Date(),
    };
    socket.emit("message", data);
    this._addMessageToUI(true, data);
    this._messageInput.value = "";
  }

  _addMessageToUI(isOwnMessage, data) {
    const element = `
    <li class="message-${isOwnMessage ? "right" : "left"}">
          <p class="message-text">${data.message}</p>

          <p class="message-info">${data.name} * ${moment(
      data.dateTime
    ).fromNow()}</p>
          <hr />
        </li>
    `;
    this._messageContainer.innerHTML += element;
    this._scrollToBottom();
  }

  _scrollToBottom() {
    this._messageContainer.scrollTo(0, this._messageContainer.scrollHeight);
  }
}

export default new ChatView();
