import { EventListener } from "domodel"

/**
 * @global
 */
class FilterEventListener extends EventListener {

	treeFilter(data) {
		const { geneatree } = this.properties
		const treesList = geneatree.trees.find(data)
		geneatree.trees.list.filter(tree => treesList.includes(tree) === false).forEach(tree => tree.emit("tabHide"))
		treesList.forEach(tree => tree.emit("tabShow"))
		geneatree.emit("treeFiltered", { trees: treesList, query: data })
		if(treesList.length === 1 && treesList[0] !== geneatree.trees.selected) {
			geneatree.emit("treeSelect", treesList[0])
		} else if(geneatree.trees.selected !== null && treesList.length !== 1) {
			geneatree.emit("treeUnselect", geneatree.trees.selected)
		}
	}

	treeFilterReset() {
		const { geneatree } = this.properties
		this.identifier.input.value = ""
		geneatree.trees.forEach(tree => tree.emit("tabShow"))
	}

}

export default FilterEventListener
