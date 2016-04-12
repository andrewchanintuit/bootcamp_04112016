'use strict';

import {
	GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt
} from 'graphql';

import { userType } from './types/user-type';
import { widgetType } from './types/widget-type';
import { User, Widget, users, widgets } from './data';

const query = new GraphQLObjectType({

	name: 'Query',
	fields: () => ({
		widget: {
			type: widgetType,
			description: 'Find widget by id',
			args: {
				id: {
					type: GraphQLInt,
					description: 'A widget id'
				}
			},
			resolve: (_, {id}) => widgets.find(w => w.id === id)
		},
		widgets: {
			type: new GraphQLList(widgetType),
			description: 'A list of widgets',
			resolve: () => widgets
		}
	})

});

export const widgetSchema = new GraphQLSchema({ query });