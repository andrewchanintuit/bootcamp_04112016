import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import ParentToolContainer from './containers/parent-tool-container';
import ViewerRoute from './routes/viewer-route';

ReactDOM.render(
	<Relay.RootContainer Component={ParentToolContainer} route={new ViewerRoute()} />,
	document.querySelector('main')
);
