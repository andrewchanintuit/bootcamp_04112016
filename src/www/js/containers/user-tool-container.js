import Relay from 'react-relay';
import UserToolComponent from '../components/user-tool';
import InsertUserMutation from '../mutations/insert-user-mutation';
import UpdateUserMutation from '../mutations/update-user-mutation';
import DeleteUserMutation from '../mutations/delete-user-mutation';

export default Relay.createContainer(UserToolComponent, {

	fragments: {

		viewer: () => Relay.QL`
			fragment on Viewer {
				id
				users(first: 1000) {
					edges {
						node {
							id
							firstName
							lastName
							title
							email
						}
					}
				}
				${InsertUserMutation.getFragment('viewer')}
				${UpdateUserMutation.getFragment('viewer')}
				${DeleteUserMutation.getFragment('viewer')}
			}
		`
	}
});
