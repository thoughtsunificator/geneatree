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

	update() {
		this.identifier.fileReference.textContent = tree.meta.fileReference
		this.identifier.fileReference.title = tree.meta.fileReference
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
