import TreesModel from "./geneatree/trees.js"
import NavigationModel from "./geneatree/navigation.js"

import TreesBinding from "./geneatree/trees.binding.js"
import NavigationBinding from "./geneatree/navigation.binding.js"

export default {
	tagName: "div",
	id: "geneatree",
	children: [
		{
			model: TreesModel,
			binding: TreesBinding
		},
		{
			tagName: "div",
			id: "router",
			identifier: "router",
			children: [

				{
					tagName: "button",
					title: "Afficher ou masquer la liste des arbres",
					identifier: "treesToggle",
					id: "trees-toggle",
					textContent: "☰"
				},
			]
		},
		{
			model: NavigationModel,
			binding: NavigationBinding
		}
	]
}
