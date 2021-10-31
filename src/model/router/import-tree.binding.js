import { Core, Observable, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Form, FormModel, FormBinding } from "@domodel/form"
import { Parser } from "@thoughtsunificator/gedcom-parser"

import TreeImportFileModel from "./import-tree/form.js"
import TreeFormModel from "./tabs-tree/form.js"

import StepFileBinding from "./import-tree/step-file.binding.js"

import { TREE_FORMATS_IMPORT } from "/model/geneatree.binding.js"

/**
 * @global
 */
class ImportTreeBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const _form = new Form()
		const _form_ = new Form()
		const steps = new Steps([
			new Step("Fichier", FormModel(TreeImportFileModel(TREE_FORMATS_IMPORT)), StepFileBinding, { form: _form}),
			new Step("Arbre", FormModel(TreeFormModel({ title: `Créer un arbre` })), FormBinding, { form: _form_})
		])

		steps.listen("stepChanged", data => {
			if(data.name === "Fichier") {
				_form.emit("focus")
			} else if(data.name === "Arbre") {
				_form_.emit("focus")
			}
		})

		steps.listen("done", () => {
			console.log(steps.getStepByName("Fichier").data)
			console.log(Parser.parse(steps.getStepByName("Fichier").data))
			// parse data
			// geneatree.emit("tree add", [{ meta: data[1] }, []])
			// geneatree.emit("tree select", geneatree.trees[geneatree.trees.list.length - 1])
		})

		_form_.listen("submitted", data => steps.emit("stepNext", data))

		this.run(StepsModel, { binding: new StepsBinding({ steps }) })

		steps.emit("stepSet", "Fichier")

	}

}

export default ImportTreeBinding
