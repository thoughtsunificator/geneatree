export default data => ({
	tagName: "div",
	className: `individual ${data.individual.meta.gender} ${data.individual.meta.decujus ? "decujus" : ""}`,
	style: "display: grid",
	title: "View individual",
	children: [
		{
			tagName: "h4",
			textContent: data.individual.meta.birthName
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "div",
					textContent: [data.individual.meta.firstName, data.individual.meta.lastName].join(" ")
				}
			]
		}
	]
})
