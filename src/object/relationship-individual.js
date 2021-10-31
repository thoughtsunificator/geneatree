import Persistable from "./persistable.js"

/**
 * @global
 */
class RelationshipIndividual extends Persistable {

	/**
	 * @property RelationshipRole {RelationshipRole}
	 * @property RelationshipRole.PARENT  {string}
	 * @property RelationshipRole.CHILD   {string}
	 * @property RelationshipRole.SPOUSE  {string}
	 */
	static ROLES = {
		PARENT: "PARENT",
		CHILD: "CHILD",
		SPOUSE: "SPOUSE"
	}

	/**
	 * @param  {Individual}       individual
	 * @param  {RelationshipRole} role
	 */
	constructor(individual, role) {
		super(-1)
		this._individual = individual
		this._role = role
	}

	/**
	 * @readonly
	 * @type {Individual}
	 */
	get individual() {
		return this._individual
	}

	/**
	 * @readonly
	 * @type {RelationshipRole}
	 */
	get role() {
		return this._role
	}

}

export default RelationshipIndividual
