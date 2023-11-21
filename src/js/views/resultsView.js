import View from './View';
import icons from 'url:../../img/icons.svg';

class resultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage =
    'We could not find any recipes matching that query. Please try another one!';

  _generateMarkup() {
    const markup = this._data.map(this._generateMarkupPreview).join('');
    this._parentEl.insertAdjacentHTML('beforebegin', markup);
  }

  _generateMarkupPreview(recipe) {
    return `
        <li class="preview">
            <a class="preview__link" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
  }
}

export default new resultsView();
