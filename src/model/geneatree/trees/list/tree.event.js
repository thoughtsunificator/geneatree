import { EventListener } from "domodel"

/**
 * @global
 */
class TreeEventListener extends EventListener {

	select() {
		this.root.classList.add("active")
	}

	unselect() {
		this.root.classList.remove("active")
	}

	update(data) {
		this.identifier.name.textContent = data.tree.meta.name
		this.identifier.name.title = data.tree.meta.name
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
