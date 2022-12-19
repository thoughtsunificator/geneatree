export default data =>({
	tagName: "div",
	children: [
		{
			tagName: "div",
			style: "text-align: center; padding: 5px; background-color: rgba(255, 255, 255, 0.16); border: 1px solid rgba(255, 255, 255, 0.24);font-weight: bold;font-size: 1.1em;",
			textContent: data.type.name
		},
		{
			tagName: "div",
			style: "display: grid; grid-auto-flow: column; border-bottom: 2px solid #0003;",
			children: [
				{
					tagName: "div",
					style: "display: grid; justify-items: center; border-right: 1px solid black",
					className: `individual ${data.relationshipIndividual1.individual.meta.gender} ${data.relationshipIndividual1.individual.meta.decujus ? "decujus" : ""}`,
					children: [
						{
							tagName: "h3",
							style: "font-variant: all-small-caps;",
							textContent: data.relationshipIndividual1.individual.meta.birthName
						},
						{
							tagName: "div",
							textContent: data.relationshipIndividual1.role.name
						},
					]
				},
				{
					tagName: "div",
					style: "display: grid; justify-items: center;",
					className: `individual ${data.relationshipIndividual2.individual.meta.gender} ${data.relationshipIndividual2.individual.meta.decujus ? "decujus" : ""}`,
					children: [
						{
							tagName: "h3",
							style: "font-variant: all-small-caps;",
							textContent: data.relationshipIndividual2.individual.meta.birthName
						},
						{
							tagName: "div",
							textContent: data.relationshipIndividual2.role.name
						},
					]
				}
			]
		}
	]
})
