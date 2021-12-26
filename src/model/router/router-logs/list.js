import Log from "../../../object/log.js"

export default data => ({
	tagName: "div",
	identifier: "view-list",
	children: [
		{
			tagName: "div",
			style: "display: grid; grid-gap: 10px;",
			children: [
				{
					tagName: "input",
					identifier: "searchInput",
					placeholder: "Filtrer les logs",
				},
				{
					tagName: "div",
					style: "display: grid;grid-template-columns: 1fr auto auto; grid-gap: 10px; padding: 10px 0;",
					children: [
						{
							tagName: "div",
							style: "justify-content: center;display: grid;grid-auto-flow: column; grid-gap: 15px;",
							identifier: "types",
							children: [
								...Object.keys(Log.TYPE).map(key => ({
										tagName: "label",
										children: [
											{
												tagName: "input",
												type: "checkbox",
												identifier: `type-${Log.TYPE[key].toLowerCase()}`,
												name: "type",
												checked:  Log.TYPE[key] !== Log.TYPE.DEBUG
											},
											{
												tagName: "span",
												textContent: Log.TYPE[key]
											}
										]
									}))
							]
						},
						{
							tagName: "button",
							identifier: "clearButton",
							className: "button-danger",
							textContent: "Vider"
						},
						{
							tagName: "button",
							identifier: "exportButton",
							className: "button4",
							textContent: "Exporter"
						}
					]
				}
			]
		},
		{
			tagName: "div",
			style: "display: none",
			identifier: "placeholder",
			textContent: "Aucun log n'a pu être trouvé."
		},
		{
			tagName: "div",
			className: "grid-gap",
			style: "display: none",
			identifier: "list"
		}
	]
})
