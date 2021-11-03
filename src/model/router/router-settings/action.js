export default {
	tagName: "div",
	style: "display: grid; grid-gap: 5px; background-color: #b29e9e; padding: 10px;",
	children: [
		{
			tagName: "button",
			type: "button",
			className: "button-danger",
			identifier: "deleteOfflineData",
			textContent: "Vider la base de donnée locale"
		}
	]
}
