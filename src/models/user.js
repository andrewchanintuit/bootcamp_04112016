export default class {
	constructor(user) {
		this.id = user._id;
		this.name = user.firstName;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.title = user.title;
		this.email = user.email;
		this.widgets = [];
	}

	addWidget(widget) {
		this.widgets.push(widget);
	}
}
