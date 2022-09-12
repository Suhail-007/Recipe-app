import View from './View.js'

class AddRecipe extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _successMessage = 'Recipe uploaded successfully!';
  

  constructor() {
    super();
    this._openWindow();
    this._closeWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _openWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _closeWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUploadRecipe(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const dataArr = [...new FormData(this)];
      const dataObj = Object.fromEntries(dataArr);
      
      handler(dataObj)
    })
  }

}

export default new AddRecipe();
