import React from 'react';

export default class EditRow extends React.Component {

	constructor(props) {
		super(props);

		if (props.user) {
			this.state = {
				id: props.user.id,
				firstName: props.user.firstName,
				lastName: props.user.lastName,
				title: props.user.title,
				email: props.user.email
			};
		} else {
			this.state = {
				id: -1,
				firstName: '',
				lastName: '',
				title: '',
				email: ''
			};
		}

		this._onChange = this._onChange.bind(this);
		this._onSave = this._onSave.bind(this);
	}

	_onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	_onSave(user) {
		this.props.onSave(Object.assign({}, user));

		this.setState({
			id: -1,
			firstName: '',
			lastName: '',
			title: '',
			email: ''
		});
	}

	render() {

		return <tr>
			<td><input className="form-control form-control-sm" type="text" name="firstName" value={this.state.firstName} onChange={this._onChange} /></td>
			<td><input className="form-control form-control-sm" type="text" name="lastName" value={this.state.lastName} onChange={this._onChange} /></td>
			<td><input className="form-control form-control-sm" type="text" name="title" value={this.state.title} onChange={this._onChange} /></td>
			<td><input className="form-control form-control-sm" type="text" name="email" value={this.state.email} onChange={this._onChange} /></td>
			<td>
				<button className='btn btn-primary btn-sm' type='button' onClick={() => this._onSave(this.state)}>Save</button>
				<button className='btn btn-default btn-sm' type='button' onClick={this.props.onCancelEdit}>Cancel</button>
			</td>
		</tr>;

	}
}
