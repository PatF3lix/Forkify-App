import View from './View';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      const goToPage = +btn.dataset.goto; //Access dataset goto variable stored on html el
      if (!btn) return;
      handler(goToPage);
    });
  }

  _generateNextBtn(currentPage) {
    return `<button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
  _generatePrevBtn(currentPage) {
    return `<button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    let markup;
    const currentPage = this._data.page;
    //On first Page and there are more pages to display
    if (currentPage === 1 && numPages > 1) {
      markup = this._generateNextBtn(currentPage);
    }

    // On last Page
    if (currentPage === numPages && numPages > 1) {
      markup = this._generatePrevBtn(currentPage);
    }

    // between first page and last page
    if (currentPage > 1 && currentPage < numPages) {
      markup =
        this._generatePrevBtn(currentPage) + this._generateNextBtn(currentPage);
    }

    //On first page and there are no more pages
    if (currentPage === 1 && currentPage === numPages) {
      markup = '';
    }
    return markup;
  }
}

export default new paginationView();
