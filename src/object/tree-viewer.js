import { Observable } from "domodel"

/**
 * @global
 */
class TreeViewer extends Observable {

	constructor() {
		super()
		this._width = 0
		this._height = 0
		this._x = 0
		this._y = 0
		this._scale = 1
		this._dragging = {
			clientX: 0,
			toggled: true,
			clientY: 0,
			moved: false,
			started: false
		}
	}

	/**
	 * @type {number}
	 */
	get width() {
		return this._width
	}

	set width(width) {
		this._width = width
	}

	/**
	 * @type {number}
	 */
	get height() {
		return this._height
	}

	set height(height) {
		this._height = height
	}

	/**
	 * @type {number}
	 */
	get x() {
		return this._x
	}

	set x(x) {
		this._x = x
	}

	/**
	 * @type {number}
	 */
	get y() {
		return this._y
	}

	set y(y) {
		this._y = y
	}

	/**
	 * @type {number}
	 */
	get scale() {
		return this._scale
	}

	set scale(scale) {
		this._scale = scale
	}

	/**
	 * @type {Object}
	 */
	get dragging() {
		return this._dragging
	}

}

export default TreeViewer
