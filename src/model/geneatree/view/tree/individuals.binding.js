import { Core, Binding } from 'domodel'
import { Paginator, PaginatorModel, PaginatorBinding } from '@domodel/paginator'

import IndividualModel from "./individuals/individual.js"
import IndividualBinding from "./individuals/individual.binding.js"

export default class extends Binding {
    
    onCreated() {

        this.paginator = new Paginator(3)

		this.identifier.searchInput.addEventListener("input", () => this.render())

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
		const individualsList = this.properties.tree.findIndividuals({ query: this.identifier.searchInput.value })
		if(individualsList.length === 0) {
			this.identifier.placeholder.style.display = ""
			this.identifier.list.style.display = "none"
		} else {
			this.identifier.placeholder.style.display = "none"
			this.identifier.list.style.display = "grid"
			this.paginator.emit("itemsSet", individualsList.map(individual => ({
				model: IndividualModel,
				binding: IndividualBinding,
				properties: { individual }
			})))
		}
	}

}