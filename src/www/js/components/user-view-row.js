import React from 'react';

export default props => <tr>
	<td>{props.user.firstName}</td>
	<td>{props.user.lastName}</td>
	<td>{props.user.title}</td>
	<td>{props.user.email}</td>
	<td>
		<button className='btn btn-primary btn-sm' type='button' onClick={() => props.onEdit(props.user.id)}>Edit</button>
		<button className='btn btn-danger btn-sm' type='button' onClick={() => props.onDelete(props.user)}>Delete</button>
	</td>
</tr>;
