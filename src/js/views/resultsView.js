import View from './View';
import previewView from './previewView.js';

class resultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage =
    'We could not find any recipes matching that query. Please try another one!';

  _generateMarkup() {
    return this._data.map(recipe => previewView.render(recipe, false)).join('');
  }
}

export default new resultsView();
