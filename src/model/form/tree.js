export default data => ({
	tagName: "div",
	style: "display: contents",
	children: [
		{
			tagName: "h3",
			className: "title",
			textContent: data.title
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Name:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "input",
									required: true,
									className: "width-100",
									identifier: "name"
								}
							]
						}
					]
				}
			]
		},
	]
})
