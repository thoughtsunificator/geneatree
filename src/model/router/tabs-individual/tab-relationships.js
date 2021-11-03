export default {
	tagName: "div",
	className: "tab-relationships",
	style: "display: grid; grid-gap: 20px",
	children: [
		{
			tagName: "h3",
			identifier: "title",
			style: "grid-column-start: 1; grid-row: 1; justify-self: center; align-self: center; grid-column-end: 3;",
			textContent: `Relationships`
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
											placeholder: "Filter relationships",
										},
										{
											tagName: "div",
											style: "display: none",
											identifier: "placeholder",
											textContent: "No relationships were found."
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