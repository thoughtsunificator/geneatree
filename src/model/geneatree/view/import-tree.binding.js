import { Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Parser } from "@thoughtsunificator/gedcom-parser"

import FileModel from "./import-tree/file.js"
import FileBinding from "./import-tree/file.binding.js"

import TreeModel from "./import-tree/tree.js"
import TreeBinding from "./import-tree/tree.binding.js"

/**
 * @global
 */
class ImportTreeBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		this.steps = new Steps([
			new Step("Fichier", FileModel, FileBinding),
			new Step("Tree", TreeModel, TreeBinding)
		])

		this.listen(this.steps, "done", () => {
			console.log(this.steps.getStepByName("Fichier").data)
			console.log(Parser.parse(this.steps.getStepByName("Fichier").data))
			// parse data
			// geneatree.trees.emit("add", [{ meta: data[1] }, []])
			// geneatree.trees.emit("select", geneatree.trees.list[geneatree.trees.list.length - 1])
		})


		this.run(StepsModel, { binding: new StepsBinding({ steps: this.steps }) })

	}

	async onRendered() {
		this.steps.emit("stepSet", "Fichier")
	}

}

export default ImportTreeBinding
