import React from 'react';
import UserViewRowComponent from './user-view-row';
import UserEditRowComponent from './user-edit-row';

export default props => <table className="table table-inverse">
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Title</th>
			<th>Email</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{props.users.edges.map(edge => props.editUserId === edge.node.id
			? <UserEditRowComponent key={edge.node.id} user={edge.node} onSave={props.onSave} onCancelEdit={props.onCancelEdit} />
			: <UserViewRowComponent key={edge.node.id} user={edge.node} onEdit={props.onEdit} onDelete={props.onDelete} />)
		}
		<UserEditRowComponent onSave={props.onSave} key="-1" />
	</tbody>
</table>;
