export default data => ({
    tagName: "div",
    style: "display: grid; grid-gap: 5px; background-color: #b29e9e; padding: 10px;",
    children: [
        {
            tagName: "button",
            identifier: "export",
            textContent: "Export"
        },
        {
            tagName: "button",
            className: "button-danger",
            identifier: "delete",
            textContent: "Delete"
        }
    ]
})
