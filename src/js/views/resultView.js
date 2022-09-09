import View from './View.js'

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Sorry! could not find the search query, please try again';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(recipe => this._generateMarkupPreview(recipe))
  }

  _generateMarkupPreview(result) {
   const id = window.location.hash.slice(1);
   
    return `
    <li class="preview">
      <a class="preview__link ${id === result.id ? 'preview__link--active' : ''}" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.imgUrl}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`
  }
}

export default new ResultsView();
