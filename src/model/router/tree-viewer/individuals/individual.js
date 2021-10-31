export const WIDTH = 160
export const HEIGHT = 80

export default data => ({
	tagName: "div",
	className: "individual",
	children: [
		{
			tagName: "div",
			identifier: "self",
			style: `width: ${WIDTH}px; height: ${HEIGHT}px;`,
			className: `self ${data.meta.gender} ${data.meta.decujus ? "decujus" : ""}`,
			tabIndex: 0,
			children: [
				{
					identifier: "birthName",
					tagName: "h3",
					style: "font-variant: all-small-caps;",
					textContent: data.meta.birthName
				},
				{
					tagName: "div",
					className: "name",
					identifier: "name",
					textContent: [data.meta.firstName, data.meta.lastName].join(" ")
				},
				{
					tagName: "div",
					identifier: "birth",
					className: "birth",
					textContent: (data.meta.birthDate || data.meta.birthPlace) && `° ${data.meta.birthDate || "???"} (${data.meta.birthPlace || "???"})`
				},
				{
					tagName: "div",
					identifier: "death",
					className: "death",
					textContent: (data.meta.deathDate || data.meta.deathPlace) && `+ ${data.meta.deathDate || "???"} (${data.meta.deathPlace || "???"})`
				}
			]
		},
		{
			tagName: "div",
			identifier: "addParent",
			className: `placeholder`,
			style: ` width: ${WIDTH}px; height: ${HEIGHT}px; grid-row: 1;`,
			textContent: "Ajouter un parent",
		},
		{
			tagName: "div",
			identifier: "addSpouse",
			className: `placeholder`,
			style: ` width: ${WIDTH}px; height: ${HEIGHT}px;`,
			textContent: "Ajouter un conjoint"
		},
		{
			tagName: "div",
			identifier: "addChild",
			className: `placeholder`,
			style: ` width: ${WIDTH}px; height: ${HEIGHT}px;`,
			textContent: "Ajouter un enfant"
		}
	]
})
