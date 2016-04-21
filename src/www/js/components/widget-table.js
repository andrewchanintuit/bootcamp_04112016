import React from 'react';
import WidgetViewRowComponent from './widget-view-row';
import WidgetEditRowComponent from './widget-edit-row';

export default props => <table className="table table-inverse">
	<thead>
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Color</th>
			<th>Size</th>
			<th>Quantity</th>
			<th>Owner</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{props.widgets.edges.map(edge => props.editWidgetId === edge.node.id
			? <WidgetEditRowComponent colorList={props.colorList} sizeList={props.sizeList}
				userList={props.userList} key={edge.node.id} widget={edge.node}
				onSave={props.onSave} onCancelEdit={props.onCancelEdit} />
			: <WidgetViewRowComponent key={edge.node.id} widget={edge.node}
				onEdit={props.onEdit} onDelete={props.onDelete} />)
		}
		<WidgetEditRowComponent colorList={props.colorList} sizeList={props.sizeList} userList={props.userList} onSave={props.onSave} key="-1" />
	</tbody>
</table>;
