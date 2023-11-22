import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    /**createRange() :
     * Returns an empty range object that has
     * both of its boundary points positioned at the beginning of the document. */

    /**createContextualFragment:
     * converts string into real DOM Node objects.  Like a virtual DOM
     */

    //compare previous dom el state with new dom el state
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      /**A string containing the value of the current node, if any.
       * For the document itself, nodeValue returns null. For text, comment,
       * and CDATA nodes, nodeValue returns the content of the node.
       * For attribute nodes, the value of the attribute is returned.
       *
       * If you want to return the text of an element, remember that text is always inside a Text node,
       * and you will have to return the Text node's node value (element.childNodes[0].nodeValue). */
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        curEl.textContent = newEl.textContent;

      //update attributes
      if (!newEl.isEqualNode(curEl)) {
        //This will create an array of two elements, the two btn's, then assign new value's to curEl
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
