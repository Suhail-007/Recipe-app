import View from './View.js'
import previewView from './previewView.js'

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false));
  }
  
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarkView();
