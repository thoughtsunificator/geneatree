import { Core, Observable, Binding } from "domodel"
import { Form, FormModel, FormBinding } from "@domodel/form"

import TreeExportFormModel from "../export-tree/form.js"
import { TREE_FORMATS_EXPORT } from "../../../model/geneatree.binding.js"


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

		tab.listen("unset", () => {
			this.setView(TabActionsBinding.MAIN_VIEW)
		})

		_form.listen("submitted", data => {
			console.log(data)
		})

		this.identifier.export.addEventListener("click", () => {
			this.setView("export")
		})
		this.identifier.delete.addEventListener("click", () => geneatree.emit("tree remove", geneatree.trees.selected))
		this.identifier.back.addEventListener("click", () => {
			this.setView(TabActionsBinding.MAIN_VIEW)
		})

		this.run(FormModel(TreeExportFormModel(TREE_FORMATS_EXPORT)), { parentNode: this.identifier["view-export"], binding: new FormBinding({ form: _form }) })

		this.setView(TabActionsBinding.MAIN_VIEW)

	}

}

export default TabActionsBinding
