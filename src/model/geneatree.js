import OSDModel from "./geneatree/osd.js"
import TreesModel from "./geneatree/trees.js"
import NavigationModel from "./geneatree/navigation.js"

import TreesBinding from "./geneatree/trees.binding.js"
import NavigationBinding from "./geneatree/navigation.binding.js"
import OSDBinding from "./geneatree/osd.binding.js"

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
					title: "Afficher ou masquer la liste des trees",
					identifier: "treesToggle",
					id: "trees-toggle",
					textContent: "☰"
				},
			]
		},
		{
			model: OSDModel,
			binding: OSDBinding,
		},
		{
			model: NavigationModel,
			binding: NavigationBinding
		}
	]
}
