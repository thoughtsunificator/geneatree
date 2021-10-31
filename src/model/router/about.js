export default data => ({
	tagName: "div",
	id: "view-about",
	style: "display: grid; grid-gap: 10px",
	children: [
		{
			tagName: "div",
			className: "title",
			style: "display: grid; grid-template-columns: auto 1fr;grid-auto-columns: max-content;",
			children: [
				{
					tagName: "h3",
					identifier: "title",
					style: "grid-column-start: 1; grid-row: 1; justify-self: center; align-self: center; grid-column-end: 3;",
					textContent: `geneatree v0.0.8`
				},
			]
		},
		{
			tagName: "div",
			identifier: "content",
			children: [
				{
					tagName: "div",
					style: "padding: var(--SIZE_XXS); background-color: #332e2e2e; color: #0b0a0a; border: 2px solid #26202030; border-bottom: 3px solid #806363d1;",
					children: [
						{
							tagName: `p`,
							innerHTML: `Application web permettant le traitement et l'export d'arbres généalogique.`
						}
					]
				}
			]
		}
	]
})
