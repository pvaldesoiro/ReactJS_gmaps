import React from 'react';
import ReactDOM from 'react-dom';
import Gmap from './components/Gmap';

import 'styles/page';
import 'styles/menu';

const username = 'locafox';
const password = 'LocaF#xes!';
const authenticationData = {
  'Authorization': 'Basic ' + btoa(username + ':' + password)
};
ReactDOM.render(
  <Gmap authenticationData={authenticationData} />,
  document.getElementById('map-container')
);
