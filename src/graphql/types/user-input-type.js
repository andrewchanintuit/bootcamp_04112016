import { GraphQLInputObjectType, GraphQLString, GraphQLID } from 'graphql';

const fields = {
	firstName: {
		type: GraphQLString,
		description: 'User first name'
	},
	lastName: {
		type: GraphQLString,
		description: 'User last name'
	},
	title: {
		type: GraphQLString,
		description: 'User title'
	},
	email: {
		type: GraphQLString,
		description: 'User email'
	}
};

export const updateUserInputType = new GraphQLInputObjectType({
	name: 'InputUpdateUser',
	description: 'Update a user',
	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'User id'
		},
		name: {
			type: GraphQLString,
			description: 'User  name'
		}
	})
});

export const insertUserInputType = new GraphQLInputObjectType({
	name: 'InputInsertUser',
	description: 'A user',
	fields: () => fields
});

export const updateUserFromUserInputType = new GraphQLInputObjectType({
	name: 'InputUpdateUserFromUser',
	description: 'A user',
	fields: () => Object.assign({}, fields, { id: { type: GraphQLID } })
});
