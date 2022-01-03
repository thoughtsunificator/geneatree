export default data => ({
	tagName: "div",
	style: "display: contents",
	children: [
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