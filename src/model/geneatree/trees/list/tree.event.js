import { EventListener } from "domodel"

/**
 * @global
 */
class TreeEventListener extends EventListener {

	select() {
		this.root.classList.add("active")
		this.properties.geneatree.emit("osdSet", { text: `Tree ${this.properties.tree.meta.name} selected`, type: "valid" })
	}

	unselect() {
		this.root.classList.remove("active")
	}

	update() {
		this.identifier.name.textContent = this.properties.tree.meta.name
		this.identifier.name.title = this.properties.tree.meta.name
	}

	remove() {
		this.root.remove()
	}

	tabHide() {
		this.root.style.display = "none"
	}

	tabShow() {
		this.root.style.display = ""
	}

}

export default TreeEventListener
