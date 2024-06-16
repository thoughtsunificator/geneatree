import { Observable } from "domodel"

import Tree from "./tree.js"


/**
 * @global
 * Observable collection of Tree
 */
class Trees extends Observable {

	constructor() {
		super()
		this._list = []
		this._selected = null
		this._toggled = true
		this._nextTreeId = 0
	}

	/**
	 *
	 * @param  {object} meta
	 * @returns {Tree}
	 */
	add(meta) {
		const tree = new Tree(this._nextTreeId++, meta)
		this.list.push(tree)
		return tree
	}

	/**
	 *
	 * @param {Tree} tree
	 */
	remove(tree) {
		if(tree === this.selected) {
			this.selected = null
			tree.selectedIndividual = null
		}
		this.list.splice(this.list.indexOf(tree), 1)
	}

	/**
	 * @param  {string} input
	 * @returns {Tree[]}
	 */
	find(input) {
		const lowerCaseInput = input.toLowerCase()
		const treesResults = this.list.filter(tree => Object.values(tree.meta).map(value => value.toLowerCase()).filter(value => value.includes(lowerCaseInput)).length >= 1)
		const individualsResults = this.list.map(tree => ({ tree, results: tree.findIndividuals({ query: input, alive: true }) })).filter(data => data.results.length >= 1).map(data => data.tree)
		return treesResults.concat(individualsResults).filter((tree, index, array) => array.indexOf(tree) === index)
	}

	/**
	 * @type {[type]}
	 */
	get list() {
		return this._list
	}

	/**
	 * @type {Tree}
	 */
	get selected() {
		return this._selected
	}

	set selected(selected) {
		this._selected = selected
	}

	/**
	 * @type {boolean}
	 */
	get toggled() {
		return this._toggled
	}

	set toggled(toggled) {
		this._toggled = toggled
	}

}

export default Trees
