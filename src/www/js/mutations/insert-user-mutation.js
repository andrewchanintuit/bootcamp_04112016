import Relay from 'react-relay';

export default class extends Relay.Mutation {

	static fragments = {
		viewer: () => Relay.QL`fragment on Viewer { id }`
	}

	getMutation() {
		return Relay.QL`mutation { insertUserFromUser }`;
	}

	// receives the parameters from the constructor, builds
	// the variables to send the GraphQL server
	getVariables() {
		return {
			user: {
				// id is NOT included because we are insert and as such, there is id
				firstName: this.props.firstName,
				lastName: this.props.lastName,
				title: this.props.title,
				email: this.props.email
			}
		};
	}

	getConfigs() {
		return [{
			// insert operation
			type: 'RANGE_ADD',
			// triggers update from container fragment viewer id
			// this is the name of property from the output field
			parentName: 'viewer',
			// id of viewer being updated
			parentID: this.props.viewer.id,
			// name of the connection on viewer
			connectionName: 'users',
			// output field name on GraphQL server, should match the payload
			edgeName: 'userEdge',
			// operation - do an append or prepend and such
			rangeBehaviors: {
				'': 'append'
			}
		}];
	}

	getFatQuery() {
		// corresponds to the structure of the output types
		// patten is used to not specify the parameters for the connections
		return Relay.QL`
			fragment on InsertUserFromUserPayload @relay(pattern: true) {
				viewer {
					users {
						edges {
							node {
								id
								name
								firstName
								lastName
								title
								email
							}
						}
					}
				}
				userEdge
			}
		`;
	}
}
