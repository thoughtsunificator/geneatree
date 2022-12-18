import { Core, Observable, Binding } from "domodel"
import { Form, FormModel, FormBinding } from "@domodel/form"

/**
 * @global
 */
class TabActionsBinding extends Binding {

	static MAIN_VIEW = "menu"

	/**
	 * @param {string} view
	 */
	setView(view) {
		if(view !== TabActionsBinding.MAIN_VIEW) {
			this.identifier.back.style.display = ""
		} else {
			this.identifier.back.style.display = "none"
		}
		Object.keys(this.identifier).filter(key => key.slice(0, 5) === "view-" && key.slice(5) !== view).forEach(key => this.identifier[key].style.display = "none")
		this.identifier[`view-${view}`].style.display = ""
	 }

	onCreated() {

		const { geneatree, tab } = this.properties

		const _form = new Form()

		this.listen(_form, "submitted", data => {
			console.log(data)
		})

		this.listen(tab, "unset", () => {
			this.setView(TabActionsBinding.MAIN_VIEW)
		})

		this.listen(geneatree.individuals, "selected", individual => {
			this.identifier.delete.disabled = individual.meta.decujus
		})

		this.identifier.delete.addEventListener("click", () => geneatree.individuals.emit("remove", geneatree.trees.selected.selectedIndividual))
		this.identifier.back.addEventListener("click", () => {
			this.setView(TabActionsBinding.MAIN_VIEW)
		})

		this.setView(TabActionsBinding.MAIN_VIEW)

	}

}

export default TabActionsBinding
