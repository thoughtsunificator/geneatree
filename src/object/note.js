import Persistable from "./persistable.js"

/**
 * @global
 * An individual can have notes
 */
class Note extends Persistable {

	/**
	 * @param  {number} id
	 * @param  {Individual} individual
	 * @param  {string} title
	 * @param  {string} description
	 * @param  {string} author
	 * @param  {Date}   date
	 */
	constructor(id, individual, title, content, author, date) {
		super(id)
		this._individual = individual
		this._title = title
		this._content = content
		this._author = author
		this._date = date
	}

	/**
	 * @param {object} data
	 */
	update(data) {
		for(const key in data) {
			this[key] = data[key]
		}
	}

	/**
	 * @readonly
	 * @type {Individual}
	 */
	get individual() {
		return this._individual
	}

	/**
	 * @type {string}
	 */
	get title() {
		return this._title
	}

	set title(title) {
		this._title = title
	}

	/**
	 * @type {string}
	 */
	get content() {
		return this._content
	}

	set content(content) {
		this._content = content
	}

	/**
	 * @type {string}
	 */
	get author() {
		return this._author
	}

	set author(author) {
		this._author = author
	}

	/**
	 * @type {Date}
	 */
	get date() {
		return this._date
	}

	set date(date) {
		this._date = date
	}

}

export default Note
