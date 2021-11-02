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
					textContent: "Birth name:",
					children: [
						{
							tagName: "div",
							children: [
								{
									identifier: "birthName",
									className: "width-100",
									tagName: "input",
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
					textContent: "First name:",
					children: [
						{
							tagName: "div",
							children: [
								{
									identifier: "firstName",
									className: "width-100",
									tagName: "input",
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
					textContent: "Last name:",
					children: [
						{
							tagName: "div",
							children: [
								{
									identifier: "lastName",
									className: "width-100",
									tagName: "input",
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
					textContent: "Gender:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "select",
									className: "width-100",
									identifier: "gender",
									children: [
										{
											tagName: "option",
											textContent: "Inconnu",
											value: "unknown"
										},
										{
											tagName: "option",
											value: "man",
											style: "background-color: lightblue",
											textContent: "Homme"
										},
										{
											tagName: "option",
											value: "woman",
											style: "background-color: pink",
											textContent: "Femme"
										},
										{
											tagName: "option",
											value: "other",
											textContent: "Autre"
										}
									]
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
					textContent: "Birth date:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "input",
									identifier: "birthDate",
									className: "width-100",
									type: "date"
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
					textContent: "Birth place:",
					children: [
						{
							tagName: "div",
							children: [
								{
									identifier: "birthPlace",
									className: "width-100",
									tagName: "input",
								}
							]
						}
						// {
						// 	model: AutoCompleteModel,
						// 	binding: AutoCompleteBinding
						// }
					]
				}
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Death date",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "input",
									identifier: "deathDate",
									className: "width-100",
									type: "date"
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
					textContent: "Death place:",
					children: [
						{
							tagName: "div",
							children: [
								{
									identifier: "deathPlace",
									className: "width-100",
									tagName: "input",
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
					textContent: "Address:",
					children: [
						{
							tagName: "div",
							children: [
								{
									identifier: "address",
									className: "width-100",
									tagName: "input",
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
					textContent: "Work:",
					children: [
						{
							tagName: "div",
							children: [
								{
									identifier: "work",
									className: "width-100",
									tagName: "input",
								}
							]
						}
					]
				}
			]
		}
	]
})
