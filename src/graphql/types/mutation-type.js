import { GraphQLObjectType } from 'graphql';
import {insertWidgetMutationType} from './insert-widget-mutation';
import {updateWidgetMutationType} from './update-widget-mutation';
import {deleteWidgetMutationType} from './delete-widget-mutation';
import {insertUserMutationType} from './insert-user-mutation';
import {updateUserMutationType} from './update-user-mutation';
import {deleteUserMutationType} from './delete-user-mutation';


export const mutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		insertWidget: insertWidgetMutationType,
		updateWidget: updateWidgetMutationType,
		deleteWidget: deleteWidgetMutationType,
		insertUser: insertUserMutationType,
		updateUser: updateUserMutationType,
		deleteUser: deleteUserMutationType
	})
});
