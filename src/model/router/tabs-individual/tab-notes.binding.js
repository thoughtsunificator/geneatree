import { Core, Observable, Binding } from "domodel"
import { Paginator, PaginatorModel, PaginatorBinding } from "@domodel/paginator"
import { Form, FormModel, FormBinding } from "@domodel/form"

import NoteModel from "./tab-notes/note.js"
import NoteFormModel from "./tab-notes/form.js"

import NoteBinding from "./tab-notes/note.binding.js"

/**
 * @global
 */
class TabNotesBinding extends Binding {

	static MAIN_VIEW = "list"

	/**
	 * @param {string} view
	 */
	setView(view) {
		if(view !== TabNotesBinding.MAIN_VIEW) {
			this.identifier.back.style.display = ""
		} else {
			this.identifier.back.style.display = "none"
		}
		Object.keys(this.identifier).filter(key => key.slice(0, 5) === "view-" && key.slice(5) !== view).forEach(key => this.identifier[key].style.display = "none")
		this.identifier[`view-${view}`].style.display = ""
	 }

	render(notes) {
		this.paginator.emit("reset")
		if(notes.length >= 1) {
			this.identifier.list.style.display = ""
			this.identifier.placeholder.style.display = "none"
			const notes_ = notes.slice().sort((a, b) => a.date - b.date)
			notes_.reverse()
			const items = notes_.map(note => ({
				observable: note,
				model: NoteModel(note),
				binding: new NoteBinding({ application: this.properties.geneatree, individual: this.properties.geneatree.trees.selected.selectedIndividual, note })
			}))
			for(const item of items) {
				this.paginator.emit("item add", item)
			}
			this.paginator.emit("initialize")
			this.paginator.emit("navigate", this.paginator.pages[0])
		} else {
			this.identifier.list.style.display = "none"
			this.identifier.placeholder.style.display = ""
		}
	}

	onCreated() {

		const { geneatree, tab } = this.properties

		const _noteForm = new Form()
		this.paginator = new Paginator(3)

		let _note = null

		this.listen(_noteForm, "submitted", data => {
			this.setView(TabNotesBinding.MAIN_VIEW)
			_noteForm.emit("clear")
			if(_note !== null) {
				geneatree.individuals.emit("notesUpdate", { individual: geneatree.trees.selected.selectedIndividual, note: _note, form: data })
			} else {
				geneatree.individuals.emit("notesAdd", { individual: geneatree.trees.selected.selectedIndividual, form: data })
			}
		})

		this.listen(geneatree.individuals, "selected", () => this.render(geneatree.trees.selected.selectedIndividual.notes))
		this.listen(geneatree.individuals, "notesAdded", () => this.render(geneatree.trees.selected.selectedIndividual.notes))
		this.listen(geneatree.individuals, "notesRemoved", () => this.render(geneatree.trees.selected.selectedIndividual.notes))
		this.listen(geneatree.individuals, "notesUpdated", () => this.render(geneatree.trees.selected.selectedIndividual.notes))
		this.listen(geneatree.individuals, "notesUpdatePopup", data => {
			_note = data
			this.setView("addNote")
			_noteForm.emit("load", {
				title: data.title,
				content: data.content,
				author: data.author
			})
			_noteForm.emit("focus")
		})
		this.listen(tab, "unset", () => {
			_noteForm.emit("clear")
			this.setView(TabNotesBinding.MAIN_VIEW)
		})
		this.listen(tab, "set", () => {
			this.setView(TabNotesBinding.MAIN_VIEW)
			this.render(geneatree.trees.selected.selectedIndividual.notes)
		})
		this.identifier.searchInput.addEventListener("input", event => {
			const notes = geneatree.trees.selected.selectedIndividual.findNotes(event.target.value)
			this.render(notes)
		})
		this.identifier.addNote.addEventListener("click", () => {
			_note = null
			this.setView("addNote")
			_noteForm.emit("focus")
		})
		this.identifier.back.addEventListener("click", () => {
			this.setView(TabNotesBinding.MAIN_VIEW)
		})

		this.run(FormModel(NoteFormModel), {
			parentNode: this.identifier["view-addNote"],
			binding: new FormBinding({
				form: _noteForm
			})
		})

		this.run(PaginatorModel, {
			parentNode: this.identifier.list,
			binding: new PaginatorBinding({
				paginator: this.paginator,
				maxShownPages: 3
			})
		})

		this.setView(TabNotesBinding.MAIN_VIEW)

	}

}

export default TabNotesBinding
