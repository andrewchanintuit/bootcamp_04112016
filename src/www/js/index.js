import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import UserToolContainer from './containers/user-tool-container';
import WidgetToolContainer from './containers/widget-tool-container';
import ViewerRoute from './routes/viewer-route';


ReactDOM.render(
	<Relay.RootContainer Component={UserToolContainer, WidgetToolContainer} route={new ViewerRoute()} />,
	document.querySelector('main')
);
