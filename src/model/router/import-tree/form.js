export default data => ({
	tagName: "div",
	style: "display: contents",
	children: [
		{
			tagName: "h3",
			textContent: "Importer un fichier",
			className: "title"
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Format:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "select",
									style: "width: 100%",
									identifier: "format",
									required: true,
									children: data.map(format => ({
										tagName: "option",
										textContent: format,
										value: format
									}))
								}
							]
						}
					]
				}
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Fichier:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "input",
									required: true,
									accept: ".GED",
									type: "file",
									style: "width: 100%",
									identifier: "file"
								}
							]
						}
					]
				}
			]
		}
	]
})
