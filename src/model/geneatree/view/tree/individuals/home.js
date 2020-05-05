export default data => ({
    tagName: "div",
    children: [
        {
            tagName: "div",
            style: "display: grid; grid-gap: 20px;",
            children: [
                {
                    tagName: "input",
                    identifier: "searchInput",
                    placeholder: "Filter individuals",
                },
                {
                    tagName: "div",
                    style: "display: none",
                    identifier: "placeholder",
                    textContent: "No individuals were found for this query."
                },
                {
                    tagName: "div",
                    className: "grid-gap",
                    style: "display: none",
                    identifier: "list"
                },
                {
                    tagName: "button",
                    identifier: "add",
                    className: "button4",
                    textContent: "Add individual"
                }
            ]
        }
    ]
})
