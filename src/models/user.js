export default class {
	constructor(user) {
		console.log('user');
		console.log(user);
		this.id = user.id;
		this.name = user.name;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.email = user.email;
		this.widgets = [];
	}

	addWidget(widget) {
		this.widgets.push(widget);
	}
}
