export default data => ({
	tagName: "div",
	id: "view-new-tree",
	children: [
		{
			tagName: "h3",
			className: "title",
			identifier: "title",
			textContent: `Ajouter un arbre`
		},
		{
			tagName: "div",
			style: "display: grid; grid-gap: 5px",
			children: [
				{
					tagName: "button",
					identifier: "createButton",
					tabIndex: 1,
					textContent: "Create a new tree"
				},
				{
					tagName: "button",
					identifier: "importButton",
					tabIndex: 2,
					textContent: "Import existing tree"
				}
			]
		}
	]
})
