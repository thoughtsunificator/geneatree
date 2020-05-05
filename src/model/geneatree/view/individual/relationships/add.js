export default data => ({
	tagName: "div",
	children: [
		{
			tagName: "style",
			textContent: `
				.step, .steps, .indicators {
					padding: 0 !important;
				}
			`
		}
	]
})
