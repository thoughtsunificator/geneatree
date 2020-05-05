import { Core, Binding } from 'domodel'
import { Paginator, PaginatorModel, PaginatorBinding } from '@domodel/paginator'

import NoteModel from "./home/note.js"
import NoteBinding from "./home/note.binding.js"

export default class extends Binding {
    
    onCreated() {

        this.paginator = new Paginator(3)

		this.identifier.searchInput.addEventListener("input", () => this.render())
		this.identifier.addNote.addEventListener("click", () => {
			this.properties.router.emit("browse", { path: "/add" })
		})

		this.listen(this.properties.geneatree.individuals, "notesRemoved", () => this.render())

		this.run(PaginatorModel, {
			parentNode: this.identifier.list,
			binding: new PaginatorBinding({
				paginator: this.paginator,
				maxShownPages: 3
			})
		})

		this.render()
        
    }
	
	render() {
		const notes = this.properties.individual.findNotes(this.identifier.searchInput.value)
		if(notes.length === 0) {
			this.identifier.placeholder.style.display = ""
			this.identifier.list.style.display = "none"
		} else {
			this.identifier.placeholder.style.display = "none"
			this.identifier.list.style.display = "grid"
			this.paginator.emit("itemsSet", notes.map(note => ({
				model: NoteModel,
				binding: NoteBinding,
				properties: { note }
			})))
		}
	}

}