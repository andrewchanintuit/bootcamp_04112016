import React from 'react';
import ViewRowComponent from './user-view-row';
import EditRowComponent from './user-edit-row';

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
			? <EditRowComponent key={edge.node.id} user={edge.node} onSave={props.onSave} onCancelEdit={props.onCancelEdit} />
			: <ViewRowComponent key={edge.node.id} user={edge.node} onEdit={props.onEdit} onDelete={props.onDelete} />)
		}
		<EditRowComponent onSave={props.onSave} key="-1" />
	</tbody>
</table>;
