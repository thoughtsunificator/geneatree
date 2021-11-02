export default data => ({
	tagName: "div",
	className: `message ${data.type}`,
	textContent: data.text
})
