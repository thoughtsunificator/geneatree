import { Core, Observable, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Form, FormModel, FormBinding } from "@domodel/form"
import { Parser } from "@thoughtsunificator/gedcom-parser"

import TreeImportFileModel from "./steps-import-tree/form.js"
import TreeFormModel from "../../model/form/tree.js"

import StepFileBinding from "./steps-import-tree/step-file.binding.js"

import { TREE_FORMATS_IMPORT } from "../../model/geneatree.binding.js"

/**
 * @global
 */
class ImportTreeBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const fileForm = new Form()
		const treeForm = new Form()
		const steps = new Steps([
			new Step("Fichier", FormModel(TreeImportFileModel(TREE_FORMATS_IMPORT)), StepFileBinding, { form: fileForm}),
			new Step("Tree", FormModel(TreeFormModel({ title: `Tree` })), FormBinding, { form: treeForm})
		])

		steps.listen("stepChanged", data => {
			if(data.name === "Fichier") {
				fileForm.emit("focus")
			} else if(data.name === "Tree") {
				treeForm.emit("focus")
			}
		})

		steps.listen("done", () => {
			console.log(steps.getStepByName("Fichier").data)
			console.log(Parser.parse(steps.getStepByName("Fichier").data))
			// parse data
			// geneatree.emit("tree add", [{ meta: data[1] }, []])
			// geneatree.emit("tree select", geneatree.trees.list[geneatree.trees.list.length - 1])
		})

		treeForm.listen("submitted", data => steps.emit("stepNext", data))

		this.run(StepsModel, { binding: new StepsBinding({ steps }) })

		steps.emit("stepSet", "Fichier")

	}

}

export default ImportTreeBinding