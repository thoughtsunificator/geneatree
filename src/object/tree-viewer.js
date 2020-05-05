import { Observable } from "domodel"

/**
 * @global
 * Provide mouse navigation for a given tree
 */
class TreeViewer extends Observable {

	constructor() {
		super()
		this._width = 0
		this._height = 0
		this._x = 0
		this._y = 0
		this._scale = 1
		this._grid = {}
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
	get grid() {
		return this._grid
	}

	set grid(grid) {
		this._grid = grid
	}

	/**
	 * @type {Object}
	 */
	get dragging() {
		return this._dragging
	}

	getCenterX() {
		return (this.width - this.grid.width) / 2
	}

	getCenterY() {
		return (this.height - this.grid.height) / 2
	}

}

export default TreeViewer
