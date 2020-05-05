import { FormModel } from "@domodel/form"

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

		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					children: [
						{
							tagName: "input",
							identifier: "recognised",
							type: "checkbox",
							checked: true
						},
						{
							tagName: "span",
							textContent: "Cet enfant est reconnu"
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
					identifier: "check_adoption",
					children: [
						{
							tagName: "input",
							identifier: "adopted",
							type: "checkbox"
						},
						{
							tagName: "span",
							textContent: "Cet enfant est adopté"
						}
					]
				}
			]
		},
		{
			tagName: "div",
			style: "display: none",
			identifier: "radios_adopted",
			children: [
				{
					tagName: "label",
					children: [
						{
							tagName: "input",
							type: "radio",
							identifier: "adopted_simple",
							name: "adoption",
							checked: true
						},
						{
							tagName: "span",
							textContent: "Simple adoption"
						}
					]
				},
				{
					tagName: "label",
					children: [
						{
							tagName: "input",
							type: "radio",
							identifier: "adopted_full",
							name: "adoption"
						},
						{
							tagName: "span",
							textContent: "Plenary adoption"
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
