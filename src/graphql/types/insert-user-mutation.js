import {mutationWithClientMutationId, fromGlobalId, offsetToCursor } from 'graphql-relay';
import {insertUserFromUserInputType } from './user-input-type';
import {viewerType} from './viewer-type';
import {UserEdge} from  '../connections/user-connection';
import {getViewer, getUsersFromUser, insertUserFromUser } from '../../database';

export const insertUserMutationType = mutationWithClientMutationId({
	//name of mutation
	name : 'InsertUserFromUser',
	//input fields
	inputFields: {
		user: {
			type: insertUserFromUserInputType
		}
	},

	outputFields: {
		viewer: {
			type: viewerType,
			resolve: () =>getViewer(1)
		},
		userEdge: {
			type: UserEdge,
			resolve : user => {
				return getUsersFromUser().then(users => {
					const offset = users.indexOf(users.find(w =>w.id === user.id));
					return {
						cursor: offsetToCursor(offset),
						node:user
					};
				});
			}
		}
	},

	mutateAndGetPayload: ({user}) => {
		//save user with extracted ids
		return insertUserFromUser(user);
	}
});
