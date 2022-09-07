import View from './View.js'

class Pagination extends View {
  _parentElement = document.querySelector('.pagination');
  
  //add handler
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      
      const goToPage = btn.dataset.goto;
      
      console.log(goToPage);
      
      handler();
    })
  }


  //render will call generateMarkup
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    //if users are not on first page
     if (currPage > 1 && currPage < numPages) {
       return `${this._generatePrevBtnMarkup(currPage)} ${this._generateNextBtnMarkup(currPage)}`
     }


    //if there's more than one page
    if (numPages > 1 && currPage === 1) {
      return this._generateNextBtnMarkup(currPage);
    }

    //last page
    if (currPage === numPages && numPages > 1) {
      return this._generatePrevBtnMarkup(currPage);
    }

    return ''
  }

  _generateNextBtnMarkup(page) {
    return `
      <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button> `
  }

  _generatePrevBtnMarkup(page) {
    return `
      <button data-goto="${page -1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="./src/img/icons.svg_icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>`
  }

}

export default new Pagination()
