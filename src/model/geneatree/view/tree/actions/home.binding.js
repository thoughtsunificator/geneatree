import { Core, Binding } from 'domodel'

export default class extends Binding {

    onCreated() {

        const { geneatree, router, tree } = this.properties

		this.identifier.export.addEventListener("click", () => {
			router.emit("browse", { path: "/export" })
		})
		this.identifier.delete.addEventListener("click", () => {
			geneatree.trees.emit("remove", tree)
		    geneatree.emit("osdSet", { text: `Tree ${tree.meta.name} removed`, type: "valid" })
		})

    }
}
