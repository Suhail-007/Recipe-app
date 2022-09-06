class SearchViews {
  #formElem = document.querySelector('.search');

  getQuery() {
    const query = this.#formElem.querySelector('.search__field').value;
    this.#clearInput();
    return query
  }

  addHandlerSearch(handler) {
    this.#formElem.addEventListener('submit', function(e) {
      e.preventDefault();
      handler();
    });
  }

  #clearInput() {
    this.#formElem.querySelector('.search__field').value = '';
  }
}

export default new SearchViews()
