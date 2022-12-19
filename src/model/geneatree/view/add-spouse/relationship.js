import { FormModel } from "@domodel/form"
import Relationship from "../../../../object/relationship.js"

export default FormModel({
	tagName: "div",
	style: "display: contents",
	children: [
		{
			tagName: "h3",
			textContent: "Relationship",
			className: "title"
		},
		{
			tagName: "select",
			className: "width-100",
			required: true,
			identifier: "unionTypeSelect",
			children: [
				{
					tagName: "option",
					textContent: "Sélectionner un type d'union",
					value: ""
				},
				...Object.keys(Relationship.TYPES).map((key) => ({
					tagName: "option",
					textContent: `${key}`,
					value: key
				}))
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Date (facultatif)",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "input",
									identifier: "relationDate",
									className: "width-100",
									type: "date"
								}
							]
						}
					]
				}
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Lieu (facultatif)",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "input",
									identifier: "relationPlace",
									className: "width-100",
									placeholder: "Entrer un lieu"
								}
							]
						}
					]
				}
			]
		},
	]
})
