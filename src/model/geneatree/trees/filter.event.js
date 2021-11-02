import { EventListener } from "domodel"

/**
 * @global
 */
class FilterEventListener extends EventListener {

	treeFilter(data) {
		const { geneatree } = this.properties
		const treesList = geneatree.findTrees(data)
		geneatree.trees.list.filter(tree => treesList.includes(tree) === false).forEach(tree => tree.emit("tab hide"))
		treesList.forEach(tree => tree.emit("tab show"))
		geneatree.emit("tree filtered", { trees: treesList, query: data })
		if(treesList.length === 1 && treesList[0] !== geneatree.trees.selected) {
			geneatree.emit("tree select", treesList[0])
		} else if(geneatree.trees.selected !== null && treesList.length !== 1) {
			geneatree.emit("tree unselect", geneatree.trees.selected)
		}
	}

	treeFilterReset() {
		const { geneatree } = this.properties
		this.identifier.input.value = ""
		geneatree.trees.forEach(tree => tree.emit("tab show"))
	}

}

export default FilterEventListener
