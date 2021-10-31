export default {
	tagName: "div",
	className: "tab-relationships",
	style: "display: grid; grid-gap: 20px",
	children: [
		{
			tagName: "div",
			className: "title",
			style: "display: grid;grid-template-columns: auto 1fr;grid-auto-columns: max-content;",
			children: [
				{
					tagName: "button",
					style: "display: none; grid-column: 1;grid-row: 1;",
					identifier: "back",
					textContent: "⬅",
					title: "Go back"
				},
				{
					tagName: "h3",
					identifier: "title",
					style: "grid-column-start: 1; grid-row: 1; justify-self: center; align-self: center; grid-column-end: 3;",
					textContent: `List des relations`
				},
			]
		},
		{
			tagName: "div",
			style: "display: contents",
			children: [
				{
					tagName: "div",
					identifier: "views",
					children: [
						{
							tagName: "div",
							identifier: "view-list",
							children: [
								{
									tagName: "div",
									style: "display: grid; grid-gap: 20px;",
									children: [
										{
											tagName: "input",
											identifier: "searchInput",
											placeholder: "Filtrer les relations",
										},
										{
											tagName: "div",
											style: "display: none",
											identifier: "placeholder",
											textContent: "Aucune relation n'a pu être trouvée."
										},
										{
											tagName: "div",
											className: "grid-gap",
											style: "display: none",
											identifier: "list"
										}
									]
								}
							]
						},
					]
				}
			]
		},
	]
}
