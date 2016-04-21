import { mutationWithClientMutationId, fromGlobalId, offsetToCursor } from 'graphql-relay';
import { updateUserFromUserInputType } from './user-input-type';
import { viewerType } from './viewer-type';
import { UserEdge } from '../connections/user-connection';
import { getViewer, getUsersFromUser, updateUserFromUser } from '../../database';

export const updateUserMutationType = mutationWithClientMutationId({
	// name of the mutation
	name: 'UpdateUserFromUser',

	inputFields: {
		user: {
			type: updateUserFromUserInputType
		}
	},

	mutateAndGetPayload: ({user}) => {
		// extract numeric widget id from global id
		user.id = fromGlobalId(user.id).id;
		// extract numeric owner id from global id
		// save widget with extracted ids
		return updateUserFromUser(user);
	},

	outputFields: {
		viewer: {
			type: viewerType,
			resolve: () => getViewer(1)
		},
		userEdge: {
			type: UserEdge,
			resolve: user => {
				return getUsersFromUser().then(users => {
					const offset = users.indexOf(users.find(w => w.id === user.id));
					return {
						cursor: offsetToCursor(offset),
						node: user
					};
				});
			}
		}
	}

});
