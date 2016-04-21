import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField, connectionArgs, connectionFromPromisedArray } from 'graphql-relay';
import { nodeInterface } from '../node-definitions';
import { widgetConnection } from '../connections/widget-connection';
import { registerType } from '../resolve-type';
import User from '../../models/user';
import { getUserWidgets, getUserFromUser } from '../../database';

export const userType = new GraphQLObjectType({
	name: 'User',
	description: 'A user',
	fields: () => ({
		id: globalIdField('User'),
		name: {
			type: GraphQLString,
			description: 'The user name'
		},
		firstName: {
			type: GraphQLString,
			description: 'The user first name'
		},
		lastName: {
			type: GraphQLString,
			description: 'The user last name'
		},
		title: {
			type: GraphQLString,
			description: 'The user title'
		},
		email: {
			type: GraphQLString,
			description: 'The user email'
		},
		widgets: {
			type: widgetConnection,
			description: 'A list of widgets',
			args: connectionArgs,
			resolve: ({id}, args) => connectionFromPromisedArray(getUserWidgets(id), args)
		}
	}),
	interfaces: () => [nodeInterface]
});

registerType(User, userType, getUserFromUser);
