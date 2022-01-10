import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';

// npm install react-service-worker
// import registerServiceWorker from 'react-service-worker';


import './index.css';

import globalStore from './rootReducer';
import Test from './Test';
import { Provider } from 'react-redux';

globalStore.dispatch({type: 'increment'});
globalStore.dispatch({type: 'increment'});
globalStore.dispatch({type: 'increment'});
globalStore.dispatch({type: 'increment'});


ReactDOM.render(
	<>
	<Provider store={globalStore}>
	  <App x='y' />
		// <Test x='y' />
	</Provider>
	</>
	,
  document.getElementById('root')
);

