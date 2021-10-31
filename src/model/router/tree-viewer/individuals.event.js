import { EventListener } from "domodel"

/**
 * @global
 */
class IndividualsEventListener extends EventListener {

	/**
	 * @event IndividualsEventListener#select
	 */
	select(data) {
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individual select", data })
		if(geneatree.trees.selected.selectedIndividual !== null) {
			geneatree.emit("individual unselect", geneatree.trees.selected.selectedIndividual)
		}
		geneatree.trees.selected.selectedIndividual = data
		data.emit("select")
		geneatree.trees.selected.individuals.filter(individual => individual !== data).forEach(individual => individual.emit("node hide"))
		geneatree.emit("tree viewer drag toggle", false)
		geneatree.emit("individual selected", data)
	}

	/**
	 * @event IndividualsEventListener#unselect
	 */
	unselect(data) {
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individual unselect", data })
		data.tree.selectedIndividual = null
		data.emit("unselect")
		data.tree.individuals.filter(individual => individual !== data).forEach(individual => individual.emit("node show"))
		geneatree.emit("tree viewer drag toggle", true)
		geneatree.emit("individual unselected", data)
	}

	/**
	 * @event IndividualsEventListener#update
	 */
	update(data) {
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individual update", data })
		for(const key in data.form) {
			data.individual.meta[key] = data.form[key]
		}
		data.individual.emit("update")
		geneatree.emit("individual updated", data)
	}

	/**
	 * @event IndividualsEventListener#remove
	 */
	remove(data) {
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individual remove", data })
		data.tree.removeIndividual(data)
		data.emit("remove")
		if(data.tree.individuals.length === 0) {
			this.root.style.cursor = ""
			geneatree.emit("tree viewer drag reset")
		}
		geneatree.emit("individual removed", data)
	}

	/**
	 * @event IndividualsEventListener#notesAdd
	 */
	notesAdd(data) {
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individual notes add", data })
		const { title, content, author } = data.form
		const note = data.individual.addNote(title, content, author, new Date())
		geneatree.emit("individual notes added", note)
	}

	/**
	 * @event IndividualsEventListener#notesUpdate
	 */
	notesUpdate(data) {
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individual notes update", data })
		for(const key in data.form) {
			data.note[key] = data.form[key]
		}
		data.note.emit("update")
		geneatree.emit("individual notes updated", data)
	}

	/**
	 * @event IndividualsEventListener#notesRemove
	 */
	notesRemove(data) {
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individual notes remove ", data })
		data.individual.removeNote(data)
		data.emit("remove")
		geneatree.emit("individual notes removed", data)
	}

}

export default IndividualsEventListener
