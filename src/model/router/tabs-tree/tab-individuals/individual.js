export default data => ({
	tagName: "div",
	className: `individual ${data.meta.gender} ${data.meta.decujus ? "decujus" : ""}`,
	style: "display: grid",
	title: "Selectionner cet individu",
	children: [
		{
			tagName: "h4",
			textContent: data.meta.birthName
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "div",
					textContent: [data.meta.firstName, data.meta.lastName].join(" ")
				}
			]
		}
	]
})
