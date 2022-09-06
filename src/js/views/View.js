export default class View {
  _data;

  render(data) {
    this._data = data;
    
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMessage();
    
    const markup = this._generateMarkup();
    this.#clear(this._parentElement);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="src/img/icons.svg#icon-loader"></use>
      </svg>
    </div>`
    this.#clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this._parentElement.innerHTML = '';
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>  `
    this.#clear(this._parentElement);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccessMessage(message = this._successMessage) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>  `
    this.#clear(this._parentElement);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

}
