import {GraphQLID} from 'graphql';
import {mutationWithClientMutationId, fromGlobalId} from 'graphql-relay';
import {viewerType} from './viewer-type'
import {getViewer, deleteUserFromUser } from '../../database';

export const deleteUserMutationType = mutationWithClientMutationId({
	//name of mutation
	name : 'deleteUserFromUser',
	//input fields
	inputFields: {
		userId: {
			type: GraphQLID
		}
	},


	mutateAndGetPayload: ({userId}) => {
		return deleteUserFromUser(fromGlobalId(userId).id);
	},



	outputFields: {
		viewer: {
			type: viewerType,
			resolve: () =>getViewer(1)
		},
		userId : {
			type: GraphQLID,
			resolve: user =>user.id
		}
	}

});
