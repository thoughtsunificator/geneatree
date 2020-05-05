import Persistable from "./persistable.js"

/**
 * @global
 */
class Relationship extends Persistable {

	/**
	 * @property RelationshipType {RelationshipType}
	 * @property RelationshipType.PARENTING  {string}
	 * @property RelationshipType.MARRIAGE   {string}
	 */
	static TYPES = {
		PARENTING: "PARENTING",
		MARRIAGE: "MARRIAGE"
	}

	/**
	 * @param  {number} id
	 * @param  {RelationshipType} type
	 * @param  {RelationshipIndividual[]} relationshipIndividuals
	 */
	constructor(id, type, relationshipIndividuals) {
		super(id)
		this._type = type
		this._relationshipIndividuals = relationshipIndividuals
		this._meta = {
			startDate: null,
			endDate: null,
			place: ""
		}
	}

	/**
	 * @readonly
	 * @type {RelationshipType}
	 */
	get type() {
		return this._type
	}

	/**
	 * @readonly
	 * @type {RelationshipIndividual[]}
	 */
	get relationshipIndividuals() {
		return this._relationshipIndividuals
	}

	/**
	 * @readonly
	 * @type {object}
	 */
	get meta() {
		return this._meta
	}

}

export default Relationship
