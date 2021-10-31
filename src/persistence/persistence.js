import LocalStorage from "./local-storage.js"
import Socket from "./socket.js"
import IndexedDBLocal from "./indexeddb-local.js"

export default properties => {

	const { geneatree } = properties

	LocalStorage(properties)
	Socket(properties)
	IndexedDBLocal(properties)

}
