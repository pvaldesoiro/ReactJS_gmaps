import React from 'react';
import ReactDOM from 'react-dom';
import Gmap from './components/Gmap';

require('./styles/page.css');
require('./styles/map.css');
require('./styles/menu.css');

const username = 'locafox';
const password = 'LocaF#xes!';
const authenticationData = {
  'Authorization': 'Basic ' + btoa(username + ':' + password)
};
ReactDOM.render(
  <Gmap authenticationData={authenticationData} />,
  document.getElementById('map-container')
);
