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
					textContent: "Nom de naissance:",
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
					textContent: "Prénom:",
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
					textContent: "Nom:",
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
					textContent: "Genre:",
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
					textContent: "Date de naissance:",
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
					textContent: "Lieu de naissance:",
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
					textContent: "Date de décès",
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
					textContent: "Lieu de décès:",
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
					textContent: "Domicile:",
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
					textContent: "Profession:",
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
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Téléphone portable:",
					children: [
						{
							tagName: "div",
							children: [
								{
									identifier: "cellPhone",
									className: "width-100",
									type: "tel",
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
					textContent: "Téléphone Fixe:",
					children: [
						{
							tagName: "div",
							children: [
								{
									identifier: "homePhone",
									className: "width-100",
									type: "tel",
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
					textContent: "Email:",
					children: [
						{
							tagName: "div",
							children: [
								{
									identifier: "mail",
									type: "email",
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
					style: "display: grid; grid-template-columns: 1fr auto",
					textContent: "Décédé saisi:",
					children: [
						{
							identifier: "seisin",
							tagName: "input",
							type: "checkbox"
						},
					]
				}
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					style: "display: grid; grid-template-columns: 1fr auto",
					textContent: "Héritier:",
					children: [
						{
							tagName: "input",
							identifier: "heir",
							type: "checkbox"
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
					textContent: "Quotité (n/d) :",
					children: [
						{
							tagName: "div",
							style: "display: grid; grid-auto-flow: column; grid-gap: 5px;",
							children: [
								{
									tagName: "input",
									type: "number",
									className: "width-100",
									identifier: "quota_numerator"
								},
								{
									tagName: "input",
									type: "number",
									className: "width-100",
									identifier: "quota_denominator"
								}
							]
						}
					]
				},
			]
		}
	]
})