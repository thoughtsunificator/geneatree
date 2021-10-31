export default {
	tagName: "div",
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
					textContent: `Actions`
				},
			]
		},
		{
			tagName: "div",
			identifier: "views",
			children: [
				{
					tagName: "div",
					identifier: "view-menu",
					children: [
						{
							tagName: "div",
							style: "display: grid; grid-gap: 5px; background-color: #b29e9e; padding: 10px;",
							children: [
								{
									tagName: "button",
									identifier: "export",
									textContent: "Exporter"
								},
								{
									tagName: "button",
									className: "button-danger",
									identifier: "delete",
									textContent: "Supprimer"
								}
							]
						}
					]
				},
				{
					tagName: "div",
					identifier: "view-export"
				},
				{
					tagName: "div",
					identifier: "view-print"
				}
			]
		}
	]
}
