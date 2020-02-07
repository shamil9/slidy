import Slidy from '..'
import { Options } from '../defs'
import { format } from '../utils'

/**
 * Create a pagination.
 *
 * @export
 * @class Pagination
 */
export class Pagination {
  private _el: HTMLDivElement
  private _currentEl: HTMLSpanElement
  private _total: number

  /**
   * Creates an instance of Pagination.
   */

  constructor(private _slidy: Slidy, private _opts: Options) {
    if (!this._opts.pagination) {
      return
    }

    this._init()
    this._bind()
  }

  /**
   * Destroy component.
   */

  public destroy() {
    this._el.parentNode.removeChild(this._el)
  }

  /**
   * Init component.
   */

  private _init() {
    const { currentIndex, items, namespace: ns, outer } = this._slidy
    const { length } = items
    const { pagination, zerofill } = this._opts

    this._total = Math.ceil(length / this._slidy.group)

    const cur = format(
      Math.ceil((currentIndex + 1) / this._slidy.group),
      length,
      zerofill
    )
    const sep = pagination === true ? '/' : (pagination as string)
    const tot = format(this._total, this._total, zerofill)

    const tpl = document.createElement('template')
    const html = `<div class="${ns}-pagination">
  <span class="${ns}--pagination__current">${cur}</span>
  <span class="${ns}-pagination__separator">${sep}</span>
  <span class="${ns}-pagination__total">${tot}</span>
</div>`

    tpl.innerHTML = html

    this._el = tpl.content.firstChild as HTMLDivElement
    this._currentEl = this._el.querySelector('span:nth-child(1)')

    outer.appendChild(this._el)

    this._update()
  }

  /**
   * Bind event handlers.
   */

  private _bind() {
    this._slidy.hooks.add('beforeSlide', this._update.bind(this))
  }

  /**
   * Update current index.
   */

  private _update() {
    this._currentEl.textContent = format(
      Math.ceil((this._slidy.newIndex + 1) / this._slidy.group),
      this._total,
      this._opts.zerofill
    )
  }
}
