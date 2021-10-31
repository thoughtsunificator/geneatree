export default data => ({
	tagName: "div",
	style: "display: contents",
	children: [
		{
			tagName: "label",
			textContent: "Depuis",
			children: [
				{
					tagName: "div",
					children: [
						{
							tagName: "input",
							type: "date",
							style: "width: 100%",
							identifier: "from",
						}
					]
				}
			]
		},
		{
			tagName: "label",
			textContent: "Jusqu'a",
			children: [
				{
					tagName: "div",
					children: [
						{
							tagName: "input",
							type: "date",
							style: "width: 100%",
							identifier: "to",
						}
					]
				}
			]
		},
		{
			tagName: "label",
			textContent: "Format",
			children: [
				{
					tagName: "div",
					children: [
						{
							tagName: "select",
							style: "width: 100%",
							identifier: "format",
							children: data.map(format => ({
								tagName: "option",
								textContent: format
							}))
						}
					]
				}
			]
		}
	]
})
