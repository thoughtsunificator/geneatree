export default {
	tagName: "div",
	style: "display: contents",
	children: [
		{
			tagName: "h3",
			textContent: "Relationship",
			className: "title"
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
							textContent: `Cet enfant reconnu`
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
							textContent: `Cet enfant adopté`
						}
					]
				}
			]
		},
		{
			tagName: "div",
			style: "display: none; grid-template-columns: auto auto; grid-gap: var(--SIZE_MEDIUM);",
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
							textContent: "Adoption simple"
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
							textContent: "Adoption plénière"
						}
					]
				}
			]
		}
	]
}
