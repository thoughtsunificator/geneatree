import { EventListener } from "domodel"

import Log from "../../../../object/log.js"

/**
 * @global
 */
class IndividualsEventListener extends EventListener {

	/**
	 * @event IndividualsEventListener#select
	 * @property {Individual} data
	 */
	select(data) {
		this.properties.geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individualSelect", data })
		if(this.properties.geneatree.trees.selected.selectedIndividual !== null) {
			this.properties.geneatree.individuals.emit("unselect", this.properties.geneatree.trees.selected.selectedIndividual)
		}
		this.properties.geneatree.trees.selected.selectedIndividual = data
		data.emit("select")
		this.properties.geneatree.trees.selected.individuals.filter(individual => individual !== data).forEach(individual => individual.emit("nodeHide"))
		this.properties.geneatree.emit("treeViewerDragToggle", false)
		this.properties.geneatree.individuals.emit("selected", data)
	}

	/**
	 * @event IndividualsEventListener#selected
	 * @property {Individual} data
	 *
	*/

	/**
	 * @event IndividualsEventListener#unselect
	 * @property {Individual} data
	 */
	unselect(data) {
		this.properties.geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] unselect", data })
		data.tree.selectedIndividual = null
		data.emit("unselect")
		data.tree.individuals.filter(individual => individual !== data).forEach(individual => individual.emit("nodeShow"))
		this.properties.geneatree.emit("treeViewerDragToggle", true)
		this.properties.geneatree.individuals.emit("unselected", data)
	}

	/**
	 * @event IndividualsEventListener#unselected
	 * @property {Individual} data
	 *
	*/

	/**
	 * @event IndividualsEventListener#update
	 * @property {Individual} data
	 */
	update(data) {
		this.properties.geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individualUpdate", data })
		for(const key in data.form) {
			data.individual.meta[key] = data.form[key]
		}
		data.individual.emit("update")
		this.properties.geneatree.individuals.emit("updated", data)
	}

	/**
	 * @event IndividualsEventListener#updated
	 * @property {Individual} data
	 *
	*/

	/**
	 * @event IndividualsEventListener#remove
	 * @property {Individual} data
	 */
	remove(data) {
		this.properties.geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individualRemove", data })
		data.tree.removeIndividual(data)
		data.emit("remove")
		if(data.tree.individuals.length === 0) {
			this.root.style.cursor = ""
			this.properties.geneatree.explorer.emit("dragReset")
		}
		this.properties.geneatree.individuals.emit("removed", data)
	}
	
	/**
	 * @event IndividualsEventListener#removed
	 * @property {Individual} data
	 *
	*/

	/**
	 * @event IndividualsEventListener#notesAdd
	 * @property {object} data
	 * @property {object} data.form
	 * @property {Individual} data.individual
	 */
	notesAdd(data) {
		this.properties.geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individualNotesAdd", data })
		const { title, content, author } = data.form
		const note = data.individual.addNote(title, content, author, new Date())
		this.properties.geneatree.individuals.emit("notesAdded", note)
	}

	/**
	 * @event IndividualsEventListener#notesAdded
	 * @property {Note} data
	 *
	*/

	/**
	 * @event IndividualsEventListener#notesUpdate
	 * @property {object} data
	 * @property {object} data.form
	 * @property {Individual} data.individual
	 */
	notesUpdate(data) {
		this.properties.geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individualNotesUpdate", data })
		for(const key in data.form) {
			data.note[key] = data.form[key]
		}
		data.note.emit("update")
		this.properties.geneatree.individuals.emit("notesUpdated", data)
	}

	/**
	 * @event IndividualsEventListener#notesUpdated
	 * @property {Note} data
	 *
	*/

	/**
	 * @event IndividualsEventListener#notesRemove
	 * @property {Note} data
	 */
	notesRemove(data) {
		this.properties.geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individualNotesRemove ", data })
		data.individual.removeNote(data)
		data.emit("remove")
		this.properties.geneatree.individuals.emit("notesRemoved", data)
	}

	/**
	 * @event IndividualsEventListener#notesRemoved
	 * @property {Note} data
	 *
	*/

}

export default IndividualsEventListener
