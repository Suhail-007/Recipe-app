import View from './View.js'

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Sorry! could not find the search query, please try again';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false));
  }
}

export default new ResultsView();
