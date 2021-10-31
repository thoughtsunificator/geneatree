import Geneatree from "/object/geneatree.js"
import { THEMES } from "/model/geneatree.binding.js"
import { FormModel } from '@domodel/form'

const INCLUDE_SETTINGS = ["offline", "minimap", "osd"]

export default data => FormModel({
	tagName: "div",
	style: "display: contents",
	children: [
		...Object.keys(Geneatree.SETTINGS).filter(name => INCLUDE_SETTINGS.includes(name)).map(name => ({
			tagName: "label",
			textContent: `${name}:`,
			children: [
				{
					tagName: "div",
					children: [
						{
							tagName: "select",
							style: "width: 100%",
							identifier: name,
							children: [
								{
									tagName: "option",
									value: true,
									textContent: "Activée"
								},
								{
									tagName: "option",
									value: false,
									textContent: "Désactivée"
								}
							]
						}
					]
				},
			]
		})),
		{
			tagName: "label",
			textContent: "theme:",
			children: [
				{
					tagName: "div",
					children: [
						{
							tagName: "select",
							style: "width: 100%",
							identifier: "theme",
							children: THEMES.map(theme => ({
								tagName: "option",
								value: theme,
								textContent: theme
							}))
						}
					]
				},
			]
		}
	]
})
