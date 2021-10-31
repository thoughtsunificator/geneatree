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

		_form.listen("submitted", data => {
			console.log(data)
		})

		tab.listen("unset", () => {
			this.setView(TabActionsBinding.MAIN_VIEW)
		})

		this.listen(geneatree, "individual selected", individual => {
			this.identifier.delete.disabled = individual.meta.decujus
		})

		this.identifier.delete.addEventListener("click", () => geneatree.emit("individual remove", geneatree.trees.selected.selectedIndividual))
		this.identifier.back.addEventListener("click", () => {
			this.setView(TabActionsBinding.MAIN_VIEW)
		})

		this.setView(TabActionsBinding.MAIN_VIEW)

	}

}

export default TabActionsBinding
