import WidgetModel from './mongoose/widget';
import UserModel from './mongoose/user';
import Viewer from './models/viewer';
import User from './models/user';
import Widget from './models/widget';

export const getViewer = (id) => new Viewer({ id });

/*
		Get users from user collection
*/
// get user from user collection
export const getUsersFromUser = () => {
	return new Promise((resolve, reject) => {
		UserModel.find({}, (err, results) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(results.map((result) => {
				console.log('database'+ new User(result));
				return new User(result);
				// return result;
			}));
		});
	});
};

export const getUserFromUser = (id) => {
	return new Promise((resolve, reject) => {
		UserModel.findById(id, (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result ? new User(result) : null);
		});
	});
};

export const updateUserFromUser = (user) => {
	return new Promise((resolve, reject) => {
		UserModel.findByIdAndUpdate(user._id || user.id,
			user,
			(err) => {
				if (err) { reject(err); return; }
				resolve(user ? new User(user) : null);
			});
	});
};

export const insertUserFromUser = (user) => {
	return new Promise((resolve, reject) => {
		var userModel = new UserModel(user);
		userModel.save((err, results) => {
			if (err) { reject(err); return; }
			resolve(results ? new User(results) : null);
		});
	});
};

export const deleteUserFromUser = (id) =>
	new Promise((resolve, reject) =>
		UserModel.findByIdAndRemove(id, (err, results) =>
				err ? reject(err) : resolve(results ? new User(results) : null)));
/*
	Get users from Widget table
*/

// switch from distinct to aggregate, because distinct consider different field order to
// be unique for the document
export const getUsers = () =>
	new Promise((resolve, reject) =>
		WidgetModel.aggregate([
			{ '$group': { '_id': { 'id' : '$owner.id', 'name': '$owner.name' } } }
		], (err, results) =>
			err ? reject(err) : resolve(results.map(owner => new User(owner._id)))));

export const getUser = (id) => {

	return new Promise((resolve, reject) => {
		WidgetModel.findOne({ 'owner.id': id }, (err, results) => {
			if (err) {
				reject(err);
				return;
			}
			resolve((results && results.owner) ? new User(results.owner) : null);
		});
	}).then(user => {

		if (!user) return null;

		return getUserWidgets(user.id).then(widgets => {
			widgets.forEach(function(widget) {
				user.addWidget(new Widget(widget));
			});
			return user;
		});

	});
};

export const updateUser = (user) => {
	return new Promise((resolve, reject) => {
		WidgetModel.update({ 'owner.id': user.id }, { owner: user }, { multi: true },
			err => {
				if (err) { reject(err); return; }
				resolve(user);
			});
	});
};

export const getUserWidgets = (id) => {
	return new Promise((resolve, reject) => {
		WidgetModel.find({ 'owner.id': id }, (err, results) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(results.map((result) => {
				return new Widget(result);
			}));
		});
	});
};

export const getWidget = (id) => {
	return new Promise((resolve, reject) => {
		WidgetModel.findById(id, (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result ? new Widget(result) : null);
		});
	});

};

export const getWidgets = () => {
	return new Promise((resolve, reject) => {
		WidgetModel.find({}, (err, results) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(results.map((result) => {
				return new Widget(result);
			}));
		});
	});
};

export const insertWidget = (widget) =>
	new Promise((resolve, reject) =>
		(new WidgetModel(widget)).save((err, results) =>
			err ? reject(err) : resolve(results ? new Widget(results) : null)));

export const updateWidget = (widget) =>
	new Promise((resolve, reject) =>
		WidgetModel.findByIdAndUpdate(widget._id || widget.id, widget, err =>
				(err) ? reject(err) : resolve(widget ? new Widget(widget) : null)));

export const deleteWidget = (id) =>
	new Promise((resolve, reject) =>
		WidgetModel.findByIdAndRemove(id, (err, results) =>
				err ? reject(err) : resolve(results ? new Widget(results) : null)));
