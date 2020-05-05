export default data => ({
    tagName: "div",
    identifier: "view-list",
    children: [
        {
            tagName: "div",
            style: "display: grid; grid-gap: 20px;",
            children: [
                {
                    tagName: "input",
                    identifier: "searchInput",
                    placeholder: "Filter relationships",
                },
                {
                    tagName: "div",
                    style: "display: none",
                    identifier: "placeholder",
                    textContent: "No relationships were found."
                },
                {
                    tagName: "div",
                    className: "grid-gap",
                    style: "display: none",
                    identifier: "list"
                },
                {
                    tagName: "button",
                    identifier: "addButton",
                    className: "button4",
                    textContent: "Add relationship"
                }
            ]
        }
    ]
})
