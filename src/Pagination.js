/**
 * Create a pagination.
 *
 * @export
 * @class Pagination
 */
export class Pagination {
  /**
   * Creates an instance of Pagination.
   * @param {Slidy}          slidy slidy instance
   * @param {boolean|string} opts  navigation seperator
   * @memberof Pagination
   */
  constructor(slidy, opts) {
    this._slidy = slidy;
    this._opts = opts;
    this._outer = this._slidy.outer;

    this._dispatcher = this._slidy.dispatcher;

    this.init();
    this.bind();
  }

  /**
   * Init component.
   *
   * @returns {undefined}
   * @memberof Pagination
   */
  init() {
    this._el = document.createElement('div');
    this._el.classList.add(`${this._slidy.namespace}-pagination`);

    this._current = document.createElement('span');
    this._current.textContent = this._slidy.currentIndex + 1;
    this._current.classList.add(`${this._slidy.namespace}-pagination__current`);

    this._separator = document.createElement('span');
    this._separator.textContent = this._opts === true ? '/' : this._opts;
    this._separator.classList.add(`${this._slidy.namespace}-pagination__separator`);

    this._total = document.createElement('span');
    this._total.textContent = this._slidy.items.length;
    this._total.classList.add(`${this._slidy.namespace}-pagination__total`);

    this._el.append(this._current);
    this._el.append(this._separator);
    this._el.append(this._total);
    this._outer.append(this._el);

    this.update();
  }

  /**
   * Bind event handlers.
   *
   * @returns {undefined}
   * @memberof Pagination
   */
  bind() {
    this._dispatcher.on('beforeSlide', this.update.bind(this));
  }

  /**
   * Update current index.
   *
   * @returns {undefined}
   * @memberof Pagination
   */
  update() {
    this._current.textContent = this._slidy.newIndex + 1;
  }

  /**
   * Destroy component.
   *
   * @returns {undefined}
   * @memberof Pagination
   */
  destroy() {
    this._el.parentNode.removeChild(this._el);
  }
}