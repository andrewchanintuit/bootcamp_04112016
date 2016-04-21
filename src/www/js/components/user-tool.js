import React from 'react';
import Relay from 'react-relay';
import BaseComponent from './base-component';
import UserTableComponent from './user-table';
import InsertUserMutation from '../mutations/insert-user-mutation';
import UpdateUserMutation from '../mutations/update-user-mutation';
import DeleteUserMutation from '../mutations/delete-user-mutation';

export default class UserTool extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
			//users: [].concat(this.props.users)
		};

		this._saveUser = this._saveUser.bind(this);
		this._editUser = this._editUser.bind(this);
		this._cancelEditUser = this._cancelEditUser.bind(this);
		this._deleteUser = this._deleteUser.bind(this);
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

	render() {
		return <div className='col-md-12'>
			<UserTableComponent
				users={this.props.viewer.users} editUserId={this.state.editUserId}
				onSave={this._saveUser} onDelete={this._deleteUser}
				onEdit={this._editUser} onCancelEdit={this._cancelEditUser} />
		</div>;
	}
}
