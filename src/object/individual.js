import Note from "./note.js"

import Persistable from "./persistable.js"

/**
 * @global
 * A person
 */
class Individual extends Persistable {

	/**
	 * @param  {number} id
	 * @param  {Tree} tree
	 * @param  {object} meta
	 */
	constructor(id, tree, meta) {
		super(id)
		this._tree = tree
		this._meta = {
			address: "",
			birthDate: "",
			birthName: "",
			birthPlace: "",
			cellPhone: "",
			deathDate: "",
			deathPlace: "",
			decujus: false,
			firstName: "",
			gender: "unknown",
			heir: false,
			homePhone: "",
			lastName: "",
			mail: "",
			quota_denominator: "",
			quota_numerator: "",
			seisin: false,
			...meta
		}
		this._cell = null
		/**
		 * @type {Note[]}
		 */
		this._notes = []
		this._nextNoteId = 0
	}
	/**
	 * @param  {string}   title
	 * @param  {string}   content
	 * @param  {string}   author
	 * @returns {Note}
	 */
	addNote(title, content, author, date) {
		const note = new Note(this._nextNoteId++, this, title, content, author, date)
		this.notes.push(note)
		return note
	}

	/**
	 * @param {Note} note
	 */
	removeNote(note) {
		this.notes.splice(this.notes.indexOf(note), 1)
	}

	/**
	 * @param  {string} input
	 * @returns {Note[]}
	 */
	findNotes(input) {
		const lowerCaseInput = input.toLowerCase()
		return this.notes.filter(note => note.title.toLowerCase().includes(lowerCaseInput)
			|| note.author.toLowerCase().includes(lowerCaseInput)
			|| note.content.toLowerCase().includes(lowerCaseInput)
			|| new Intl.DateTimeFormat("en-US").format(note.date).includes(lowerCaseInput))
	}

	/**
	 * @param  {object} data
	 */
	update(data) {
		for(const key in data) {
			this.meta[key] = data[key]
		}
	}

	/**
	 * @readonly
	 * @type {Tree}
	 */
	get tree() {
		return this._tree
	}

	/**
	 * @readonly
	 * @type {Note[]}
	 */
	get notes() {
		return this._notes
	}

	/**
	 * @readonly
	 * @type {object}
	 */
	get meta() {
		return this._meta
	}

	/**
	 * @type {Cell}
	 */
	get cell() {
		return this._cell
	}

	set cell(cell) {
		this._cell = cell
	}
}

export default Individual
