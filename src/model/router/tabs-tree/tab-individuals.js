export default {
	tagName: "div",
	className: "tab-individuals",
	style: "display: grid; grid-gap: 20px",
	children: [
		{
			tagName: "h3",
			className: "title",
			identifier: "title",
			textContent: `Liste des individus`
		},
		{
			tagName: "div",
			style: "display: contents",
			children: [
				{
					tagName: "div",
					style: "display: contents",
					identifier: "list",
					children: [
						{
							tagName: "input",
							identifier: "searchInput",
							placeholder: "Filtrer les individus",
						},
						{
							tagName: "div",
							style: "display: none; text-align: center;",
							identifier: "placeholder",
							textContent: "Aucun résultats."
						},
						{
							tagName: "div",
							className: "grid-gap",
							style: "display: none",
							identifier: "individuals"
						}
					]
				}
			]
		},
	]
}
