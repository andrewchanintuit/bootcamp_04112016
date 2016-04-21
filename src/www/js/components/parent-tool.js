import React from 'react';
import Relay from 'react-relay';
import BaseComponent from './base-component';
import UserTableComponent from './user-table';
import WidgetTableComponent from './widget-table';
import InsertUserMutation from '../mutations/insert-user-mutation';
import UpdateUserMutation from '../mutations/update-user-mutation';
import DeleteUserMutation from '../mutations/delete-user-mutation';
import InsertWidgetMutation from '../mutations/insert-widget-mutation';
import UpdateWidgetMutation from '../mutations/update-widget-mutation';
import DeleteWidgetMutation from '../mutations/delete-widget-mutation';

export default class ParentTool extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
			//widgets: [].concat(this.props.widgets)
		};

		this._saveUser = this._saveUser.bind(this);
		this._editUser = this._editUser.bind(this);
		this._cancelEditUser = this._cancelEditUser.bind(this);
		this._deleteUser = this._deleteUser.bind(this);

		this._saveWidget = this._saveWidget.bind(this);
		this._editWidget = this._editWidget.bind(this);
		this._cancelEditWidget = this._cancelEditWidget.bind(this);
		this._deleteWidget = this._deleteWidget.bind(this);
	}

	_appendUser(user) {
		Relay.Store.commitUpdate(new InsertUserMutation(
			Object.assign({	viewer: this.props.viewer, user: null }, user)
		));
	}

	_updateUser(user) {
		Relay.Store.commitUpdate(new UpdateUserMutation(
			Object.assign({	viewer: this.props.viewer, user: user }, user)
		));
	}

	_saveUser(user) {
		if (user.id !== -1) {
			this._updateUser(user);
		} else {
			this._appendUser(user);
		}
		this.setState({ editUserId: null });
	}

	_editUser(userId) {
		this.setState({ editUserId: userId });
	}

	_cancelEditUser() {
		this.setState({ editUserId: null });
	}

	_deleteUser(user) {
		Relay.Store.commitUpdate(new DeleteUserMutation(
			{	viewer: this.props.viewer, user, userId: user.id }
		));
	}

	_appendWidget(widget) {
		Relay.Store.commitUpdate(new InsertWidgetMutation(
			Object.assign({	viewer: this.props.viewer, widget: null }, widget)
		));
	}

	_updateWidget(widget) {
		Relay.Store.commitUpdate(new UpdateWidgetMutation(
			Object.assign({	viewer: this.props.viewer, widget: widget }, widget)
		));
	}

	_saveWidget(widget) {
		if (widget.id !== -1) {
			this._updateWidget(widget);
		} else {
			this._appendWidget(widget);
		}
		this.setState({ editWidgetId: null });
	}

	_editWidget(widgetId) {
		this.setState({ editWidgetId: widgetId });
	}

	_cancelEditWidget() {
		this.setState({ editWidgetId: null });
	}

	_deleteWidget(widget) {
		Relay.Store.commitUpdate(new DeleteWidgetMutation(
			{	viewer: this.props.viewer, widget, widgetId: widget.id }
		));
	}

	render() {
		return <div className='col-md-12'>
			<UserTableComponent
				users={this.props.viewer.users} editUserId={this.state.editUserId}
				onSave={this._saveUser} onDelete={this._deleteUser}
				onEdit={this._editUser} onCancelEdit={this._cancelEditUser} />
			<br/><br/>
			<WidgetTableComponent
				widgets={this.props.viewer.widgets} editWidgetId={this.state.editWidgetId}
				colorList={this._fromEnumType(this.props.colors)}
				sizeList={this._fromEnumType(this.props.sizes)}
				userList={this._fromEdges(this.props.viewer.users)}
				onSave={this._saveWidget} onDelete={this._deleteWidget}
				onEdit={this._editWidget} onCancelEdit={this._cancelEditWidget} />
		</div>;
	}
}
